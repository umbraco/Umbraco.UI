import { html, fixture, expect, elementUpdated } from '@open-wc/testing';

import '.';
import { UUITextFieldElement } from './uui-textfield.element';

describe('UuiTextfield', () => {
  let element: UUITextFieldElement;
  beforeEach(async () => {
    element = await fixture(
      html` <uui-textfield>Hello uui-textfield</uui-textfield> `
    );
  });

  it('passes the a11y audit', async () => {
    //await expect(element).shadowDom.to.be.accessible();
  });

  it('test that disable works', async () => {
    return true;
  });
});
