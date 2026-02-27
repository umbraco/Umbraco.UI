import './input-password.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import '../icon/icon.js';
import '../button/button.js';
import '../input/input.js';
import { UUIInputElement } from '../input/input.js';

import { UUIInputPasswordElement } from './input-password.element';

describe('UUIInputPasswordElement', () => {
  let element: UUIInputPasswordElement;

  beforeEach(async () => {
    element = render(html`
      <uui-input-password label="label"></uui-input-password>
    `).container.querySelector('uui-input-password')!;

    await element.updateComplete;
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  it('is defined with its own instance', () => {
    expect(element).toBeInstanceOf(UUIInputPasswordElement);
  });

  it('inherits from uui-input', () => {
    expect(element).toBeInstanceOf(UUIInputElement);
  });

  it('correctly toggles password type', async () => {
    element.type = 'password';

    const toggle = element.shadowRoot?.querySelector(
      '#eye',
    ) as HTMLButtonElement;
    await toggle.click();
    await expect(element.type).toBe('text');
  });
});
