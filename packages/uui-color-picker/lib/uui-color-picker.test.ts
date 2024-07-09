import { html, fixture, expect } from '@open-wc/testing';
import { UUIColorPickerElement } from './uui-color-picker.element';

import '@umbraco-ui/uui-icon/lib';
import '@umbraco-ui/uui-icon-registry-essential/lib';
import '@umbraco-ui/uui-input/lib';
import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-button-group/lib';
import '@umbraco-ui/uui-color-swatches/lib';
import '@umbraco-ui/uui-color-swatch/lib';
import '@umbraco-ui/uui-color-area/lib';
import '@umbraco-ui/uui-color-slider/lib';
import '@umbraco-ui/uui-popover-container/lib';

describe('UUIColorPickerElement', () => {
  let element: UUIColorPickerElement;

  beforeEach(async () => {
    element = await fixture(html`
      <uui-color-picker label="Color picker"></uui-color-picker>
    `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIColorPickerElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
