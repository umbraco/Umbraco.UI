import './input-lock.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';

import { axeRun } from '../../internal/test/a11y.js';
import { oneEvent } from '../../internal/test/index.js';
import { UUIInputElement } from '../input/input.js';
import '../icon/icon.js';
import '../button/button.js';

import { UUIInputLockElement } from './input-lock.element';
import { UUIInputLockEvent } from './UUIInputLockEvent';

describe('UUIInputLockElement', () => {
  let element: UUIInputLockElement;

  beforeEach(async () => {
    element = render(html`
      <uui-input-lock label="Input label"></uui-input-lock>
    `).container.querySelector('uui-input-lock')!;

    await element.updateComplete;
  });

  it('is defined with its own instance', () => {
    expect(element).toBeInstanceOf(UUIInputLockElement);
  });

  it('inherits from uui-input', () => {
    expect(element).toBeInstanceOf(UUIInputElement);
  });

  it('passes the a11y audit', async () => {
    // Only verify that the color contrast is good when its not locked.
    element.locked = false;
    expect(await axeRun(element)).toHaveNoViolations();
  });

  describe('properties', () => {
    it('has a locked property', () => {
      expect(element).toHaveProperty('name');
    });
  });

  it('correctly toggles lock', async () => {
    // Awaits has an effect even though your IDE might say otherwise.
    await expect(element.readonly).toBe(true);
    const toggle = element.shadowRoot?.querySelector(
      '#lock',
    ) as HTMLButtonElement;
    await toggle.click();
    await expect(element.readonly).toBe(false);
    await toggle.click();
    await expect(element.readonly).toBe(true);
  });

  it('emits lock change event', async () => {
    const listener = oneEvent(element, UUIInputLockEvent.LOCK_CHANGE);

    const toggle = element.shadowRoot?.querySelector(
      '#lock',
    ) as HTMLButtonElement;
    await toggle.click();

    const event = await listener;

    expect(event).not.toBe(null);
    expect(event.type).toBe(UUIInputLockEvent.LOCK_CHANGE);
    expect(event.bubbles).toBe(true);
    expect(event.composed).toBe(false);
    expect(event!.target).toBe(element);
  });
});
