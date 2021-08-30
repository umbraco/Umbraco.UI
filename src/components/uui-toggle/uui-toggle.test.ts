import { html, fixture, expect } from '@open-wc/testing';
import { UUIToggleElement } from './uui-toggle.element';
import '.';
import { property } from 'lit/decorators';

describe('UuiToggle', () => {
  let element: UUIToggleElement;
  beforeEach(async () => {
    element = await fixture(
      html` <uui-toggle label="test label"></uui-toggle> `
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

  it('can be checked', () => {
    element.checked = true;
    expect(element.checked).to.be.equal(true);
  });
});

describe('UuiToggle in a Form', () => {
  let formElement: HTMLFormElement;
  let element: UUIToggleElement;
  beforeEach(async () => {
    formElement = await fixture(
      html` <form>
        <uui-toggle
          label="test label"
          name="test"
          value="testValue"
        ></uui-toggle>
      </form>`
    );
    element = formElement.querySelector('uui-toggle') as any;
  });

  it('the form property on element internals is equal the form element', () => {
    expect(element._internals.form).to.be.equal(formElement);
  });
  it('form output is null if element not checked', () => {
    const formData = new FormData(formElement);
    expect(formData.get(`${element.name}`)).to.be.equal(null);
  });

  it('form output is on if element is checked and has no value attribute', () => {
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

describe('UuiToggle in a Form with no attributes', () => {
  let formElement: HTMLFormElement;
  let element: UUIToggleElement;
  beforeEach(async () => {
    formElement = await fixture(
      html` <form>
        <uui-toggle label="test label"></uui-toggle>
      </form>`
    );
    element = formElement.querySelector('uui-toggle') as any;
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
