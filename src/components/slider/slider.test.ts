import './slider.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';

import { axeRun } from '../../internal/test/a11y.js';
import { oneEvent } from '../../internal/test/index.js';

import { UUISliderElement } from './slider.element';
import { UUISliderEvent } from './UUISliderEvent';

async function renderElement<
  T extends HTMLElement & { updateComplete: Promise<boolean> },
>(template: ReturnType<typeof html>): Promise<T> {
  const el = render(template).container.querySelector(
    'uui-slider',
  ) as unknown as T;
  await el.updateComplete;
  return el;
}

const preventSubmit = (e: SubmitEvent) => {
  e.preventDefault();
};

describe('UuiSlider', () => {
  let element: UUISliderElement;
  let input: HTMLInputElement;

  beforeEach(async () => {
    element = render(html`
      <uui-slider label="a slider label"></uui-slider>
    `).container.querySelector('uui-slider')!;

    await element.updateComplete;
    input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  describe('selected value visibility', () => {
    let label: HTMLElement;

    beforeEach(() => {
      label = element.shadowRoot!.querySelector<HTMLElement>('#thumb-label')!;
      label.style.transition = 'none';
    });

    describe('step value visibility', () => {
      const stepValues = () =>
        Array.from(
          element.shadowRoot!.querySelectorAll('#step-values > span > span'),
          label => label.textContent!.trim(),
        );

      beforeEach(async () => {
        element = await renderElement(html`
          <uui-slider
            label="Slider"
            min="0"
            max="10"
            step="1"
            style="width: 600px"></uui-slider>
        `);
        await element.updateComplete;
      });

      it('shows steps when there is room and preserves dots when labels are hidden', async () => {
        expect(stepValues()).toHaveLength(11);
        element.hideStepValues = true;
        await element.updateComplete;
        expect(stepValues()).toEqual(['0', '10']);
        const endpoints = element.shadowRoot!.querySelector('#step-values')!;
        expect(getComputedStyle(endpoints).visibility).toBe('hidden');
        await element.focus();
        expect(getComputedStyle(endpoints).visibility).toBe('visible');
        expect(stepValues()).toEqual(['0', '10']);
        await element.blur();
        expect(getComputedStyle(endpoints).visibility).toBe('hidden');
        expect(
          element.shadowRoot!.querySelectorAll('.track-step'),
        ).toHaveLength(11);
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
        const endpoints = element.shadowRoot!.querySelector('#step-values')!;
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

      it('refreshes endpoints when the minimum changes from zero', async () => {
        element.min = -10;
        element.style.width = '100px';
        await element.updateComplete;
        await vi.waitFor(() => expect(stepValues().length === 2).toBe(true));
        expect(stepValues()).toEqual(['-10', '10']);
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

    it('shows the value without hovering', () => {
      expect(getComputedStyle(label).opacity).toBe('1');
    });

    it('keeps the value visible when step values are hidden', async () => {
      element.hideStepValues = true;
      await element.updateComplete;
      expect(getComputedStyle(label).opacity).toBe('1');
      expect(getComputedStyle(label).visibility).toBe('visible');
    });

    it('keeps readonly values visible even when step values are hidden', async () => {
      element.hideStepValues = true;
      element.readonly = true;
      await element.updateComplete;
      expect(getComputedStyle(label).opacity).toBe('1');
    });

    it('still omits the value label when hideValueLabel is true', async () => {
      element.hideValueLabel = true;
      await element.updateComplete;
      expect(element.shadowRoot!.querySelector('#thumb-label')).toBeNull();
    });
  });

  describe('properties', () => {
    it('has a disabled property', () => {
      expect(element).toHaveProperty('disabled');
    });
    it('disable property set input to disabled', async () => {
      element.disabled = true;
      await element.updateComplete;
      expect(input.disabled).toBe(true);
    });

    it('has a value property', () => {
      expect(element).toHaveProperty('value');
    });
    it('has a label property', () => {
      expect(element).toHaveProperty('label');
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
    it('has a hideStepValues property', () => {
      expect(element).toHaveProperty('hideStepValues');
    });
    it('has an autocomplete property', () => {
      expect(element).toHaveProperty('autocomplete');
    });
    it('forwards the autocomplete property to the native input', async () => {
      element.autocomplete = 'off';
      await element.updateComplete;
      expect(input.getAttribute('autocomplete')).toBe('off');
    });
  });

  describe('methods', () => {
    it('has a focus method', () => {
      expect(element).toHaveProperty('focus');
    });
    it('focus method sets focus', async () => {
      expect(document.activeElement).not.toBe(element);
      await element.focus();
      expect(document.activeElement).toBe(element);
    });
  });
  describe('events', () => {
    describe('change', () => {
      it('emits a change event when native input fires one', async () => {
        const listener = oneEvent(element, UUISliderEvent.CHANGE);

        input.dispatchEvent(new Event('change'));

        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe(UUISliderEvent.CHANGE);
        expect(event!.target).toBe(element);
      });
    });
    describe('input', () => {
      it('emits a input event when native input fires one', async () => {
        const listener = oneEvent(element, UUISliderEvent.INPUT);

        input.dispatchEvent(new Event('input'));

        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe(UUISliderEvent.INPUT);
        expect(event!.target).toBe(element);
      });
    });
  });

  it('changes the value to the input value when input event is emitted', async () => {
    input.value = '10';
    input.dispatchEvent(new Event('input'));
    expect(element.value).toBe('10');
  });
});

describe('UuiTextfield with steps', () => {
  let dom: Element;
  beforeEach(async () => {
    dom = render(html`
      <uui-slider id="test" label="a slider label" step="1"></uui-slider>
    `).container.querySelector('uui-slider')!;

    await dom.updateComplete;
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(dom)).toHaveNoViolations();
  });
});

describe('UuiSlider in Form', () => {
  let formElement: HTMLFormElement;
  let element: UUISliderElement;
  beforeEach(async () => {
    formElement = render(
      html` <form @submit=${preventSubmit}>
        <uui-slider
          label="a slideruui-slider label"
          name="slider"
          value="28"
          step="1"></uui-slider>
      </form>`,
    ).container.querySelector('form')!;
    element = formElement.querySelector('uui-slider') as any;
  });

  it('value is correct', async () => {
    await expect(element.value).toBe('28');
  });

  it('form output', async () => {
    const formData = new FormData(formElement);
    await expect(formData.get('slider')).toBe('28');
  });

  it('change value and check output', async () => {
    element.value = '90';
    const formData = new FormData(formElement);
    await expect(formData.get('slider')).toBe('90');
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
