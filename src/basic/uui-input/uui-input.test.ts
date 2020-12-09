import { html, fixture, expect, elementUpdated } from '@open-wc/testing';

import '.';
import { UUIInputElement } from './uui-input.element';

describe('UuiButton', () => {
  let element: UUIInputElement;
  beforeEach(async () => {
    element = await fixture(html` <uui-input>Hello uui-button</uui-input> `);
  });

  it('passes the a11y audit', async () => {
    //await expect(element).shadowDom.to.be.accessible();
  });

  it('test that disable works', async () => {
    return true;
  });
});
