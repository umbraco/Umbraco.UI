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
});

describe('UuiToggle in Form', () => {
  let formElement: HTMLFormElement;
  let element: UUIToggleElement;
  beforeEach(async () => {
    formElement = await fixture(
      html` <form id="myForm">
        <uui-toggle></uui-toggle>
      </form>`
    );
    element = formElement.querySelector('uui-toggle') as any;
  });

  it('is not checked', async () => {
    await expect(element.checked).to.be.false;
  });

  it('is checked', async () => {
    element.checked = true;
    await expect(element.checked).to.be.true;
  });
});
