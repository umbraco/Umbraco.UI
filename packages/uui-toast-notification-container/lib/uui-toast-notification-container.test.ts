import '.';
import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-icon/lib';

import {
  elementUpdated,
  expect,
  fixture,
  html,
  oneEvent,
} from '@open-wc/testing';
import {
  UUIToastNotificationElement,
  UUIToastNotificationEvent,
} from '@umbraco-ui/uui-toast-notification/lib';

import { UUIToastNotificationContainerElement } from './uui-toast-notification-container.element';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const ANIMATION_DURATION = 25;

describe('UUIToastNotificationContainerElement', () => {
  let element: UUIToastNotificationContainerElement;
  let toastElement: UUIToastNotificationElement;

  beforeEach(async () => {
    element = await fixture(html`
      <uui-toast-notification-container></uui-toast-notification-container>
    `);
    // Set the prop on the container, we will use it to test that it inherits to the children.
    element.style.setProperty(
      '--uui-toast-notification-animation-duration',
      ANIMATION_DURATION + 'ms',
    );
    toastElement = await fixture(html`
      <uui-toast-notification></uui-toast-notification>
    `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('properties', () => {
    it('autoClose', () => {
      expect(element).to.have.property('autoClose');
    });
  });

  describe('methods', () => {
    it('has a removeToast method', () => {
      expect(element).to.have.property('removeToast').that.is.a('function');
    });

    it('has a closeToast method', () => {
      expect(element).to.have.property('closeToast').that.is.a('function');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).to.exist;
    });
  });

  describe('child toast notifications', () => {
    it('appended toast notification inherits the animation duration custom property', async () => {
      element.appendChild(toastElement);

      await elementUpdated(element);
      expect(
        getComputedStyle(toastElement).getPropertyValue(
          '--uui-toast-notification-animation-duration',
        ),
      ).to.be.equal(ANIMATION_DURATION + 'ms');
    });

    it('appended toast notification will open automatically', async () => {
      element.appendChild(toastElement);

      await elementUpdated(element);

      expect(toastElement.open).to.be.true;
    });

    it('appended toast notification will be removed automatically', async () => {
      element.autoClose = 20;
      await elementUpdated(element);

      element.appendChild(toastElement);

      const event = await oneEvent(
        toastElement,
        UUIToastNotificationEvent.CLOSED,
        false,
      );
      expect(event).to.exist;
      expect(event.type).to.equal(UUIToastNotificationEvent.CLOSED);

      expect(toastElement.parentElement).to.be.null;
    });

    it('pausing autoClose before appended', async () => {
      element.autoClose = 20;
      element.pauseAutoClose();

      await elementUpdated(element);

      element.appendChild(toastElement);

      // Wait for OPENED event
      const openedListener = oneEvent(
        toastElement,
        UUIToastNotificationEvent.OPENED,
        false,
      );
      const openedEvent = await openedListener;
      expect(openedEvent).to.exist;
      expect(openedEvent.type).to.equal(UUIToastNotificationEvent.OPENED);

      await sleep(element.autoClose + 1); // Enough time to cover if it did happen that the element opened and auto-closed.

      // Check that its open.
      expect(toastElement.open).to.be.true;
    });

    it('pausing autoClose while opening', async () => {
      element.autoClose = 20;
      await elementUpdated(element);

      element.appendChild(toastElement);

      await elementUpdated(element);

      // Wait for OPENING event
      const openingListener = oneEvent(
        toastElement,
        UUIToastNotificationEvent.OPENING,
        false,
      );
      const openingEvent = await openingListener;
      expect(openingEvent).to.exist;
      expect(openingEvent.type).to.equal(UUIToastNotificationEvent.OPENING);

      element.pauseAutoClose();

      // Wait for OPENED event
      const openedListener = oneEvent(
        toastElement,
        UUIToastNotificationEvent.OPENED,
        false,
      );
      const openedEvent = await openedListener;
      expect(openedEvent).to.exist;
      expect(openedEvent.type).to.equal(UUIToastNotificationEvent.OPENED);

      // Check that its still open, pause actually did work.
      expect(toastElement.open).to.be.true;
    });

    it('pausing autoClose when open', async () => {
      element.autoClose = 20;
      await elementUpdated(element);

      element.appendChild(toastElement);

      await elementUpdated(element);

      // Wait for OPENED event
      const openedListener = oneEvent(
        toastElement,
        UUIToastNotificationEvent.OPENED,
        false,
      );
      const openedEvent = await openedListener;
      expect(openedEvent).to.exist;
      expect(openedEvent.type).to.equal(UUIToastNotificationEvent.OPENED);

      element.pauseAutoClose();

      await sleep(element.autoClose + 1); // Enough time to cover if it did happen that the element auto-closed.

      // Check that its still open, pause actually did work.
      expect(toastElement.open).to.be.true;
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
      expect(openedEvent).to.exist;
      expect(openedEvent.type).to.equal(UUIToastNotificationEvent.OPENED);

      // Check that its still open, pause actually did work.
      expect(toastElement.open).to.be.true;

      const listener = oneEvent(
        toastElement,
        UUIToastNotificationEvent.CLOSED,
        false,
      );

      element.resumeAutoClose();

      const event = await listener;
      expect(event).to.exist;
      expect(event.type).to.equal(UUIToastNotificationEvent.CLOSED);

      expect(toastElement.parentElement).to.be.null;
    });

    it('focus on child item will pause and resume autoClose', async () => {
      element.autoClose = 20;

      element.appendChild(toastElement);

      await elementUpdated(element);

      // Wait for OPENED event
      const openedListener = oneEvent(
        toastElement,
        UUIToastNotificationEvent.OPENED,
        false,
      );
      const openedEvent = await openedListener;
      expect(openedEvent).to.exist;
      expect(openedEvent.type).to.equal(UUIToastNotificationEvent.OPENED);

      toastElement.dispatchEvent(new Event('focus'));

      await sleep(element.autoClose + 1); // Enough time to cover if it did happen that the element opened and auto-closed.

      // Check that its still open, pause actually did work.
      expect(toastElement.open).to.be.true;

      toastElement.dispatchEvent(new Event('blur'));

      await sleep(element.autoClose + 1); // Enough time to cover if it did happen that the element opened and auto-closed.

      // Check that its still open, pause actually did work.
      expect(toastElement.open).to.be.false;
    });

    it('mouseenter on child item will pause and resume autoClose', async () => {
      element.autoClose = 20;

      element.appendChild(toastElement);

      await elementUpdated(element);

      // Wait for OPENED event
      const openedListener = oneEvent(
        toastElement,
        UUIToastNotificationEvent.OPENED,
        false,
      );
      const openedEvent = await openedListener;
      expect(openedEvent).to.exist;
      expect(openedEvent.type).to.equal(UUIToastNotificationEvent.OPENED);

      toastElement.dispatchEvent(new Event('mouseenter'));

      await sleep(element.autoClose + 1); // Enough time to cover if it did happen that the element opened and auto-closed.

      // Check that its still open, pause actually did work.
      expect(toastElement.open).to.be.true;

      toastElement.dispatchEvent(new Event('mouseleave'));

      await sleep(element.autoClose + 1); // Enough time to cover if it did happen that the element opened and auto-closed.

      // Check that its still open, pause actually did work.
      expect(toastElement.open).to.be.false;
    });
  });
});
