import {
  defineCE,
  elementUpdated,
  expect,
  fixture,
  html,
  unsafeStatic,
} from '@open-wc/testing';
import { html as litHTMLLiteral } from 'lit';
import { UUIBooleanInputBaseElement } from './uui-boolean-input-base.element';

const tagName = defineCE(
  class BooleanInputTestElement extends UUIBooleanInputBaseElement {
    renderCheckbox() {
      return litHTMLLiteral`
            <div id="testCheckbox">
            </div>
          `;
    }
  }
);

const tag = unsafeStatic(tagName);

describe('UUI Boolean input base class', () => {
  let element: any;
  let input: HTMLInputElement | null | undefined;
  beforeEach(async () => {
    element = await fixture(html`<${tag} label="test label"></${tag}>`);
    input = element.shadowRoot?.querySelector('#input');
  });

  it('exists', () => {
    expect(element).to.exist;
  });

  it('renders all the elements to shadow dom', () => {
    expect(element).shadowDom.to.equal(
      ` <label><input aria-checked="false" aria-label="test label" id="input" role="checkbox" type="checkbox"><div id="testCheckbox"></div><span class="label">test label</span><slot class="label" name="" style="visibility: hidden"></slot></label>`
    );
  });

  it('has internals', async () => {
    await expect(element).to.have.property('_internals');
  });

  it('has default value equal to on', () => {
    expect(element.value).to.be.equal('on');
  });

  it('can be checked', () => {
    element.checked = true;
    expect(element.checked).to.be.equal(true);
  });

  it('contains a native input', async () => {
    await expect(input).to.exist;
  });

  it('if disabled disables the native input', async () => {
    element.disabled = true;
    await elementUpdated(element);
    expect(input?.disabled).to.equal(true);
  });

  it('if checked checks the native input', async () => {
    element.checked = true;
    await elementUpdated(element);
    expect(input?.checked).to.equal(true);
  });
});

describe('UuiToggle in a Form', () => {
  let formElement: HTMLFormElement;
  let element: any;
  beforeEach(async () => {
    formElement = await fixture(
      html`<form><${tag} name="test" value="testValue"
      label="test label"></${tag}></form>`
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

  it('if element has value atribute form value should be the same', () => {
    element.value = 'bike';
    element.checked = true;
    const formData = new FormData(formElement);
    expect(formData.get(`test`)).to.equal('bike');
  });
});

describe('element in a Form with no attributes', () => {
  let formElement: HTMLFormElement;
  let element: any;
  beforeEach(async () => {
    formElement = await fixture(
      html`<form><${tag} label="test label"></${tag}></form>`
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
});
