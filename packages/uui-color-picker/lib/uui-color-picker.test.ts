import { html, fixture, expect } from '@open-wc/testing';
import { UUIColorPickerElement } from './uui-color-picker.element';
import '.';

describe('UUIColorPickerElement', () => {
  let element: UUIColorPickerElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-color-picker></uui-color-picker> `
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});