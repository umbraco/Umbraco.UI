import './toast-notification-container.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';

import { axeRun } from '../../internal/test/a11y.js';
import { oneEvent } from '../../internal/test/index.js';
import '../button/button.js';
import '../icon/icon.js';

import {
  UUIToastNotificationElement,
  UUIToastNotificationEvent,
} from '../toast-notification/toast-notification.js';

import { UUIToastNotificationContainerElement } from './toast-notification-container.element';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const ANIMATION_DURATION = 25;

describe('UUIToastNotificationContainerElement', () => {
  let element: UUIToastNotificationContainerElement;
  let toastElement: UUIToastNotificationElement;

  beforeEach(async () => {
    element = render(html`
      <uui-toast-notification-container></uui-toast-notification-container>
    `).container.querySelector('uui-toast-notification-container')!;

    await element.updateComplete;
    // Set the prop on the container, we will use it to test that it inherits to the children.
    element.style.setProperty(
      '--uui-toast-notification-animation-duration',
      ANIMATION_DURATION + 'ms',
    );
    toastElement = render(html`
      <uui-toast-notification></uui-toast-notification>
    `).container.querySelector('uui-toast-notification')!;

    await toastElement.updateComplete;
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  describe('properties', () => {
    it('autoClose', () => {
      expect(element).toHaveProperty('autoClose');
    });
  });

  describe('methods', () => {
    it('has a removeToast method', () => {
      expect(element).toHaveProperty('removeToast');
    });

    it('has a closeToast method', () => {
      expect(element).toHaveProperty('closeToast');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).not.toBe(null);
    });
  });

  describe('child toast notifications', () => {
    it('appended toast notification inherits the animation duration custom property', async () => {
      element.appendChild(toastElement);

      await element.updateComplete;
      expect(
        getComputedStyle(toastElement).getPropertyValue(
          '--uui-toast-notification-animation-duration',
        ),
      ).toBe(ANIMATION_DURATION + 'ms');
    });

    it('appended toast notification will open automatically', async () => {
      element.appendChild(toastElement);

      await element.updateComplete;

      expect(toastElement.open).toBe(true);
    });

    it('appended toast notification will be removed automatically', async () => {
      element.autoClose = 20;
      await element.updateComplete;

      element.appendChild(toastElement);

      const event = await oneEvent(
        toastElement,
        UUIToastNotificationEvent.CLOSED,
        false,
      );
      expect(event).not.toBe(null);
      expect(event.type).toBe(UUIToastNotificationEvent.CLOSED);

      expect(toastElement.parentElement).toBe(null);
    });

    it('pausing autoClose before appended', async () => {
      element.autoClose = 20;
      element.pauseAutoClose();

      await element.updateComplete;

      element.appendChild(toastElement);

      // Wait for OPENED event
      const openedListener = oneEvent(
        toastElement,
        UUIToastNotificationEvent.OPENED,
        false,
      );
      const openedEvent = await openedListener;
      expect(openedEvent).not.toBe(null);
      expect(openedEvent.type).toBe(UUIToastNotificationEvent.OPENED);

      await sleep(element.autoClose + 1); // Enough time to cover if it did happen that the element opened and auto-closed.

      // Check that its open.
      expect(toastElement.open).toBe(true);
    });

    it('pausing autoClose while opening', async () => {
      element.autoClose = 20;
      await element.updateComplete;

      element.appendChild(toastElement);

      await element.updateComplete;

      // Wait for OPENING event
      const openingListener = oneEvent(
        toastElement,
        UUIToastNotificationEvent.OPENING,
        false,
      );
      const openingEvent = await openingListener;
      expect(openingEvent).not.toBe(null);
      expect(openingEvent.type).toBe(UUIToastNotificationEvent.OPENING);

      element.pauseAutoClose();

      // Wait for OPENED event
      const openedListener = oneEvent(
        toastElement,
        UUIToastNotificationEvent.OPENED,
        false,
      );
      const openedEvent = await openedListener;
      expect(openedEvent).not.toBe(null);
      expect(openedEvent.type).toBe(UUIToastNotificationEvent.OPENED);

      // Check that its still open, pause actually did work.
      expect(toastElement.open).toBe(true);
    });

    it('pausing autoClose when open', async () => {
      element.autoClose = 20;
      await element.updateComplete;

      element.appendChild(toastElement);

      await element.updateComplete;

      // Wait for OPENED event
      const openedListener = oneEvent(
        toastElement,
        UUIToastNotificationEvent.OPENED,
        false,
      );
      const openedEvent = await openedListener;
      expect(openedEvent).not.toBe(null);
      expect(openedEvent.type).toBe(UUIToastNotificationEvent.OPENED);

      element.pauseAutoClose();

      await sleep(element.autoClose + 1); // Enough time to cover if it did happen that the element auto-closed.

      // Check that its still open, pause actually did work.
      expect(toastElement.open).toBe(true);
    });

    it('pausing and resuming autoClose', async () => {
      element.autoClose = 20;
      element.pauseAutoClose();

      element.appendChild(toastElement);

      // Wait for OPENED event
      const openedListener = oneEvent(
        toastElement,
        UUIToastNotificationEvent.OPENED,
        false,
      );
      const openedEvent = await openedListener;
      expect(openedEvent).not.toBe(null);
      expect(openedEvent.type).toBe(UUIToastNotificationEvent.OPENED);

      // Check that its still open, pause actually did work.
      expect(toastElement.open).toBe(true);

      const listener = oneEvent(
        toastElement,
        UUIToastNotificationEvent.CLOSED,
        false,
      );

      element.resumeAutoClose();

      const event = await listener;
      expect(event).not.toBe(null);
      expect(event.type).toBe(UUIToastNotificationEvent.CLOSED);

      expect(toastElement.parentElement).toBe(null);
    });

    it('focus on child item will pause and resume autoClose', async () => {
      element.autoClose = 20;

      element.appendChild(toastElement);

      await element.updateComplete;

      // Wait for OPENED event
      const openedListener = oneEvent(
        toastElement,
        UUIToastNotificationEvent.OPENED,
        false,
      );
      const openedEvent = await openedListener;
      expect(openedEvent).not.toBe(null);
      expect(openedEvent.type).toBe(UUIToastNotificationEvent.OPENED);

      toastElement.dispatchEvent(new Event('focus'));

      await sleep(element.autoClose + 1); // Enough time to cover if it did happen that the element opened and auto-closed.

      // Check that its still open, pause actually did work.
      expect(toastElement.open).toBe(true);

      toastElement.dispatchEvent(new Event('blur'));

      await sleep(element.autoClose + 1); // Enough time to cover if it did happen that the element opened and auto-closed.

      // Check that its still open, pause actually did work.
      expect(toastElement.open).toBe(false);
    });

    it('mouseenter on child item will pause and resume autoClose', async () => {
      element.autoClose = 20;

      element.appendChild(toastElement);

      await element.updateComplete;

      // Wait for OPENED event
      const openedListener = oneEvent(
        toastElement,
        UUIToastNotificationEvent.OPENED,
        false,
      );
      const openedEvent = await openedListener;
      expect(openedEvent).not.toBe(null);
      expect(openedEvent.type).toBe(UUIToastNotificationEvent.OPENED);

      toastElement.dispatchEvent(new Event('mouseenter'));

      await sleep(element.autoClose + 1); // Enough time to cover if it did happen that the element opened and auto-closed.

      // Check that its still open, pause actually did work.
      expect(toastElement.open).toBe(true);

      toastElement.dispatchEvent(new Event('mouseleave'));

      await sleep(element.autoClose + 1); // Enough time to cover if it did happen that the element opened and auto-closed.

      // Check that its still open, pause actually did work.
      expect(toastElement.open).toBe(false);
    });
  });
});
