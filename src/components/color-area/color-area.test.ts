import './color-area.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import { UUIColorAreaElement } from './color-area.element';

describe('UUIColorAreaElement', () => {
  let element: UUIColorAreaElement;

  beforeEach(async () => {
    element = render(html` <uui-color-area></uui-color-area> `).container.querySelector('uui-color-area')!;

    await element.updateComplete;
  });

  it('is defined with its own instance', () => {
    expect(element).toBeInstanceOf(UUIColorAreaElement);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });
});
