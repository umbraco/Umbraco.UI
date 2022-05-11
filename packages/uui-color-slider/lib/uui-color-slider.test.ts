import { html, fixture, expect } from '@open-wc/testing';
import { UUIColorSliderElement } from './uui-color-slider.element';
import '.';

describe('UUIColorSliderElement', () => {
  let element: UUIColorSliderElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-color-slider></uui-color-slider> `
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});