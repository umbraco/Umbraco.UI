import './color-slider.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import { UUIColorSliderElement } from './color-slider.element';

describe('UUIColorSliderElement', () => {
  let element: UUIColorSliderElement;

  beforeEach(async () => {
    element = render(html`
      <uui-color-slider label="Color slider"></uui-color-slider>
    `).container.querySelector('uui-color-slider')!;

    await element.updateComplete;
  });

  it('is defined with its own instance', () => {
    expect(element).toBeInstanceOf(UUIColorSliderElement);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });
});
