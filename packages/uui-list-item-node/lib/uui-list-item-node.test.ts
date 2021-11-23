import { html, fixture, expect } from '@open-wc/testing';
import { UUIListItemNodeElement } from './uui-list-item-node.element';
import '.';

describe('UUIListItemNodeElement', () => {
  let element: UUIListItemNodeElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-list-item-node></uui-list-item-node> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
