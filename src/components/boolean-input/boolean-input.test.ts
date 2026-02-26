import './boolean-input.js';
import { render } from 'vitest-browser-lit';
import { unsafeStatic, html as staticHtml } from 'lit/static-html.js';
/* eslint-disable lit/no-invalid-html */
/* eslint-disable lit/binding-positions */
import {
  UUIBooleanInputEvent,
  UUIBooleanInputElement,
} from './boolean-input.js';

import { html as litHTMLLiteral } from 'lit';

let __defineCECounter = 0;
function defineCE(klass: CustomElementConstructor): string {
  const name = `test-${__defineCECounter++}-${Date.now()}`;
  customElements.define(name, klass);
  return name;
}

/** Helper: one-shot event listener as a Promise. */
function oneEvent(el: EventTarget, event: string): Promise<Event> {
  return new Promise(resolve => {
    el.addEventListener(event, resolve, { once: true });
  });
}

const tagName = defineCE(
  class BooleanInputTestElement extends UUIBooleanInputElement {
    renderCheckbox() {
      return litHTMLLiteral`
      <div id="testCheckbox">
      </div>
    `;
    }
  },
);

const tag = unsafeStatic(tagName);

const preventSubmit = (e: SubmitEvent) => {
  e.preventDefault();
};

describe('UUIBooleanInputElement', () => {
  let element: any;
  let label: HTMLLabelElement;
  let input: HTMLInputElement | null | undefined;
  beforeEach(async () => {
    element = render(staticHtml`<${tag} label="test label"></${tag}>`).container.querySelector(tagName)!;
    await element.updateComplete;
    input = element.shadowRoot?.querySelector('#input');
    label = element.shadowRoot?.querySelector('label') as HTMLLabelElement;
  });

  it('component element exists', () => {
    expect(element).not.toBe(null);
  });
  it('input exists', () => {
    expect(input).not.toBe(null);
  });
  it('label exists', () => {
    expect(label).not.toBe(null);
  });

  it('has internals', () => {
    expect(element).toHaveProperty('_internals');
  });

  it('has default value equal to on', () => {
    expect(element.value).toBe('on');
  });

  it('can be checked', () => {
    element.checked = true;
    expect(element.checked).toBe(true);
  });

  it('if disabled, disables the native input', async () => {
    element.disabled = true;
    await element.updateComplete;
    expect(input?.disabled).toBe(true);
  });

  it('if checked, checks the native input', async () => {
    element.checked = true;
    await element.updateComplete;
    expect(input?.checked).toBe(true);
  });
  it('emits an change event when the input changes', async () => {
    const listener = oneEvent(element, UUIBooleanInputEvent.CHANGE);
    label.click();

    const event = await listener;
    expect(event).not.toBe(null);
    expect(event.type).toBe(UUIBooleanInputEvent.CHANGE);
    expect(event.bubbles).toBe(true);
    expect(event.composed).toBe(false);
    expect(event!.target).toBe(element);
  });
});

describe('BooleanInputBaseElement in a Form', () => {
  let formElement: HTMLFormElement;
  let element: any;
  beforeEach(async () => {
    formElement = render(staticHtml`<form @submit=${preventSubmit}><${tag} name="test" value="testValue"
      label="test label"></${tag}></form>`).container.querySelector('form')!;
    element = formElement.firstChild;
  });

  it('the form property on element internals is equal the form element', () => {
    expect(element._internals.form).toBe(formElement);
  });
  it('form output is null if element not checked', () => {
    const formData = new FormData(formElement);
    expect(formData.get(`${element.name}`)).toBe(null);
  });

  it('form output is equal to value if element is checked and has a value attribute', () => {
    element.checked = true;
    const formData = new FormData(formElement);
    expect(formData.get(`${element.name}`)).toBe('testValue');
  });

  it('if element has value attribute form value should be the same', () => {
    element.value = 'bike';
    element.checked = true;
    const formData = new FormData(formElement);
    expect(formData.get(`test`)).toBe('bike');
  });

  it('if no value is provided and the element is checked the formValue should be on', () => {
    element.value = '';
    element.checked = true;
    const formData = new FormData(formElement);
    expect(formData.get(`test`)).toBe('on');
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

  describe('validation', () => {
    let formElement: HTMLFormElement;
    let element: any;
    beforeEach(async () => {
      formElement = render(staticHtml`<form><${tag} label="test label" name="test"></${tag}></form>`).container.querySelector('form')!;
      element = formElement.firstChild;
    });

    describe('required', () => {
      beforeEach(async () => {
        element.setAttribute('required', 'true');
        await element.updateComplete;
      });

      it('sets element to invalid when value is empty', async () => {
        expect(element.checkValidity()).toBe(false);
      });

      it('sets element to valid when it has a value', async () => {
        element.checked = true;
        await element.updateComplete;
        expect(element.checkValidity()).toBe(true);
      });

      it('sets the form to invalid when value is empty', async () => {
        expect(formElement.checkValidity()).toBe(false);
      });

      it('sets the form to valid when it has a value', async () => {
        element.checked = true;
        await element.updateComplete;
        expect(formElement.checkValidity()).toBe(true);
      });
    });

    describe('custom error', () => {
      beforeEach(async () => {
        element.setAttribute('error', 'true');
        await element.updateComplete;
      });

      it('sets element to invalid when it has a custom error attribute', async () => {
        expect(element.checkValidity()).toBe(false);
      });

      it('sets element to valid when it doesnt have a custom error attribute', async () => {
        element.removeAttribute('error');
        await element.updateComplete;
        expect(element.checkValidity()).toBe(true);
      });

      it('sets the form to invalid when value is empty', async () => {
        expect(formElement.checkValidity()).toBe(false);
      });

      it('sets the form to valid when it doesnt have a custom error attribute', async () => {
        element.removeAttribute('error');
        await element.updateComplete;
        expect(formElement.checkValidity()).toBe(true);
      });
    });
  });
});

describe('element in a Form with no attributes', () => {
  let formElement: HTMLFormElement;
  let element: any;
  beforeEach(async () => {
    formElement = render(staticHtml`<form><${tag} label="test label" name="test"></${tag}></form>`).container.querySelector('form')!;
    element = formElement.firstChild;
  });

  it('element does not create form value if no name is provided', () => {
    element.name = '';
    element.checked = true;
    const formData = new FormData(formElement);
    const formDataKeys: Array<any> = [];

    formData.forEach(key => {
      formDataKeys.push(key);
    });

    expect(formDataKeys.length).toBe(0);
  });

  it('form value is on if not specified with attribute', async () => {
    element.name = 'test';
    element.checked = true;
    const formData = new FormData(formElement);
    expect(formData.get(`${element.name}`)).toBe('on');
  });
});
