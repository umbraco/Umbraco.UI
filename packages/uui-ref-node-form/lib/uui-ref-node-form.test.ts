import { html, fixture, expect } from '@open-wc/testing';
import { UUIRefNodeFormElement } from './uui-ref-node-form.element';
import '.';

describe('UUIRefNodeFormElement', () => {
  let element: UUIRefNodeFormElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-ref-node-form></uui-ref-node-form> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
