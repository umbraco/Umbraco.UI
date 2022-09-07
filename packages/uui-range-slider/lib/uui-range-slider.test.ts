import { html, fixture, expect } from '@open-wc/testing';
import { UUIRangeSliderElement } from './uui-range-slider.element';

describe('UUIRangeSliderElement', () => {
  let element: UUIRangeSliderElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-range-slider></uui-range-slider> `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIRangeSliderElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
