import { html, fixture, expect } from '@open-wc/testing';
import { UUIRelativeTimeElement } from './uui-relative-time.element';

describe('UUIRelativeTimeElement', () => {
  let element: UUIRelativeTimeElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-relative-time></uui-relative-time> `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIRelativeTimeElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
