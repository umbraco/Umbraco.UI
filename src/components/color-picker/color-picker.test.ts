import './color-picker.js';
import { html, fixture, expect } from '@open-wc/testing';
import { UUIColorPickerElement } from './color-picker.element';

import '../icon/icon.js';
import '../icon-registry-essential/icon-registry-essential.js';
import '../input/input.js';
import '../button/button.js';
import '../button-group/button-group.js';
import '../color-swatches/color-swatches.js';
import '../color-swatch/color-swatch.js';
import '../color-area/color-area.js';
import '../color-slider/color-slider.js';
import '../popover-container/popover-container.js';

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
