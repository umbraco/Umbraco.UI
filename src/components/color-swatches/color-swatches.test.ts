import './color-swatches.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import { UUIColorSwatchesElement } from './color-swatches.element';
import type { UUIColorSwatchElement } from '../color-swatch/color-swatch.element.js';

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

describe('UUIColorSwatchesElement value', () => {
  let element: UUIColorSwatchesElement;
  let swatches: UUIColorSwatchElement[];

  beforeEach(async () => {
    element = render(html`
      <uui-color-swatches label="Color swatches" value="#ff0000">
        <uui-color-swatch label="Red" value="#ff0000"></uui-color-swatch>
        <uui-color-swatch label="Green" value="#00ff00"></uui-color-swatch>
      </uui-color-swatches>
    `).container.querySelector('uui-color-swatches')!;
    swatches = Array.from(element.querySelectorAll('uui-color-swatch'));

    await element.updateComplete;
  });

  it('selects the swatch matching the initial value', () => {
    expect(swatches[0].selected).toBe(true);
    expect(swatches[0].getAttribute('aria-checked')).toBe('true');
    expect(swatches[1].selected).toBe(false);
  });

  it('updates the selection when value is set programmatically', async () => {
    element.value = '#00ff00';
    await element.updateComplete;

    expect(swatches[0].selected).toBe(false);
    expect(swatches[0].getAttribute('aria-checked')).toBe('false');
    expect(swatches[1].selected).toBe(true);
    expect(swatches[1].active).toBe(true);
    expect(swatches[1].getAttribute('aria-checked')).toBe('true');
  });

  it('clears the selection when value is set to an empty string', async () => {
    element.value = '';
    await element.updateComplete;

    expect(swatches.some(swatch => swatch.selected)).toBe(false);
  });
});
