import { html, fixture, expect } from '@open-wc/testing';
import { UUIListItemElement } from './uui-list-item.element';
import '.';

describe('UUIListItemElement', () => {
  let element: UUIListItemElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-list-item></uui-list-item> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
