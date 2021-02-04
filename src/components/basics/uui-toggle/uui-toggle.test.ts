import { html, fixture, expect } from '@open-wc/testing';

import '.';
import { UUIToggleElement } from './uui-toggle.element';

describe('UuiToggle', () => {
  let element: UUIToggleElement;
  beforeEach(async () => {
    element = await fixture(html` <uui-toggle></uui-toggle> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

describe('UuiToggle in a Form', () => {
  let formElement: HTMLFormElement;
  let element: UUIToggleElement;
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
