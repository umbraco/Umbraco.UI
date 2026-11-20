import './color-picker.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { userEvent } from 'vitest/browser';
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
    it('stores hue as an integer in component state', async () => {
      element.setColor({ h: 120.6, s: 50, l: 40, a: 1 });
      await element.updateComplete;

      expect((element as any).hue).toBe(121);
    });

    it('rounds hue to integer in HSL formatted output', async () => {
      element.setColor({ h: 120.6, s: 50, l: 40, a: 1 });
      await element.updateComplete;
      const formatted = element.getFormattedValue('hsl');

      expect(formatted).toMatch(/^hsl\(121\s/);
      expect(formatted).not.toMatch(/^hsl\(\d+\.\d+/);
    });

    it('rounds hue to integer in HSV formatted output', async () => {
      element.setColor({ h: 120.6, s: 50, l: 40, a: 1 });
      await element.updateComplete;
      const formatted = element.getFormattedValue('hsv');

      expect(formatted).toMatch(/^hsv\(121,/);
      expect(formatted).not.toMatch(/^hsv\(\d+\.\d+/);
    });

    it('rounds saturation and lightness to integers in formatted output', async () => {
      // Simulates a value produced by the color area with raw float coordinates
      element.setColor('hsl(353, 74.70982142857143%, 30.571292986188617%)');
      await element.updateComplete;
      const formatted = element.getFormattedValue('hsl');
      expect(formatted).not.toMatch(/\d+\.\d+%/);
    });

    it.each(['#d0e0e5', '#efefef', '#1a455d', '#f6f6f6'])(
      'keeps the exact hex value of %s when set as a color',
      async color => {
        element.setColor(color);
        await element.updateComplete;

        expect(element.value).toBe(color);
      },
    );
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

  describe('popover', () => {
    let popover: HTMLElement;

    const pickSwatch = async (color: string) => {
      await userEvent.click(
        element.shadowRoot!.querySelector(
          `uui-color-swatch[label="${color}"]`,
        )!,
      );
      await element.updateComplete;
    };

    const nativeInput = () =>
      element
        .shadowRoot!.querySelector('[part="input"]')!
        .shadowRoot!.querySelector('input')!;

    const hueSliderHandle = () =>
      element
        .shadowRoot!.querySelector('.hue-slider')!
        .shadowRoot!.querySelector<HTMLElement>('[tabindex]')!;

    const swatchButton = (color: string) =>
      element
        .shadowRoot!.querySelector(`uui-color-swatch[label="${color}"]`)!
        .shadowRoot!.querySelector('button')!;

    const trigger = () =>
      element.shadowRoot!.querySelector<HTMLElement>('[part="trigger"]')!;

    // Lets the deferred close run, and is long enough to catch a reopen.
    const settle = () => new Promise(resolve => setTimeout(resolve, 50));

    beforeEach(async () => {
      element.value = '#4a90e2';
      await element.updateComplete;
      popover = element.shadowRoot!.querySelector('#color-picker-popover')!;
      await userEvent.click(
        element.shadowRoot!.querySelector<HTMLElement>('[part="trigger"]')!,
      );
    });

    it('restores the value it opened with when Escape is pressed', async () => {
      const changes: string[] = [];
      element.addEventListener('change', () => changes.push(element.value));

      await pickSwatch('#d0021b');
      expect(element.value).toBe('#d0021b');

      await userEvent.keyboard('{Escape}');
      await element.updateComplete;

      expect(popover.matches(':popover-open')).toBe(false);
      expect(element.value).toBe('#4a90e2');
      expect(changes).toEqual(['#d0021b', '#4a90e2']);
    });

    it('keeps the picked value when closed without Escape', async () => {
      await pickSwatch('#d0021b');

      popover.hidePopover();
      await element.updateComplete;

      expect(element.value).toBe('#d0021b');
    });

    it('discards text typed into the input when Escape is pressed', async () => {
      const input = element
        .shadowRoot!.querySelector('[part="input"]')!
        .shadowRoot!.querySelector('input')!;

      await userEvent.fill(input, 'red');
      await userEvent.keyboard('{Escape}');
      await element.updateComplete;

      expect(element.value).toBe('#4a90e2');
      expect(input.value).toBe('#4a90e2');
    });

    it('restores the format it opened with when Escape is pressed', async () => {
      await userEvent.click(
        element.shadowRoot!.querySelector('.color-picker__toggle-format')!,
      );
      expect(element.format).toBe('rgb');

      await userEvent.keyboard('{Escape}');
      await element.updateComplete;

      expect(element.format).toBe('hex');
      expect(element.value).toBe('#4a90e2');
    });

    it('applies typed text and closes when Enter is pressed in the input', async () => {
      await userEvent.fill(nativeInput(), 'red');
      await userEvent.keyboard('{Enter}');
      await settle();

      expect(element.value).toBe('#ff0000');
      expect(popover.matches(':popover-open')).toBe(false);
    });

    it('selects a swatch and closes when Enter is pressed on it', async () => {
      swatchButton('#d0021b').focus();
      await userEvent.keyboard('{Enter}');
      await settle();

      expect(element.value).toBe('#d0021b');
      expect(popover.matches(':popover-open')).toBe(false);
    });

    it('keeps the change and closes when Enter is pressed on a slider', async () => {
      hueSliderHandle().focus();
      await userEvent.keyboard('{ArrowRight}{Enter}');
      await settle();

      expect(element.value).not.toBe('#4a90e2');
      expect(popover.matches(':popover-open')).toBe(false);
    });

    it('stays closed after Enter when opened from the keyboard', async () => {
      popover.hidePopover();
      element
        .shadowRoot!.querySelector<HTMLElement>('[part="trigger"]')!
        .focus();
      await userEvent.keyboard('{Enter}');
      expect(popover.matches(':popover-open')).toBe(true);

      nativeInput().focus();
      await userEvent.keyboard('{Enter}');
      await settle();

      expect(popover.matches(':popover-open')).toBe(false);
    });

    it('stays open when Enter is pressed on the format toggle', async () => {
      element
        .shadowRoot!.querySelector('.color-picker__toggle-format')!
        .shadowRoot!.querySelector('button')!
        .focus();
      await userEvent.keyboard('{Enter}');
      await settle();

      expect(element.format).toBe('rgb');
      expect(popover.matches(':popover-open')).toBe(true);
    });

    it('stays open when Enter confirms an IME composition', async () => {
      nativeInput().dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Enter',
          isComposing: true,
          bubbles: true,
          composed: true,
        }),
      );
      await settle();

      expect(popover.matches(':popover-open')).toBe(true);
    });

    it('keeps the change and closes when focus moves out of the popover', async () => {
      const after = document.createElement('input');
      element.after(after);
      await pickSwatch('#d0021b');

      swatchButton('#fff').focus();
      await userEvent.tab();
      await settle();

      expect(popover.matches(':popover-open')).toBe(false);
      expect(element.value).toBe('#d0021b');
      expect(document.activeElement).toBe(after);
    });

    it('stays open when a swatch is clicked while the input has focus', async () => {
      nativeInput().focus();
      await pickSwatch('#d0021b');
      await settle();

      expect(element.value).toBe('#d0021b');
      expect(popover.matches(':popover-open')).toBe(true);
    });

    it('returns focus to the trigger when Escape closes it', async () => {
      swatchButton('#d0021b').focus();
      await userEvent.keyboard('{Escape}');
      await settle();

      expect(element.shadowRoot!.activeElement).toBe(trigger());
    });

    it('returns focus to the trigger when Enter closes it', async () => {
      nativeInput().focus();
      await userEvent.keyboard('{Enter}');
      await settle();

      expect(element.shadowRoot!.activeElement).toBe(trigger());
    });

    it('stays open when focus moves between its controls', async () => {
      nativeInput().focus();
      hueSliderHandle().focus();
      await settle();

      expect(popover.matches(':popover-open')).toBe(true);
    });
  });
});
