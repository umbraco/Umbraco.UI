import './visually-hidden.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import { UUIVisuallyHiddenElement } from './visually-hidden.element';

describe('UUIVisuallyHiddenElement', () => {
  let element: UUIVisuallyHiddenElement;

  beforeEach(async () => {
    element = render(html`
      <uui-visually-hidden></uui-visually-hidden>
    `).container.querySelector('uui-visually-hidden')!;

    await element.updateComplete;
  });

  it('is defined with its own instance', () => {
    expect(element).toBeInstanceOf(UUIVisuallyHiddenElement);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });
});
