import { UUILoaderElement } from './loader.element';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import './loader.js';

describe('UuiLoader', () => {
  let element: UUILoaderElement;
  beforeEach(async () => {
    element = render(html` <uui-loader></uui-loader> `).container.querySelector('uui-loader')!;

    await element.updateComplete;
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });
});
