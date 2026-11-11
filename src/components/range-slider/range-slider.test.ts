import './range-slider.js';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { render } from 'vitest-browser-lit';

import { axeRun } from '../../internal/test/a11y.js';
import { oneEvent } from '../../internal/test/index.js';

import { UUIRangeSliderElement } from './range-slider.element';
import { UUIRangeSliderEvent } from './UUIRangeSliderEvent';

async function renderElement<
  T extends HTMLElement & { updateComplete: Promise<boolean> },
>(template: ReturnType<typeof html>): Promise<T> {
  const el = render(template).container.querySelector(
    'uui-range-slider',
  ) as unknown as T;
  await el.updateComplete;
  return el;
}

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

  describe('selected value labels', () => {
    let labels: HTMLElement;
    let combined: HTMLElement;

    beforeEach(async () => {
      element = await renderElement(html`
        <uui-range-slider
          label="Range"
          min="0"
          max="50"
          step="0.1"
          value="10,40"
          style="display: block; width: 300px"></uui-range-slider>
      `);
      await element.updateComplete;
      labels = element.shadowRoot!.querySelector<HTMLElement>('.thumb-values')!;
      combined = labels.querySelector<HTMLElement>('.combined-value')!;
      labels.style.transition = 'none';
    });

    it('shows separate values without hovering when there is room', () => {
      expect(getComputedStyle(labels).opacity).toBe('1');
      expect(getComputedStyle(combined).display).toBe('none');
      for (const label of labels.querySelectorAll('span > span')) {
        expect(getComputedStyle(label).visibility).toBe('visible');
      }
    });

    it('keeps the values visible when step values are hidden', async () => {
      element.hideStepValues = true;
      await element.updateComplete;
      expect(getComputedStyle(labels).display).not.toBe('none');
      expect(getComputedStyle(labels).opacity).toBe('1');
    });

    it('hides the values when hideValueLabel is set', async () => {
      element.hideValueLabel = true;
      await element.updateComplete;
      expect(getComputedStyle(labels).display).toBe('none');
    });

    it('keeps readonly values visible even when step values are hidden', async () => {
      element.hideStepValues = true;
      element.readonly = true;
      await element.updateComplete;
      expect(getComputedStyle(labels).opacity).toBe('1');
    });

    it('combines close decimal values and separates them again as handles move apart', async () => {
      element.value = '20.1,20.2';
      await element.updateComplete;
      expect(getComputedStyle(combined).display).toBe('block');
      expect(combined.textContent!.trim().replace(/\s+/g, ' ')).toBe(
        '20.1 - 20.2',
      );
      for (const label of labels.querySelectorAll('span > span')) {
        expect(getComputedStyle(label).visibility).toBe('hidden');
      }

      element.value = '10,40';
      await element.updateComplete;
      expect(getComputedStyle(combined).display).toBe('none');
    });

    it('recalculates overlap when the container resizes without a window resize', async () => {
      element.value = '20,30';
      await element.updateComplete;
      expect(getComputedStyle(combined).display).toBe('none');

      element.style.width = '100px';
      await vi.waitFor(() =>
        expect(getComputedStyle(combined).display === 'block').toBe(true),
      );

      element.style.width = '300px';
      await vi.waitFor(() =>
        expect(getComputedStyle(combined).display === 'none').toBe(true),
      );
    });

    it('resumes observing size changes after reconnecting', async () => {
      const parent = element.parentElement!;
      element.remove();
      parent.append(element);
      await element.updateComplete;
      element.value = '20,30';
      await element.updateComplete;
      element.style.width = '100px';
      await vi.waitFor(() =>
        expect(getComputedStyle(combined).display === 'block').toBe(true),
      );
    });
  });

  describe('step marker alignment', () => {
    for (const lineHeight of [21, 22, 32]) {
      it(`centers markers on the track with a ${lineHeight}px line-height`, async () => {
        element = await renderElement(html`
          <uui-range-slider
            min="0"
            max="10"
            value="2,8"
            style="display: block; width: 300px; line-height: ${lineHeight}px">
          </uui-range-slider>
        `);
        await element.updateComplete;

        const track = element.shadowRoot!.querySelector('#inner-track')!;
        const markers = element.shadowRoot!.querySelectorAll('.track-step');
        const trackBounds = track.getBoundingClientRect();
        const trackCenter = trackBounds.top + trackBounds.height / 2;

        expect(markers.length).toBe(11);
        for (const marker of markers) {
          const bounds = marker.getBoundingClientRect();
          expect(
            Math.abs(bounds.top + bounds.height / 2 - trackCenter),
          ).toBeLessThanOrEqual(0.1);
        }
      });
    }
  });

  describe('step value visibility', () => {
    const stepValues = () =>
      Array.from(
        element.shadowRoot!.querySelectorAll('.step-values > span > span'),
        label => label.textContent!.trim(),
      );

    beforeEach(async () => {
      element = await renderElement(html`
        <uui-range-slider
          label="Range"
          min="0"
          max="10"
          step="1"
          style="display: block; width: 600px"></uui-range-slider>
      `);
      await element.updateComplete;
    });

    it('shows steps when there is room and preserves dots when labels are hidden', async () => {
      expect(stepValues()).toHaveLength(11);
      element.hideStepValues = true;
      await element.updateComplete;
      expect(stepValues()).toEqual(['0', '10']);
      const endpoints = element.shadowRoot!.querySelector('.step-values')!;
      expect(getComputedStyle(endpoints).visibility).toBe('hidden');
      await element.focus();
      expect(getComputedStyle(endpoints).visibility).toBe('visible');
      expect(stepValues()).toEqual(['0', '10']);
      await element.blur();
      expect(getComputedStyle(endpoints).visibility).toBe('hidden');
      expect(element.shadowRoot!.querySelectorAll('.track-step')).toHaveLength(
        11,
      );
      element.hideStepValues = false;
      await element.updateComplete;
      expect(stepValues()).toHaveLength(11);
    });

    it('shows only endpoints for decimal steps and hides them when requested', async () => {
      element.step = 0.1;
      element.max = 50;
      await element.updateComplete;
      expect(stepValues()).toEqual(['0.0', '50.0']);
      element.hideStepValues = true;
      await element.updateComplete;
      expect(stepValues()).toEqual(['0.0', '50.0']);
      const endpoints = element.shadowRoot!.querySelector('.step-values')!;
      expect(getComputedStyle(endpoints).visibility).toBe('hidden');
      await element.focus();
      expect(getComputedStyle(endpoints).visibility).toBe('visible');
      await element.blur();
      expect(getComputedStyle(endpoints).visibility).toBe('hidden');
      element.hideStepValues = false;
      await element.updateComplete;
      expect(stepValues()).toEqual(['0.0', '50.0']);
    });

    it('updates label density on container resize', async () => {
      element.style.width = '100px';
      await vi.waitFor(() => expect(stepValues().length === 2).toBe(true));
      expect(stepValues()).toEqual(['0', '10']);
      element.style.width = '600px';
      await vi.waitFor(() => expect(stepValues().length === 11).toBe(true));
    });

    it('shows all labels for 20 intervals when there is room', async () => {
      element.max = 20;
      await element.updateComplete;
      expect(stepValues()).toHaveLength(21);
    });

    it('shows only endpoints above 20 intervals even when dots fit', async () => {
      element.style.width = '1000px';
      element.max = 21;
      await element.updateComplete;
      await vi.waitFor(() =>
        expect(
          element.shadowRoot!.querySelectorAll('.track-step').length === 22,
        ).toBe(true),
      );
      expect(stepValues()).toEqual(['0', '21']);
    });
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
    it('has a hideValueLabel property', () => {
      expect(element).toHaveProperty('hideValueLabel');
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

describe('UUIRangeSlider min-gap', () => {
  type RangeSliderHandles = {
    setValueLow(low: number): void;
    setValueHigh(high: number): void;
  };

  async function renderSlider(minGap?: number) {
    const element = render(
      html`<uui-range-slider
        label="Range"
        min="0"
        max="10"
        step="1"
        min-gap=${ifDefined(minGap)}
        value="3,8"></uui-range-slider>`,
    ).container.querySelector('uui-range-slider')!;
    await element.updateComplete;
    return element;
  }

  it('lets the low handle reach the high value when min-gap is 0', async () => {
    const element = await renderSlider(0);
    (element as unknown as RangeSliderHandles).setValueLow(8);
    await element.updateComplete;
    expect(element.value).toBe('8,8');
  });

  it('lets the high handle reach the low value when min-gap is 0', async () => {
    const element = await renderSlider(0);
    (element as unknown as RangeSliderHandles).setValueHigh(3);
    await element.updateComplete;
    expect(element.value).toBe('3,3');
  });

  it('keeps a one-step gap when min-gap is not set', async () => {
    const element = await renderSlider();
    (element as unknown as RangeSliderHandles).setValueLow(8);
    await element.updateComplete;
    expect(element.value).toBe('7,8');
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
