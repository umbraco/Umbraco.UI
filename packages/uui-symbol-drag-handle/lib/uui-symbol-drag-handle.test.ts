import { html, fixture, expect } from '@open-wc/testing';
import { UUISymbolDragHandleElement } from './uui-symbol-drag-handle.element';

describe('UUIDragHandleElement', () => {
  let element: UUISymbolDragHandleElement;

  beforeEach(async () => {
    element = await fixture(html`
      <uui-symbol-drag-handle></uui-symbol-drag-handle>
    `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUISymbolDragHandleElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
