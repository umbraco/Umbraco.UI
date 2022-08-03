import { html, fixture, expect } from '@open-wc/testing';
import { UUIColorPickerElement } from './uui-color-picker.element';

describe('UUIColorPickerElement', () => {
  let element: UUIColorPickerElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-color-picker></uui-color-picker> `
    );
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIColorPickerElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});