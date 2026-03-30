import './color-slider.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import { UUIColorSliderElement } from './color-slider.element';
import { UUIColorSliderEvent } from './UUIColorSliderEvent.js';

describe('UUIColorSliderElement', () => {
  let element: UUIColorSliderElement;

  beforeEach(async () => {
    element = render(html`
      <uui-color-slider label="Color slider"></uui-color-slider>
    `).container.querySelector('uui-color-slider')!;

    await element.updateComplete;
  });

  it('is defined with its own instance', () => {
    expect(element).toBeInstanceOf(UUIColorSliderElement);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  describe('ElementInternals ARIA', () => {
    it('host has role "slider" via ElementInternals', () => {
      const internals = (element as any)._internals as ElementInternals;
      expect(internals.role).toBe('slider');
    });

    it('exposes ariaValueMin via ElementInternals', () => {
      const internals = (element as any)._internals as ElementInternals;
      expect(internals.ariaValueMin).toBe('0');
    });

    it('exposes ariaValueMax via ElementInternals', () => {
      element.type = 'hue';
      const internals = (element as any)._internals as ElementInternals;
      expect(internals.ariaValueMax).toBe('360');
    });

    it('exposes ariaValueNow via ElementInternals', async () => {
      element.value = 42;
      await element.updateComplete;
      const internals = (element as any)._internals as ElementInternals;
      expect(internals.ariaValueNow).toBe('42');
    });

    it('exposes ariaOrientation as horizontal by default', () => {
      const internals = (element as any)._internals as ElementInternals;
      expect(internals.ariaOrientation).toBe('horizontal');
    });

    it('exposes ariaOrientation as vertical when vertical=true', async () => {
      element.vertical = true;
      await element.updateComplete;
      const internals = (element as any)._internals as ElementInternals;
      expect(internals.ariaOrientation).toBe('vertical');
    });

    it('exposes accessible name via ElementInternals', () => {
      const internals = (element as any)._internals as ElementInternals;
      expect(internals.ariaLabel).toBe('Color slider');
    });
  });

  describe('type → max mapping', () => {
    it('sets max to 360 for hue type', async () => {
      element.type = 'hue';
      await element.updateComplete;
      expect(element.max).toBe(360);
    });

    it('sets max to 100 for saturation type', async () => {
      element.type = 'saturation';
      await element.updateComplete;
      expect(element.max).toBe(100);
    });

    it('sets max to 100 for lightness type', async () => {
      element.type = 'lightness';
      await element.updateComplete;
      expect(element.max).toBe(100);
    });

    it('sets max to 100 for opacity type', async () => {
      element.type = 'opacity';
      await element.updateComplete;
      expect(element.max).toBe(100);
    });
  });

  describe('cssPropCurrentValue (horizontal)', () => {
    it('returns 0 when value is 0', async () => {
      element.value = 0;
      await element.updateComplete;
      expect(element.cssPropCurrentValue).toBe(0);
    });

    it('returns 50 for value=50 with max=100', async () => {
      element.value = 50;
      element.max = 100;
      await element.updateComplete;
      expect(element.cssPropCurrentValue).toBe(50);
    });

    it('returns 100 for value=max', async () => {
      element.max = 100;
      element.value = 100;
      await element.updateComplete;
      expect(element.cssPropCurrentValue).toBe(100);
    });
  });

  describe('cssPropCurrentValue (vertical)', () => {
    beforeEach(async () => {
      element.vertical = true;
      await element.updateComplete;
    });

    it('returns 100 when value is 0 in vertical mode', async () => {
      element.value = 0;
      await element.updateComplete;
      expect(element.cssPropCurrentValue).toBe(100);
    });
  });

  describe('roundToPrecision', () => {
    it('rounds up by default (precision 1)', () => {
      expect(element.roundToPrecision(5.1)).toBe(6);
    });

    it('rounds to 0.5 steps when precision is 0.5', () => {
      element.precision = 0.5;
      expect(element.roundToPrecision(5.1)).toBe(5.5);
    });

    it('rounds exact integer as-is', () => {
      expect(element.roundToPrecision(7)).toBe(7);
    });
  });

  describe('keyboard navigation', () => {
    let slider: HTMLElement;

    beforeEach(async () => {
      element.value = 50;
      element.max = 100;
      element.min = 0;
      await element.updateComplete;
      slider = element.shadowRoot!.querySelector('#color-slider')!;
    });

    it('increments value by 1 on ArrowRight', () => {
      slider.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
      );
      expect(element.value).toBe(51);
    });

    it('decrements value by 1 on ArrowLeft', () => {
      slider.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }),
      );
      expect(element.value).toBe(49);
    });

    it('increments value by 1 on ArrowUp', () => {
      slider.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }),
      );
      expect(element.value).toBe(51);
    });

    it('decrements value by 1 on ArrowDown', () => {
      slider.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }),
      );
      expect(element.value).toBe(49);
    });

    it('increments by 10 with Shift+ArrowRight', () => {
      slider.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowRight',
          shiftKey: true,
          bubbles: true,
        }),
      );
      expect(element.value).toBe(60);
    });

    it('decrements by 10 with Shift+ArrowLeft', () => {
      slider.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowLeft',
          shiftKey: true,
          bubbles: true,
        }),
      );
      expect(element.value).toBe(40);
    });

    it('sets value to min on Home', () => {
      slider.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Home', bubbles: true }),
      );
      expect(element.value).toBe(0);
    });

    it('sets value to max on End', () => {
      slider.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'End', bubbles: true }),
      );
      expect(element.value).toBe(100);
    });

    it('does not exceed max', () => {
      element.value = 100;
      slider.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
      );
      expect(element.value).toBe(100);
    });

    it('does not go below min', () => {
      element.value = 0;
      slider.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }),
      );
      expect(element.value).toBe(0);
    });
  });

  describe('hue handle background color', () => {
    let handle: HTMLElement;

    beforeEach(async () => {
      handle = element.shadowRoot!.querySelector<HTMLElement>(
        '#color-slider__handle',
      )!;
    });

    it('sets a background color on the handle when type is hue', async () => {
      element.type = 'hue';
      element.value = 120;
      await element.updateComplete;
      expect(handle.style.backgroundColor).toBeTruthy();
    });

    it('does not set a background color on the handle for non-hue types', async () => {
      element.type = 'opacity';
      element.value = 50;
      await element.updateComplete;
      expect(handle.style.backgroundColor).toBe('');
    });

    it('updates handle background color as hue value changes', async () => {
      element.type = 'hue';
      element.value = 0;
      await element.updateComplete;
      const colorAt0 = handle.style.backgroundColor;

      element.value = 180;
      await element.updateComplete;
      const colorAt180 = handle.style.backgroundColor;

      expect(colorAt0).toBeTruthy();
      expect(colorAt180).toBeTruthy();
      expect(colorAt0).not.toBe(colorAt180);
    });
  });

  describe('change event', () => {
    it('fires change event when value changes via keyboard', async () => {
      element.value = 50;
      await element.updateComplete;
      const spy = vi.fn();
      element.addEventListener(UUIColorSliderEvent.CHANGE, spy);
      const slider = element.shadowRoot!.querySelector('#color-slider')!;
      slider.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
      );
      expect(spy).toHaveBeenCalledOnce();
    });
  });
});
