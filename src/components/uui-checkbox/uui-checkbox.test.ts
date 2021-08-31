import { html, fixture, expect } from '@open-wc/testing';
import { UUICheckboxElement } from './uui-checkbox.element';
import '.';

describe('UuiToggle', () => {
  let element: UUICheckboxElement;
  beforeEach(async () => {
    element = await fixture(
      html` <uui-checkbox label="test label" name="test"></uui-checkbox> `
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('has internals', async () => {
    await expect(element).to.have.property('_internals');
  });

  it('has default value equal to on', () => {
    expect(element.value).to.be.equal('on');
  });

  it('has name', () => {
    expect(element.name).to.be.equal('test');
  });
});

describe('UuiChebox in a Form', () => {
  let formElement: HTMLFormElement;
  let element: UUICheckboxElement;
  beforeEach(async () => {
    formElement = await fixture(
      html` <form>
        <uui-checkbox
          name="test"
          value="testValue"
          label="test label"
        ></uui-checkbox>
      </form>`
    );
    element = formElement.querySelector('uui-checkbox') as any;
  });

  it('form output is null if element not checked', () => {
    const formData = new FormData(formElement);
    expect(formData.get(`${element.name}`)).to.be.equal(null);
  });

  it('the form property on element internals is equal the form element', () => {
    expect(element._internals.form).to.be.equal(formElement);
  });

  it('form output is on if element is checked and has no value attribute', () => {
    element.checked = true;
    const formData = new FormData(formElement);
    expect(formData.get(`${element.name}`)).to.be.equal('testValue');
  });

  it('element has value atribute. form value should be the same', () => {
    element.value = 'bike';
    element.checked = true;
    const formData = new FormData(formElement);
    expect(formData.get(`test`)).to.equal('bike');
  });
});

describe('UuiCheckbox in a Form with no attributes', () => {
  let formElement: HTMLFormElement;
  let element: UUICheckboxElement;

  beforeEach(async () => {
    formElement = await fixture(
      html` <form>
        <uui-checkbox label="test label"></uui-checkbox>
      </form>`
    );
    element = formElement.querySelector('uui-checkbox') as any;
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
