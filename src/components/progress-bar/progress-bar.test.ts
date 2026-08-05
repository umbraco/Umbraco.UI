import { UUIProgressBarElement } from './progress-bar.element';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import './progress-bar.js';

describe('UUIProgressBarElement', () => {
  let element: UUIProgressBarElement;

  beforeEach(async () => {
    element = render(html`
      <uui-progress-bar label="Progress"></uui-progress-bar>
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
    element.progress = undefined as unknown as number;
    await element.updateComplete;

    expect(element.progress).toBe(0);
    expect(element.shadowRoot?.getElementById('bar')?.style.width).toBe('0%');
  });

  it('sets aria-busy when progress is indeterminate', async () => {
    element.progress = undefined as unknown as number;
    await element.updateComplete;

    const bar = element.shadowRoot?.getElementById('bar');
    expect(bar?.getAttribute('aria-busy')).toBe('true');
    expect(bar?.getAttribute('aria-invalid')).toBe('false');
    expect(bar?.hasAttribute('aria-valuemin')).toBe(false);
    expect(bar?.hasAttribute('aria-valuemax')).toBe(false);
    expect(bar?.hasAttribute('aria-valuenow')).toBe(false);
  });

  it('applies indeterminate animation class when progress is omitted', async () => {
    element.progress = undefined as unknown as number;
    await element.updateComplete;

    const bar = element.shadowRoot?.getElementById('bar');
    expect(bar?.classList.contains('indeterminate')).toBe(true);
  });

  it('removes indeterminate animation class when progress is determinate', async () => {
    element.progress = 10;
    await element.updateComplete;

    const bar = element.shadowRoot?.getElementById('bar');
    expect(bar?.classList.contains('indeterminate')).toBe(false);
  });

  it('sets aria value attributes when progress is determinate', async () => {
    element.progress = 10;
    await element.updateComplete;

    const bar = element.shadowRoot?.getElementById('bar');
    expect(bar?.getAttribute('aria-busy')).toBe('true');
    expect(bar?.getAttribute('aria-invalid')).toBe('false');
    expect(bar?.getAttribute('aria-valuemin')).toBe('0');
    expect(bar?.getAttribute('aria-valuemax')).toBe('100');
    expect(bar?.getAttribute('aria-valuenow')).toBe('10');
  });

  it('sets aria value attributes when status is finished and progress is omitted', async () => {
    element.status = 'finished';
    element.progress = undefined as unknown as number;
    await element.updateComplete;

    const bar = element.shadowRoot?.getElementById('bar');
    expect(bar?.getAttribute('aria-busy')).toBe('false');
    expect(bar?.getAttribute('aria-invalid')).toBe('false');
    expect(bar?.getAttribute('aria-valuemin')).toBe('0');
    expect(bar?.getAttribute('aria-valuemax')).toBe('100');
    expect(bar?.getAttribute('aria-valuenow')).toBe('0');
  });

  it('sets aria-invalid when status is error', async () => {
    element.status = 'error';
    await element.updateComplete;

    const bar = element.shadowRoot?.getElementById('bar');
    expect(bar?.getAttribute('aria-busy')).toBe('true');
    expect(bar?.getAttribute('aria-invalid')).toBe('true');
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

  it('updates aria-valuenow when progress is clamped after lowering max', async () => {
    element.progress = 80;
    element.max = 40;
    await element.updateComplete;

    expect(element.progress).toBe(40);
    expect(
      element.shadowRoot?.getElementById('bar')?.getAttribute('aria-valuenow'),
    ).toBe('40');
  });

  it('sets aria-valuemin and aria-valuenow from current values', async () => {
    element.max = 40;
    element.progress = 10;
    await element.updateComplete;

    expect(
      element.shadowRoot?.getElementById('bar')?.getAttribute('aria-valuemin'),
    ).toBe('0');
    expect(
      element.shadowRoot?.getElementById('bar')?.getAttribute('aria-valuemax'),
    ).toBe('40');
    expect(
      element.shadowRoot?.getElementById('bar')?.getAttribute('aria-valuenow'),
    ).toBe('10');
  });

  it('uses label property for aria-label when aria-label attribute is not set', async () => {
    element.label = 'Upload progress';
    await element.updateComplete;

    expect(
      element.shadowRoot?.getElementById('bar')?.getAttribute('aria-label'),
    ).toBe('Upload progress');
  });

  it('prefers aria-label attribute over label property', async () => {
    element.label = 'Property label';
    element.setAttribute('aria-label', 'Attribute label');
    await element.updateComplete;

    expect(
      element.shadowRoot?.getElementById('bar')?.getAttribute('aria-label'),
    ).toBe('Attribute label');
  });
});
