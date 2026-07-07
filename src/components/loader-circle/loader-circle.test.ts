import './loader-circle.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import { UUILoaderCircleElement } from './loader-circle.element.js';

describe('UUILoaderCircleElement', () => {
  let element: UUILoaderCircleElement;

  beforeEach(async () => {
    element = render(html`
      <uui-loader-circle></uui-loader-circle>
    `).container.querySelector('uui-loader-circle')!;

    await element.updateComplete;
  });

  it('is defined with its own instance', () => {
    expect(element).toBeInstanceOf(UUILoaderCircleElement);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });
});
