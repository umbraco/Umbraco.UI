import './range-slider.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';

import { axeRun } from '../../internal/test/a11y.js';
import { oneEvent } from '../../internal/test/index.js';

import { UUIRangeSliderElement } from './range-slider.element';
import { UUIRangeSliderEvent } from './UUIRangeSliderEvent';

const preventSubmit = (e: SubmitEvent) => {
  e.preventDefault();
};

describe('UUIRangeSliderElement', () => {
  let element: UUIRangeSliderElement;
  let inputLow: HTMLInputElement;
  let inputHigh: HTMLInputElement;

  beforeEach(async () => {
    element = render(
      html`<uui-range-slider min="10" max="100"></uui-range-slider>`,
    ).container.querySelector('uui-range-slider')!;

    await element.updateComplete;
    inputLow = element.shadowRoot?.querySelector(
      '#inputLow',
    ) as HTMLInputElement;
    inputHigh = element.shadowRoot?.querySelector(
      '#inputHigh',
    ) as HTMLInputElement;
  });

  it('is defined with its own instance', () => {
    expect(element).toBeInstanceOf(UUIRangeSliderElement);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  describe('properties', () => {
    it('has a disabled property', () => {
      expect(element).toHaveProperty('disabled');
    });
    it('disable property set input to disabled', async () => {
      element.disabled = true;
      await element.updateComplete;
      expect(inputLow.disabled).toBe(true);
      expect(inputHigh.disabled).toBe(true);
    });

    it('has a label property', () => {
      expect(element).toHaveProperty('label');
    });
    it('has a value property', () => {
      expect(element).toHaveProperty('value');
    });
    it('has a min property', () => {
      expect(element).toHaveProperty('min');
    });
    it('has a max property', () => {
      expect(element).toHaveProperty('max');
    });
    it('has a step property', () => {
      expect(element).toHaveProperty('step');
    });
    it('has a minGap property', () => {
      expect(element).toHaveProperty('minGap');
    });
    it('has a maxGap property', () => {
      expect(element).toHaveProperty('maxGap');
    });
    it('has a hideStepValues property', () => {
      expect(element).toHaveProperty('hideStepValues');
    });
  });

  describe('events', () => {
    describe('change', () => {
      it('emits a change event from inputLow when native input fires one', async () => {
        const listener = oneEvent(element, UUIRangeSliderEvent.CHANGE);
        inputLow.dispatchEvent(new Event('change'));
        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe(UUIRangeSliderEvent.CHANGE);
        expect(event!.target).toBe(element);
      });
      it('emits a change event from inputHigh when native input fires one', async () => {
        const listener = oneEvent(element, UUIRangeSliderEvent.CHANGE);
        inputHigh.dispatchEvent(new Event('change'));
        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe(UUIRangeSliderEvent.CHANGE);
        expect(event!.target).toBe(element);
      });
    });
    describe('input', () => {
      it('emits an input event from inputLow when native input fires one', async () => {
        const listener = oneEvent(element, UUIRangeSliderEvent.INPUT);
        inputLow.dispatchEvent(new Event('input'));
        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe(UUIRangeSliderEvent.INPUT);
        expect(event!.target).toBe(element);
      });
      it('emits an input event from inputHigh when native input fires one', async () => {
        const listener = oneEvent(element, UUIRangeSliderEvent.INPUT);
        inputHigh.dispatchEvent(new Event('input'));
        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe(UUIRangeSliderEvent.INPUT);
        expect(event!.target).toBe(element);
      });

      it('changes the value when the low-end value changes', async () => {
        const LowEnd = '30';
        inputLow.value = LowEnd;
        inputLow.dispatchEvent(new Event('input'));
        expect(element.value).toBe(`${LowEnd},${inputHigh.value}`);
      });
      it('changes the value when the high-end value changes', async () => {
        const HighEnd = '80';
        inputHigh.value = HighEnd;
        inputHigh.dispatchEvent(new Event('input'));
        expect(element.value).toBe(`${inputLow.value},${HighEnd}`);
      });
    });
  });
});

describe('UUIRangeSlider in a form', () => {
  let formElement: HTMLFormElement;
  let element: UUIRangeSliderElement;
  beforeEach(async () => {
    formElement = render(
      html`<form @submit=${preventSubmit}>
        <uui-range-slider
          label="ranger-danger slider label"
          value="10,90"
          min="0"
          max="100"
          min-gap="10"
          step="5"
          name="slider"></uui-range-slider>
      </form>`,
    ).container.querySelector('form')!;
    element = formElement.querySelector('uui-range-slider') as any;
  });

  it('Value is correct', async () => {
    await expect(element.value).toBe('10,90');
  });

  it('form output', async () => {
    const formData = new FormData(formElement);
    await expect(formData.get('slider')).toBe('10,90');
  });

  it('change low and high values and check output', async () => {
    element.value = '50,60';
    const formData = new FormData(formElement);
    await expect(formData.get('slider')).toBe('50,60');
  });

  describe('submit', () => {
    it('should submit when pressing enter', async () => {
      const listener = oneEvent(formElement, 'submit');
      element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      const event = await listener;
      expect(event).not.toBe(null);
      expect(event.type).toBe('submit');
      expect(event!.target).toBe(formElement);
    });
  });
});
