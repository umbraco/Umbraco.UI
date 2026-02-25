import './color-slider.js';
import { html, fixture, expect } from '@open-wc/testing';
import { UUIColorSliderElement } from './color-slider.element';

describe('UUIColorSliderElement', () => {
  let element: UUIColorSliderElement;

  beforeEach(async () => {
    element = await fixture(html`
      <uui-color-slider label="Color slider"></uui-color-slider>
    `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIColorSliderElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
