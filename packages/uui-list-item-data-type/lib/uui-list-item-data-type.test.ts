import { html, fixture, expect } from '@open-wc/testing';
import { UUIListItemDataTypeElement } from './uui-list-item-data-type.element';
import '.';

describe('UUIListItemDataTypeElement', () => {
  let element: UUIListItemDataTypeElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-list-item-data-type></uui-list-item-data-type> `
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
