import { html, fixture, expect } from '@open-wc/testing';
import { UUIRefNodeDocumentTypeElement } from './uui-ref-node-document-type.element';
import '.';

describe('UUIRefNodeDocumentTypeElement', () => {
  let element: UUIRefNodeDocumentTypeElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-ref-node-document-type></uui-ref-node-document-type> `
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
