import { html, fixture, expect } from '@open-wc/testing';
import { UUIListItemDocumentTypeElement } from './uui-list-item-document-type.element';
import '.';

describe('UUIListItemDocumentTypeElement', () => {
  let element: UUIListItemDocumentTypeElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-list-item-document-type></uui-list-item-document-type> `
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
