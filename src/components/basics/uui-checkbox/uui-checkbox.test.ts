import { html, fixture, expect } from '@open-wc/testing';

import '.';
import { UUICheckboxElement } from './uui-checkbox.element';

describe('UuiToggle', () => {
  let element: UUICheckboxElement;
  beforeEach(async () => {
    element = await fixture(html` <uui-toggle></uui-toggle> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('has internals', async () => {
    await expect(element).to.have.property('_internals');
  });

  it('has value', () => {
    expect(element.value).to.be.equal('on');
  });
});

describe('UuiToggle in a Form', () => {
  let formElement: HTMLFormElement;
  let element: UUICheckboxElement;
  beforeEach(async () => {
    formElement = await fixture(
      html` <form>
        <uui-toggle name="test"></uui-toggle>
      </form>`
    );
    element = formElement.querySelector('uui-toggle') as any;
  });

  it('form output is null if element not checked', () => {
    const formData = new FormData(formElement);
    expect(formData.get(`${element.name}`)).to.be.equal(null);
  });

  it('form output is on if element is checked and has no value attribute', () => {
    element.checked = true;
    const formData = new FormData(formElement);
    expect(formData.get(`${element.name}`)).to.be.equal('on');
  });

  it('element hav value atribute form value should be the same', () => {
    element.value = 'bike';
    element.checked = true;
    const formData = new FormData(formElement);
    expect(formData.get(`test`)).to.equal('bike');
  });
});
