import { UUILoaderBarElement } from './loader-bar.element';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import './loader-bar.js';

describe('UuiTextfield with steps', () => {
  let element: UUILoaderBarElement;
  beforeEach(async () => {
    element = render(html` <uui-loader-bar></uui-loader-bar> `).container.querySelector('uui-loader-bar')!;

    await element.updateComplete;
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  it('clamps the negative values passed to progress to 0', async () => {
    element.progress = -44;
    await expect(element.progress).toBe(0);
  });

  it('clamps the progress values greater then 100 to 100', async () => {
    element.progress = 200;
    await expect(element.progress).toBe(100);
  });

  it('clamps the animationDuriation value to number greater then 0', async () => {
    element.animationDuration = -20;
    await expect(element.animationDuration).toBe(1);
  });
});
