import './input.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import { UUIInputElement } from './input.element.js';
import { UUIInputEvent } from './UUIInputEvent.js';

const preventSubmit = (e: SubmitEvent) => {
  e.preventDefault();
};

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/** Helper: one-shot event listener as a Promise. */
function oneEvent(el: EventTarget, event: string): Promise<Event> {
  return new Promise(resolve => {
    el.addEventListener(event, resolve, { once: true });
  });
}

describe('UuiInputElement', () => {
  let element: UUIInputElement;
  let input: HTMLInputElement;

  beforeEach(async () => {
    const screen = render(html`<uui-input label="label"></uui-input>`);
    element = screen.container.querySelector('uui-input')!;
    await element.updateComplete;
    input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  it('is defined with its own instance', () => {
    expect(element).toBeInstanceOf(UUIInputElement);
  });

  describe('properties', () => {
    it('has a name property', () => {
      expect(element).toHaveProperty('name');
    });
    it('has a type property', () => {
      expect(element).toHaveProperty('type');
    });
    it('has a value property', () => {
      expect(element).toHaveProperty('value');
    });
    it('has a placeholder property', () => {
      expect(element).toHaveProperty('placeholder');
    });
    it('has a disabled property', () => {
      expect(element).toHaveProperty('disabled');
    });
    it('has a readonly property', () => {
      expect(element).toHaveProperty('readonly');
    });
    it('has a error property', () => {
      expect(element).toHaveProperty('error');
    });
    it('has a errorMessage property', () => {
      expect(element).toHaveProperty('errorMessage');
    });
    it('has a required property', () => {
      expect(element).toHaveProperty('required');
    });
    it('has a requiredMessage property', () => {
      expect(element).toHaveProperty('requiredMessage');
    });
    it('has a autocomplete property', () => {
      expect(element).toHaveProperty('autocomplete');
    });
    it('has a autoWidth property', () => {
      expect(element).toHaveProperty('autoWidth');
    });

    it('disable property set input to disabled', async () => {
      element.disabled = true;
      await element.updateComplete;
      expect(input.disabled).toBe(true);
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).not.toBeNull();
    });

    it('renders a prepend slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=prepend]')!;
      expect(slot).not.toBeNull();
    });

    it('renders an append slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=append]')!;
      expect(slot).not.toBeNull();
    });
  });

  describe('events', () => {
    describe('focus', () => {
      it('emits a focus event when focused', async () => {
        const listener = oneEvent(element, 'focus');
        element.focus();
        const event = await listener;
        expect(event).not.toBeNull();
        expect(event.type).toBe('focus');
      });
    });
    describe('change', () => {
      it('emits a change event when native input fires one', async () => {
        const listener = oneEvent(element, UUIInputEvent.CHANGE);

        input.dispatchEvent(new Event('change'));

        const event = await listener;
        expect(event).not.toBeNull();
        expect(event.type).toBe(UUIInputEvent.CHANGE);
        expect(event.bubbles).toBe(true);
        expect(event.composed).toBe(false);
        expect(event.target).toBe(element);
      });
      it('change event bubbles up to a parent element', async () => {
        const screen = render(html`
          <uui-input label="label" id="outer">
            <uui-input label="label" id="inner" slot="prepend"></uui-input>
          </uui-input>
        `);

        const outerElement = screen.container.querySelector('#outer')!;
        const innerElement =
          screen.container.querySelector('#inner') as UUIInputElement;
        await innerElement.updateComplete;
        let outerEventTriggered = false;

        const innerElementInput = innerElement.shadowRoot?.querySelector(
          'input',
        ) as HTMLInputElement;

        const innerListener = oneEvent(innerElement, UUIInputEvent.CHANGE);
        outerElement.addEventListener(UUIInputEvent.CHANGE, () => {
          outerEventTriggered = true;
        });

        innerElementInput.dispatchEvent(new Event('change'));

        const innerEvent = await innerListener;
        await Promise.resolve();

        expect(outerEventTriggered).toBe(true);
        expect(innerElement).not.toBeNull();
        expect(innerElementInput).not.toBeNull();
        expect(innerEvent).not.toBeNull();
        expect(innerEvent.type).toBe(UUIInputEvent.CHANGE);
        expect(innerEvent.target).toBe(innerElement);
      });
    });
  });

  it('changes the value to the input value when input event is emitted', () => {
    input.value = 'test value';
    input.dispatchEvent(new Event('input'));
    expect(element.value).toBe('test value');
  });

  describe('text overflow', () => {
    it('has text-overflow ellipsis applied to input element', () => {
      const computedStyle = window.getComputedStyle(input);
      expect(computedStyle.textOverflow).toBe('ellipsis');
    });
  });
});

describe('UuiInput with native label element', () => {
  it('passes the a11y audit', async () => {
    const screen = render(html`
      <div>
        <label for="test">Input</label>
        <uui-input id="test" label="a input label"></uui-input>
      </div>
    `);
    const wrapper = screen.container.querySelector('div')!;
    expect(await axeRun(wrapper)).toHaveNoViolations();
  });
});

