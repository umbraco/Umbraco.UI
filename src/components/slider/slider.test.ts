import './slider.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';

import { UUISliderElement } from './slider.element';
import { UUISliderEvent } from './UUISliderEvent';

/** Helper: one-shot event listener as a Promise. */
function oneEvent(el: EventTarget, event: string): Promise<Event> {
  return new Promise(resolve => {
    el.addEventListener(event, resolve, { once: true });
  });
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
    formElement = render(html` <form @submit=${preventSubmit}>
        <uui-slider
          label="a slideruui-slider label"
          name="slider"
          value="28"
          step="1"></uui-slider>
      </form>`).container.querySelector('form')!;
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
