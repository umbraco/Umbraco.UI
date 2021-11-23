import { html, fixture, expect } from '@open-wc/testing';
import { UUIListItemMemberElement } from './uui-list-item-member.element';
import '.';

describe('UUIListItemMemberElement', () => {
  let element: UUIListItemMemberElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-list-item-member></uui-list-item-member> `
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
