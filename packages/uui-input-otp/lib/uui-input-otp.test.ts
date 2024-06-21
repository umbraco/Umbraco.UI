import { html, fixture, expect } from '@open-wc/testing';
import { UUIInputOtpElement } from './uui-input-otp.element';

describe('UUIInputOtpElement', () => {
  let element: UUIInputOtpElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-input-otp></uui-input-otp> `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIInputOtpElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
