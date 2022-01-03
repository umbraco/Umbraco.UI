import { html, fixture, expect } from '@open-wc/testing';
import { UUIInputPasswordElement } from './uui-input-password.element';
import '.';

describe('UUIInputPasswordElement', () => {
  let element: UUIInputPasswordElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-input-password></uui-input-password> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
