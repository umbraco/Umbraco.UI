import './color-swatches.js';
import { html, fixture, expect } from '@open-wc/testing';
import { UUIColorSwatchesElement } from './color-swatches.element';

import '../color-swatch/color-swatch.js';

describe('UUIColorSwatchesElement', () => {
  let element: UUIColorSwatchesElement;

  beforeEach(async () => {
    element = await fixture(html`
      <uui-color-swatches label="Color swatches"></uui-color-swatches>
    `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIColorSwatchesElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
