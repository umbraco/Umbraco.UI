import './color-picker.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import { UUIColorPickerElement } from './color-picker.element';

import '../icon/icon.js';
import '../icon-registry-essential/icon-registry-essential.js';
import '../input/input.js';
import '../button/button.js';
import '../button-group/button-group.js';
import '../color-swatches/color-swatches.js';
import '../color-swatch/color-swatch.js';
import '../color-area/color-area.js';
import '../color-slider/color-slider.js';
import '../popover-container/popover-container.js';

describe('UUIColorPickerElement', () => {
  let element: UUIColorPickerElement;

  beforeEach(async () => {
    element = render(html`
      <uui-color-picker label="Color picker"></uui-color-picker>
    `).container.querySelector('uui-color-picker')!;

    await element.updateComplete;
  });

  it('is defined with its own instance', () => {
    expect(element).toBeInstanceOf(UUIColorPickerElement);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  describe('HSV format', () => {
    it('uses HSV saturation, not HSL saturation', async () => {
      // hsl(0, 50%, 50%) has HSL s=50 but HSV s≈67 — a bug that passed HSL s would output 50%
      element.setColor({ h: 0, s: 50, l: 50, a: 1 });
      await element.updateComplete;
      const formatted = element.getFormattedValue('hsv');
      expect(formatted).toBe('hsv(0, 67%, 75%)');
    });
  });

  describe('float precision', () => {
    it('rounds saturation and lightness to integers in formatted output', async () => {
      // Simulates a value produced by the color area with raw float coordinates
      element.setColor('hsl(353, 74.70982142857143%, 30.571292986188617%)');
      await element.updateComplete;
      const formatted = element.getFormattedValue('hsl');
      expect(formatted).not.toMatch(/\d+\.\d+%/);
    });
  });

  describe('value setter', () => {
    it('updates value when a valid color is set', async () => {
      element.value = '#ff0000';
      await element.updateComplete;
      expect(element.value).toBe('#ff0000');
    });

    it('does not update value when an unparseable string is set', async () => {
      element.value = '#ff0000';
      await element.updateComplete;
      element.value = 'not-a-color';
      await element.updateComplete;
      expect(element.value).toBe('#ff0000');
    });
  });
});
