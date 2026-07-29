import { UUIProgressBarElement } from './progress-bar.element';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import './progress-bar.js';

describe('UUIProgressBarElement', () => {
  let element: UUIProgressBarElement;

  beforeEach(async () => {
    element = render(html`
      <uui-progress-bar></uui-progress-bar>
    `).container.querySelector('uui-progress-bar')!;

    await element.updateComplete;
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  it('clamps the negative values passed to progress to 0', async () => {
    element.progress = -44;
    expect(element.progress).toBe(0);
  });

  it('clamps the progress values greater then 100 to 100', async () => {
    element.progress = 200;
    expect(element.progress).toBe(100);
  });

  it('clamps the progress values greater than max to max', async () => {
    element.max = 25;
    element.progress = 44;
    expect(element.progress).toBe(25);
  });

  it('clamps existing progress when max is lowered', async () => {
    element.progress = 80;
    element.max = 40;
    expect(element.progress).toBe(40);
  });

  it('sets the bar width corresponding to the progress', async () => {
    element.progress = 23;
    await element.updateComplete;
    const bar = element.shadowRoot?.getElementById('bar');
    expect(bar?.style.width).toBe('23%');
  });

  it('sets the bar width corresponding to max when max is not 100', async () => {
    element.max = 40;
    element.progress = 10;
    await element.updateComplete;
    const bar = element.shadowRoot?.getElementById('bar');
    expect(bar?.style.width).toBe('25%');
  });

  it('sets aria-valuemax from max', async () => {
    element.max = 40;
    await element.updateComplete;
    const bar = element.shadowRoot?.getElementById('bar');
    expect(bar?.getAttribute('aria-valuemax')).toBe('40');
  });
});
