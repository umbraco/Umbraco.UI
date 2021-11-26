import { html, fixture, expect } from '@open-wc/testing';
import { UUIRefNodeDataTypeElement } from './uui-ref-node-data-type.element';
import '.';

describe('UUIRefNodeDataTypeElement', () => {
  let element: UUIRefNodeDataTypeElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-ref-node-data-type></uui-ref-node-data-type> `
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
