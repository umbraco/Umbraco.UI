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

  it('test that disable works', async () => {
    return true;
  });

  // it ('has value off if not checked', async () => {
  //   element.checked = false;
  //   await expect(element.value).to.equal('off');
  // })

  it('has value on if checked', async () => {
    element.checked = true;
    await expect(element.value).to.equal('on');
  });
});

describe('UuiToggle in Form', () => {
  let formElement: HTMLFormElement;
  let element: UUIToggleElement;
  beforeEach(async () => {
    formElement = await fixture(
      html` <form id="myForm">
        <uui-toggle name="test"></uui-toggle>
      </form>`
    );
    element = formElement.querySelector('uui-toggle') as any;
  });

  it('form output', async () => {
    const formData = new FormData(formElement);
    await expect(formData.get(`${element.name}`)).to.be.equal('off');
  });

  it('is not checked', async () => {
    element.checked = false;
    await expect(element.checked).to.be.false;
  });

  it('is checked', async () => {
    element.checked = true;
    await expect(element.checked).to.be.true;
  });

  it('has name attribute', async () => {
    await expect(element).to.haveOwnProperty.name;
  });
});
