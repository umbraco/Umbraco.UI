/* eslint-disable lit/no-invalid-html */
/* eslint-disable lit/binding-positions */
import { UUIBooleanInputEvent, UUIBooleanInputElement } from '.';

import {
  defineCE,
  elementUpdated,
  expect,
  fixture,
  html,
  oneEvent,
  unsafeStatic,
} from '@open-wc/testing';
import { html as litHTMLLiteral } from 'lit';

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
    element = await fixture(html`<${tag} label="test label"></${tag}>`);
    input = element.shadowRoot?.querySelector('#input');
    label = element.shadowRoot?.querySelector('label') as HTMLLabelElement;
  });

  it('component element exists', () => {
    expect(element).to.exist;
  });
  it('input exists', () => {
    expect(input).to.exist;
  });
  it('label exists', () => {
    expect(label).to.exist;
  });

  it('has internals', () => {
    expect(element).to.have.property('_internals');
  });

  it('has default value equal to on', () => {
    expect(element.value).to.be.equal('on');
  });

  it('can be checked', () => {
    element.checked = true;
    expect(element.checked).to.be.equal(true);
  });

  it('if disabled, disables the native input', async () => {
    element.disabled = true;
    await elementUpdated(element);
    expect(input?.disabled).to.equal(true);
  });

  it('if checked, checks the native input', async () => {
    element.checked = true;
    await elementUpdated(element);
    expect(input?.checked).to.equal(true);
  });
  it('emits an change event when the input changes', async () => {
    const listener = oneEvent(element, UUIBooleanInputEvent.CHANGE, false);
    label.click();

    const event = await listener;
    expect(event).to.exist;
    expect(event.type).to.equal(UUIBooleanInputEvent.CHANGE);
    expect(event.bubbles).to.be.true;
    expect(event.composed).to.be.false;
    expect(event!.target).to.equal(element);
  });
});

describe('BooleanInputBaseElement in a Form', () => {
  let formElement: HTMLFormElement;
  let element: any;
  beforeEach(async () => {
    formElement = await fixture(
      html`<form @submit=${preventSubmit}><${tag} name="test" value="testValue"
      label="test label"></${tag}></form>`,
    );
    element = formElement.firstChild;
  });

  it('the form property on element internals is equal the form element', () => {
    expect(element._internals.form).to.be.equal(formElement);
  });
  it('form output is null if element not checked', () => {
    const formData = new FormData(formElement);
    expect(formData.get(`${element.name}`)).to.be.equal(null);
  });

  it('form output is equal to value if element is checked and has a value attribute', () => {
    element.checked = true;
    const formData = new FormData(formElement);
    expect(formData.get(`${element.name}`)).to.be.equal('testValue');
  });

  it('if element has value attribute form value should be the same', () => {
    element.value = 'bike';
    element.checked = true;
    const formData = new FormData(formElement);
    expect(formData.get(`test`)).to.equal('bike');
  });

  it('if no value is provided and the element is checked the formValue should be on', () => {
    element.value = '';
    element.checked = true;
    const formData = new FormData(formElement);
    expect(formData.get(`test`)).to.equal('on');
  });

  describe('submit', () => {
    it('should submit when pressing enter', async () => {
      const listener = oneEvent(formElement, 'submit', false);
      element.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));

      const event = await listener;
      expect(event).to.exist;
      expect(event.type).to.equal('submit');
      expect(event!.target).to.equal(formElement);
    });
  });

  describe('validation', () => {
    let formElement: HTMLFormElement;
    let element: any;
    beforeEach(async () => {
      formElement = await fixture(
        html`<form><${tag} label="test label" name="test"></${tag}></form>`,
      );
      element = formElement.firstChild;
    });

    describe('required', () => {
      beforeEach(async () => {
        element.setAttribute('required', 'true');
        await elementUpdated(element);
      });

      it('sets element to invalid when value is empty', async () => {
        expect(element.checkValidity()).to.be.false;
      });

      it('sets element to valid when it has a value', async () => {
        element.checked = true;
        await elementUpdated(element);
        expect(element.checkValidity()).to.be.true;
      });

      it('sets the form to invalid when value is empty', async () => {
        expect(formElement.checkValidity()).to.be.false;
      });

      it('sets the form to valid when it has a value', async () => {
        element.checked = true;
        await elementUpdated(element);
        expect(formElement.checkValidity()).to.be.true;
      });
    });

    describe('custom error', () => {
      beforeEach(async () => {
        element.setAttribute('error', 'true');
        await elementUpdated(element);
      });

      it('sets element to invalid when it has a custom error attribute', async () => {
        expect(element.checkValidity()).to.be.false;
      });

      it('sets element to valid when it doesnt have a custom error attribute', async () => {
        element.removeAttribute('error');
        await elementUpdated(element);
        expect(element.checkValidity()).to.be.true;
      });

      it('sets the form to invalid when value is empty', async () => {
        expect(formElement.checkValidity()).to.be.false;
      });

      it('sets the form to valid when it doesnt have a custom error attribute', async () => {
        element.removeAttribute('error');
        await elementUpdated(element);
        expect(formElement.checkValidity()).to.be.true;
      });
    });
  });
});

describe('element in a Form with no attributes', () => {
  let formElement: HTMLFormElement;
  let element: any;
  beforeEach(async () => {
    formElement = await fixture(
      html`<form><${tag} label="test label" name="test"></${tag}></form>`,
    );
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

    expect(formDataKeys.length).to.equal(0);
  });

  it('form value is on if not specified with attribute', async () => {
    element.name = 'test';
    element.checked = true;
    const formData = new FormData(formElement);
    expect(formData.get(`${element.name}`)).to.equal('on');
  });
});
