import { html, fixture, expect } from '@open-wc/testing';
import { UUIDragHandleElement } from './uui-symbol-drag.element';

describe('UUIDragHandleElement', () => {
  let element: UUIDragHandleElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-symbol-drag></uui-symbol-drag> `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIDragHandleElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
