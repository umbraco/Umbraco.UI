import { html, fixture, expect } from '@open-wc/testing';
import { UUIListItemFormElement } from './uui-list-item-form.element';
import '.';

describe('UUIListItemFormElement', () => {
  let element: UUIListItemFormElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-list-item-form></uui-list-item-form> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
