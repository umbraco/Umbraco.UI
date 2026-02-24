import { html, fixture, expect } from '@open-wc/testing';
import { UUIColorPickerElement } from './uui-color-picker.element';

import '../icon/index.js';
import '../icon-registry-essential/index.js';
import '../input/index.js';
import '../button/index.js';
import '../button-group/index.js';
import '../color-swatches/index.js';
import '../color-swatch/index.js';
import '../color-area/index.js';
import '../color-slider/index.js';
import '../popover-container/index.js';

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
