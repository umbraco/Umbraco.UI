import { html, fixture, expect } from '@open-wc/testing';
import { UUIColorSwatchElement } from './uui-color-swatch.element';

describe('UUIColorSwatchElement', () => {
  let element: UUIColorSwatchElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-color-swatch></uui-color-swatch> `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIColorSwatchElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
