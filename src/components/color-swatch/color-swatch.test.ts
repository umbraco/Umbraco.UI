import './color-swatch.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { userEvent } from 'vitest/browser';
import { axeRun } from '../../internal/test/a11y.js';
import { UUIColorSwatchElement } from './color-swatch.element';
import { UUITestMouse } from '../../internal/test/index';

describe('UUIColorSwatchElement', () => {
  let element: UUIColorSwatchElement;

  beforeEach(async () => {
    element = render(html`
      <uui-color-swatch label="Color swatch"></uui-color-swatch>
    `).container.querySelector('uui-color-swatch')!;

    await element.updateComplete;
  });

  it('is defined with its own instance', () => {
    expect(element).toBeInstanceOf(UUIColorSwatchElement);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  describe('ElementInternals ARIA', () => {
    it('host has role "radio" via ElementInternals', () => {
      const internals = (element as any)._internals as ElementInternals;
      expect(internals.role).toBe('radio');
    });

    it('exposes accessible name via ElementInternals', () => {
      const internals = (element as any)._internals as ElementInternals;
      expect(internals.ariaLabel).toBe('Color swatch');
    });

    it('inner button has no aria-label attribute', () => {
      const btn = element.shadowRoot!.querySelector('button')!;
      expect(btn.hasAttribute('aria-label')).toBe(false);
    });

    it('exposes ariaChecked via internals when selected', async () => {
      element.selectable = true;
      element.selected = true;
      await element.updateComplete;
      const internals = (element as any)._internals as ElementInternals;
      expect(internals.ariaChecked).toBe('true');
    });

    it('exposes ariaChecked=false via internals when not selected', async () => {
      element.selectable = true;
      element.selected = false;
      await element.updateComplete;
      const internals = (element as any)._internals as ElementInternals;
      expect(internals.ariaChecked).toBe('false');
    });
  });

  describe('color rendering', () => {
    it('applies value as background on the color div', async () => {
      element.value = '#ff0000';
      await element.updateComplete;
      const colorDiv = element.shadowRoot!.querySelector<HTMLElement>(
        '.color-swatch__color',
      )!;
      expect(colorDiv.style.background).toContain('#ff0000');
    });

    it('applies color prop as background when provided', async () => {
      element.value = 'sun';
      element.color = 'radial-gradient(orange, red)';
      await element.updateComplete;
      const colorDiv = element.shadowRoot!.querySelector<HTMLElement>(
        '.color-swatch__color',
      )!;
      expect(colorDiv.style.background).toContain('radial-gradient');
    });
  });

  describe('contrast class', () => {
    it('adds color-swatch--dark class for dark hex color', async () => {
      element.value = '#000000';
      await element.updateComplete;
      const swatch = element.shadowRoot!.querySelector('.color-swatch')!;
      expect(swatch.classList.contains('color-swatch--dark')).toBe(true);
    });

    it('adds color-swatch--light class for light hex color', async () => {
      element.value = '#ffffff';
      await element.updateComplete;
      const swatch = element.shadowRoot!.querySelector('.color-swatch')!;
      expect(swatch.classList.contains('color-swatch--light')).toBe(true);
    });

    it('updates contrast class when value changes', async () => {
      element.value = '#000000';
      await element.updateComplete;
      const swatch = element.shadowRoot!.querySelector('.color-swatch')!;
      expect(swatch.classList.contains('color-swatch--dark')).toBe(true);

      element.value = '#ffffff';
      await element.updateComplete;
      expect(swatch.classList.contains('color-swatch--dark')).toBe(false);
      expect(swatch.classList.contains('color-swatch--light')).toBe(true);
    });

    it('adds color-swatch--dark class for dark rgb color', async () => {
      element.value = 'rgb(0 0 0 / 1)';
      await element.updateComplete;
      const swatch = element.shadowRoot!.querySelector('.color-swatch')!;
      expect(swatch.classList.contains('color-swatch--dark')).toBe(true);
    });

    it('adds color-swatch--light class when rgb alpha is <= 0.5', async () => {
      element.value = 'rgb(0 0 0 / 0.3)';
      await element.updateComplete;
      const swatch = element.shadowRoot!.querySelector('.color-swatch')!;
      expect(swatch.classList.contains('color-swatch--light')).toBe(true);
    });

    it('adds no contrast class for unsupported formats (gradients)', async () => {
      element.color = 'linear-gradient(red, blue)';
      await element.updateComplete;
      const swatch = element.shadowRoot!.querySelector('.color-swatch')!;
      expect(swatch.classList.contains('color-swatch--dark')).toBe(false);
      expect(swatch.classList.contains('color-swatch--light')).toBe(false);
    });

    it('uses color prop instead of value for contrast when both set', async () => {
      element.value = '#000000'; // dark
      element.color = '#ffffff'; // light — color takes precedence
      await element.updateComplete;
      const swatch = element.shadowRoot!.querySelector('.color-swatch')!;
      expect(swatch.classList.contains('color-swatch--light')).toBe(true);
    });
  });

  describe('selectable', () => {
    const mouse = new UUITestMouse();

    beforeEach(async () => {
      element.selectable = true;
    });

    it('can be selected when selectable', async () => {
      await element.updateComplete;
      await mouse.leftClick(element);
      expect(element.selected).toBe(true);
    });

    it('can not be selected when not selectable', async () => {
      element.selectable = false;
      await element.updateComplete;
      await mouse.leftClick(element);
      expect(element.selected).toBe(false);
    });

    it('cant be selected when disabled', async () => {
      element.disabled = true;
      await element.updateComplete;
      await mouse.leftClick(element);
      expect(element.selected).toBe(false);
    });

    it('can be selected with Space key', async () => {
      await userEvent.tab();
      await userEvent.keyboard('{Space}');
      expect(element.selected).toBe(true);

      await userEvent.keyboard('{Space}');
      expect(element.selected).toBe(false);
    });

    it('can be selected with Enter key', async () => {
      await userEvent.tab();
      await userEvent.keyboard('{Enter}');
      expect(element.selected).toBe(true);

      await userEvent.keyboard('{Enter}');
      expect(element.selected).toBe(false);
    });
  });
});
