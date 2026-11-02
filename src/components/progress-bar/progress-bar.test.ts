import { UUIProgressBarElement } from './progress-bar.element';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import './progress-bar.js';

describe('UUIProgressBarElement', () => {
  let element: UUIProgressBarElement;

  const getBar = () => element.shadowRoot?.getElementById('bar');

  beforeEach(async () => {
    element = render(html`
      <uui-progress-bar label="Progress"></uui-progress-bar>
    `).container.querySelector('uui-progress-bar')!;

    await element.updateComplete;
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  it('passes the a11y audit when indeterminate', async () => {
    element.indeterminate = true;
    await element.updateComplete;
    expect(await axeRun(element)).toHaveNoViolations();
  });

  it('passes the a11y audit with a custom max', async () => {
    element.max = 10;
    element.progress = 3;
    await element.updateComplete;
    expect(await axeRun(element)).toHaveNoViolations();
  });

  it('clamps the negative values passed to progress to 0', async () => {
    element.progress = -44;
    expect(element.progress).toBe(0);
  });

  it('clamps the progress values greater than 100 to 100', async () => {
    element.progress = 200;
    expect(element.progress).toBe(100);
  });

  it('clamps the progress values greater than max to max', async () => {
    element.max = 25;
    element.progress = 44;
    expect(element.progress).toBe(25);
  });

  it('defaults progress to 0 when set to undefined', async () => {
    element.progress = undefined;
    await element.updateComplete;

    expect(element.progress).toBe(0);
    expect(getBar()?.style.width).toBe('0%');
  });

  it('keeps the requested progress when max is lowered and raised again', async () => {
    element.progress = 80;
    element.max = 40;
    expect(element.progress).toBe(40);

    element.max = 100;
    expect(element.progress).toBe(80);
  });

  it('does not depend on the order of the progress and max attributes', async () => {
    element = render(html`
      <uui-progress-bar
        label="Progress"
        progress="150"
        max="200"></uui-progress-bar>
    `).container.querySelector('uui-progress-bar')!;
    await element.updateComplete;

    expect(element.progress).toBe(150);
    expect(getBar()?.getAttribute('aria-valuenow')).toBe('150');
    expect(getBar()?.style.width).toBe('75%');
  });

  it('falls back to a max of 100 when the max attribute is removed', async () => {
    element.setAttribute('max', '200');
    element.progress = 50;
    await element.updateComplete;

    element.removeAttribute('max');
    await element.updateComplete;

    expect(element.max).toBe(100);
    expect(getBar()?.style.width).toBe('50%');
  });

  it('falls back to a max of 100 when max is zero or negative', async () => {
    element.max = 0;
    expect(element.max).toBe(100);

    element.max = -5;
    expect(element.max).toBe(100);
  });

  it('accepts a fractional max', async () => {
    element.max = 0.5;
    element.progress = 0.25;
    await element.updateComplete;

    expect(element.max).toBe(0.5);
    expect(getBar()?.style.width).toBe('50%');
  });

  it('sets the bar width corresponding to the progress', async () => {
    element.progress = 23;
    await element.updateComplete;
    expect(getBar()?.style.width).toBe('23%');
  });

  it('sets the bar width corresponding to max when max is not 100', async () => {
    element.max = 40;
    element.progress = 10;
    await element.updateComplete;
    expect(getBar()?.style.width).toBe('25%');
  });

  it('sets the aria value attributes from progress and max', async () => {
    element.max = 40;
    element.progress = 10;
    await element.updateComplete;

    const bar = getBar();
    expect(bar?.getAttribute('role')).toBe('progressbar');
    expect(bar?.getAttribute('aria-valuemin')).toBe('0');
    expect(bar?.getAttribute('aria-valuemax')).toBe('40');
    expect(bar?.getAttribute('aria-valuenow')).toBe('10');
  });

  it('omits the aria value attributes when indeterminate', async () => {
    element.progress = 10;
    element.indeterminate = true;
    await element.updateComplete;

    const bar = getBar();
    expect(bar?.hasAttribute('aria-valuemin')).toBe(false);
    expect(bar?.hasAttribute('aria-valuemax')).toBe(false);
    expect(bar?.hasAttribute('aria-valuenow')).toBe(false);
  });

  it('reflects the indeterminate attribute', async () => {
    element.indeterminate = true;
    await element.updateComplete;
    expect(element.hasAttribute('indeterminate')).toBe(true);

    element.indeterminate = false;
    await element.updateComplete;
    expect(element.hasAttribute('indeterminate')).toBe(false);
  });

  it('does not set aria-busy or aria-invalid for any status', async () => {
    for (const status of ['in-progress', 'finished', 'error'] as const) {
      element.status = status;
      await element.updateComplete;

      expect(getBar()?.hasAttribute('aria-busy')).toBe(false);
      expect(getBar()?.hasAttribute('aria-invalid')).toBe(false);
    }
  });

  it('reflects the status attribute', async () => {
    element.status = 'error';
    await element.updateComplete;
    expect(element.getAttribute('status')).toBe('error');
  });

  it('uses label property for aria-label when aria-label attribute is not set', async () => {
    element.label = 'Upload progress';
    await element.updateComplete;
    expect(getBar()?.getAttribute('aria-label')).toBe('Upload progress');
  });

  it('prefers aria-label attribute over label property', async () => {
    element.label = 'Property label';
    element.setAttribute('aria-label', 'Attribute label');
    await element.updateComplete;
    expect(getBar()?.getAttribute('aria-label')).toBe('Attribute label');
  });
});
