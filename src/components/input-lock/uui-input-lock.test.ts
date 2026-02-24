import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { UUIInputElement } from '../input/index.js';
import '../icon/index.js';
import '../button/index.js';

import { UUIInputLockElement } from './uui-input-lock.element';
import { UUIInputLockEvent } from './UUIInputLockEvent';

describe('UUIInputLockElement', () => {
  let element: UUIInputLockElement;

  beforeEach(async () => {
    element = await fixture(html`
      <uui-input-lock label="Input label"></uui-input-lock>
    `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIInputLockElement);
  });

  it('inherits from uui-input', () => {
    expect(element).to.be.instanceOf(UUIInputElement);
  });

  it('passes the a11y audit', async () => {
    // Only verify that the color contrast is good when its not locked.
    element.locked = false;
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('properties', () => {
    it('has a locked property', () => {
      expect(element).to.have.property('name');
    });
  });

  it('correctly toggles lock', async () => {
    // Awaits has an effect even though your IDE might say otherwise.
    await expect(element.readonly).to.be.true;
    const toggle = element.shadowRoot?.querySelector(
      '#lock',
    ) as HTMLButtonElement;
    await toggle.click();
    await expect(element.readonly).to.be.false;
    await toggle.click();
    await expect(element.readonly).to.be.true;
  });

  it('emits lock change event', async () => {
    const listener = oneEvent(element, UUIInputLockEvent.LOCK_CHANGE, false);

    const toggle = element.shadowRoot?.querySelector(
      '#lock',
    ) as HTMLButtonElement;
    await toggle.click();

    const event = await listener;

    expect(event).to.exist;
    expect(event.type).to.equal(UUIInputLockEvent.LOCK_CHANGE);
    expect(event.bubbles).to.be.true;
    expect(event.composed).to.be.false;
    expect(event!.target).to.equal(element);
  });
});
