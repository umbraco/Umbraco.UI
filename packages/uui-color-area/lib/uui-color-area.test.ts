import { html, fixture, expect } from '@open-wc/testing';
import { UUIColorAreaElement } from './uui-color-area.element';

describe('UUIColorAreaElement', () => {
  let element: UUIColorAreaElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-color-area></uui-color-area> `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIColorAreaElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
