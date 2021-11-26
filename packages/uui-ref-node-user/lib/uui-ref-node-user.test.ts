import { html, fixture, expect } from '@open-wc/testing';
import { UUIRefNodeUserElement } from './uui-ref-node-user.element';
import '.';

describe('UUIRefNodeUserElement', () => {
  let element: UUIRefNodeUserElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-ref-node-user></uui-ref-node-user> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
