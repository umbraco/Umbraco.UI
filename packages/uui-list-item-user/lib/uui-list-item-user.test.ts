import { html, fixture, expect } from '@open-wc/testing';
import { UUIListItemUserElement } from './uui-list-item-user.element';
import '.';

describe('UUIListItemUserElement', () => {
  let element: UUIListItemUserElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-list-item-user></uui-list-item-user> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
