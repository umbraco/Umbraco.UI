import { html, fixture, expect } from '@open-wc/testing';
import { UUIDragHandleElement } from './uui-drag-handle.element';

describe('UUIDragHandleElement', () => {
  let element: UUIDragHandleElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-drag-handle></uui-drag-handle> `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIDragHandleElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
