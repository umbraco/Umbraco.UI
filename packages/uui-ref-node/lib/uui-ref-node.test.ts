import { html, fixture, expect } from '@open-wc/testing';
import { UUIRefNodeElement } from './uui-ref-node.element';
import '.';

describe('UUIRefNodeElement', () => {
  let element: UUIRefNodeElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-ref-node></uui-ref-node> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
