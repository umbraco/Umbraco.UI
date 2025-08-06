import { html, fixture, expect } from '@open-wc/testing';
import { UUIInputColorElement } from './uui-input-color.element';

describe('UUIInputColorElement', () => {
  let element: UUIInputColorElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-input-color></uui-input-color> `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIInputColorElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
