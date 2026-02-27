import './color-swatches.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import { UUIColorSwatchesElement } from './color-swatches.element';

import '../color-swatch/color-swatch.js';

describe('UUIColorSwatchesElement', () => {
  let element: UUIColorSwatchesElement;

  beforeEach(async () => {
    element = render(html`
      <uui-color-swatches label="Color swatches"></uui-color-swatches>
    `).container.querySelector('uui-color-swatches')!;

    await element.updateComplete;
  });

  it('is defined with its own instance', () => {
    expect(element).toBeInstanceOf(UUIColorSwatchesElement);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });
});
