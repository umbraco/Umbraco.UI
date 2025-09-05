import { html, fixture, expect } from '@open-wc/testing';
import { UUIDividerElement } from './uui-divider.element';

describe('UUIDividerElement', () => {
  let element: UUIDividerElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-divider></uui-divider> `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIDividerElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
