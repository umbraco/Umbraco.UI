import { html, fixture, expect } from '@open-wc/testing';
import { UUIMenuItemElement } from './uui-menu-item.element';
import '.';

describe('UUIMenuItemElement', () => {
  let element: UUIMenuItemElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-menu-item role="menu" label="menuitem"></uui-menu-item> `
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
