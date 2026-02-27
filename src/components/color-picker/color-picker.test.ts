import './color-picker.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
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
    element = render(html`
      <uui-color-picker label="Color picker"></uui-color-picker>
    `).container.querySelector('uui-color-picker')!;

    await element.updateComplete;
  });

  it('is defined with its own instance', () => {
    expect(element).toBeInstanceOf(UUIColorPickerElement);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });
});
