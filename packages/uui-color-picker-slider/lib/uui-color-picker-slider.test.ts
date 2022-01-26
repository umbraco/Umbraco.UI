import { html, fixture, expect } from '@open-wc/testing';
import { UUIColorPickerSliderElement } from './uui-color-picker-slider.element';
import '.';

describe('UUIColorPickerSliderElement', () => {
  let element: UUIColorPickerSliderElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-color-picker-slider></uui-color-picker-slider> `
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});