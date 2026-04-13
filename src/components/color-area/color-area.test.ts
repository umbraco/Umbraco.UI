import './color-area.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import { UUIColorAreaElement } from './color-area.element';
import { UUIColorAreaEvent } from './UUIColorAreaEvent.js';

describe('UUIColorAreaElement', () => {
  let element: UUIColorAreaElement;

  beforeEach(async () => {
    element = render(
      html` <uui-color-area></uui-color-area> `,
    ).container.querySelector('uui-color-area')!;

    await element.updateComplete;
  });

  it('is defined with its own instance', () => {
    expect(element).toBeInstanceOf(UUIColorAreaElement);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  describe('value setter', () => {
    it('parses hex color and updates saturation', async () => {
      element.value = '#00ff00'; // green: h=120, s=100, l=50
      await element.updateComplete;
      expect(element.saturation).toBe(100);
    });

    it('parses hex color and updates lightness', async () => {
      element.value = '#00ff00';
      await element.updateComplete;
      expect(element.lightness).toBe(50);
    });

    it('parses hex color and updates hue when non-zero', async () => {
      element.value = '#00ff00'; // hue = 120
      await element.updateComplete;
      expect(element.hue).toBe(120);
    });

    it('does not update hue when parsed hue is 0', async () => {
      element.hue = 180;
      element.value = '#ff0000'; // red: h=0 — should not overwrite
      await element.updateComplete;
      expect(element.hue).toBe(180);
    });

    it('parses hex color and updates alpha', async () => {
      element.value = '#00ff00';
      await element.updateComplete;
      expect(element.alpha).toBe(100);
    });

    it('parses rgba color and updates alpha', async () => {
      element.value = 'rgba(255, 0, 0, 0.5)';
      await element.updateComplete;
      expect(element.alpha).toBeCloseTo(50, 0);
    });

    it('updates brightness from parsed lightness and saturation', async () => {
      element.value = '#00ff00'; // s=100, l=50 → brightness=100
      await element.updateComplete;
      expect(element.brightness).toBe(100);
    });

    it('stores the raw value string', async () => {
      element.value = '#00ff00';
      await element.updateComplete;
      expect(element.value).toBe('#00ff00');
    });
  });

  describe('syncValues', () => {
    it('produces modern space-separated rgb() format', async () => {
      element.hue = 0;
      element.saturation = 100;
      element.lightness = 50;
      element.alpha = 100;
      await element.updateComplete;
      element.syncValues();
      expect(element.value).toMatch(/^rgb\(\d+\s+\d+\s+\d+\s*\/\s*[\d.]+\)$/);
    });

    it('does not use comma-separated legacy format', async () => {
      element.syncValues();
      expect(element.value).not.toMatch(/rgb\(\d+,/);
    });

    it('fires change event', () => {
      const spy = vi.fn();
      element.addEventListener(UUIColorAreaEvent.CHANGE, spy);
      element.syncValues();
      expect(spy).toHaveBeenCalledOnce();
    });
  });

  describe('keyboard navigation', () => {
    let handle: HTMLElement;

    beforeEach(async () => {
      element.saturation = 50;
      element.brightness = 50;
      element.lightness = 25;
      await element.updateComplete;
      handle = element.shadowRoot!.querySelector('.color-area__handle')!;
    });

    it('decreases saturation on ArrowLeft', () => {
      handle.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }),
      );
      expect(element.saturation).toBe(49);
    });

    it('increases saturation on ArrowRight', () => {
      handle.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
      );
      expect(element.saturation).toBe(51);
    });

    it('increases brightness on ArrowUp', () => {
      handle.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }),
      );
      expect(element.brightness).toBe(51);
    });

    it('decreases brightness on ArrowDown', () => {
      handle.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }),
      );
      expect(element.brightness).toBe(49);
    });

    it('decreases saturation by 10 with Shift+ArrowLeft', () => {
      handle.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowLeft',
          shiftKey: true,
          bubbles: true,
        }),
      );
      expect(element.saturation).toBe(40);
    });

    it('increases brightness by 10 with Shift+ArrowUp', () => {
      handle.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowUp',
          shiftKey: true,
          bubbles: true,
        }),
      );
      expect(element.brightness).toBe(60);
    });

    it('clamps saturation at 0', () => {
      element.saturation = 0;
      handle.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }),
      );
      expect(element.saturation).toBe(0);
    });

    it('clamps saturation at 100', () => {
      element.saturation = 100;
      handle.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
      );
      expect(element.saturation).toBe(100);
    });

    it('fires change event on keyboard move', () => {
      const spy = vi.fn();
      element.addEventListener(UUIColorAreaEvent.CHANGE, spy);
      handle.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }),
      );
      expect(spy).toHaveBeenCalledOnce();
    });
  });

  describe('disabled', () => {
    it('blocks keyboard navigation when disabled', async () => {
      element.disabled = true;
      element.saturation = 50;
      await element.updateComplete;
      const handle = element.shadowRoot!.querySelector('.color-area__handle')!;
      handle.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }),
      );
      expect(element.saturation).toBe(50);
    });
  });
});