describe('UuiInput in Form', () => {
  let formElement: HTMLFormElement;
  let element: UUIInputElement;

  beforeEach(() => {
    const screen = render(html`
      <form @submit=${preventSubmit}>
        <uui-input label="a input label" name="input" value="Hello uui-input">
        </uui-input>
      </form>
    `);
    formElement = screen.container.querySelector('form')!;
    element = formElement.querySelector('uui-input') as UUIInputElement;
  });

  it('value is correct', () => {
    expect(element.value).toBe('Hello uui-input');
  });

  it('form output', () => {
    const formData = new FormData(formElement);
    expect(formData.get('input')).toBe('Hello uui-input');
  });

  it('change value and check output', () => {
    element.value = 'anotherValue';
    const formData = new FormData(formElement);
    expect(formData.get('input')).toBe('anotherValue');
  });

  describe('submit', () => {
    it('should submit when pressing enter', async () => {
      const listener = oneEvent(formElement, 'submit');
      element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      const event = await listener;
      expect(event).not.toBeNull();
      expect(event.type).toBe('submit');
      expect(event.target).toBe(formElement);
    });

    it('should not submit if type=color', async () => {
      element.type = 'color';
      await element.updateComplete;

      let isFulfilled = false;

      const listener = oneEvent(formElement, 'submit');

      listener.then(() => (isFulfilled = true));

      element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      await sleep(100);

      expect(isFulfilled).toBe(false);
    });
  });

  describe('validation', () => {
    describe('required', () => {
      beforeEach(async () => {
        element.setAttribute('required', 'true');
        element.value = '';
        await element.updateComplete;
      });

      it('sets element to invalid when value is empty', () => {
        expect(element.checkValidity()).toBe(false);
      });

      it('sets element to valid when it has a value', async () => {
        element.value = 'new value';
        await element.updateComplete;
        expect(element.checkValidity()).toBe(true);
      });

      it('sets the form to invalid when value is empty', () => {
        expect(formElement.checkValidity()).toBe(false);
      });

      it('sets the form to valid when it has a value', async () => {
        element.value = 'new value';
        await element.updateComplete;
        expect(formElement.checkValidity()).toBe(true);
      });
    });

    describe('custom error though attributes', () => {
      beforeEach(async () => {
        element.setAttribute('error', 'true');
        await element.updateComplete;
      });

      it('sets element to invalid when it has a custom error attribute', () => {
        expect(element.checkValidity()).toBe(false);
      });

      it('sets element to valid when it doesnt have a custom error attribute', async () => {
        element.removeAttribute('error');
        await element.updateComplete;
        expect(element.checkValidity()).toBe(true);
      });

      it('sets the form to invalid when value is empty', () => {
        expect(formElement.checkValidity()).toBe(false);
      });

      it('sets the form to valid when it doesnt have a custom error attribute', async () => {
        element.removeAttribute('error');
        await element.updateComplete;
        expect(formElement.checkValidity()).toBe(true);
      });
    });

    describe('custom error through setCustomValidity', () => {
      it('sets element to invalid when it sets custom validity', () => {
        const validationMessage = 'custom error';
        element.setCustomValidity(validationMessage);
        expect(element.checkValidity()).toBe(false);
        expect(element.validationMessage).toBe(validationMessage);
      });

      it('sets the form to invalid when value is empty', () => {
        element.setCustomValidity('custom error');
        expect(formElement.checkValidity()).toBe(false);
      });

      it('sets element to valid when it sets custom validity to an empty string', () => {
        const validationMessage = '';
        element.setCustomValidity(validationMessage);
        expect(element.checkValidity()).toBe(true);
        expect(element.validationMessage).toBe(validationMessage);
      });

      it('sets the form to valid when it doesnt have custom validity', () => {
        element.setCustomValidity('');
        expect(formElement.checkValidity()).toBe(true);
      });
    });
  });

  describe('native validation', () => {
    describe('email', () => {
      beforeEach(async () => {
        element.value = '';
        element.setAttribute('type', 'email');
        await element.updateComplete;
      });

      it('sets element to valid when value is empty', () => {
        expect(element.checkValidity()).toBe(true);
      });

      it('email element is invalid when it has a none compliant value', async () => {
        element.value = 'new value';
        await element.updateComplete;
        expect(element.checkValidity()).toBe(false);
      });

      it('email element is valid when it has a email value', async () => {
        element.value = 'my@email.com';
        await element.updateComplete;
        expect(element.checkValidity()).toBe(true);
      });
    });

    describe('url', () => {
      beforeEach(async () => {
        element.value = '';
        element.setAttribute('type', 'url');
        await element.updateComplete;
      });

      it('sets element to valid when value is empty', () => {
        expect(element.checkValidity()).toBe(true);
      });

      it('url element is invalid when it has a none compliant value', async () => {
        element.value = 'new value';
        await element.updateComplete;
        expect(element.checkValidity()).toBe(false);
      });

      it('url element is valid when it has a email value', async () => {
        element.value = 'http://umbraco.com';
        await element.updateComplete;
        expect(element.checkValidity()).toBe(true);
      });
    });
  });
});
