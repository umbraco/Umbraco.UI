import './define';
import '@umbraco-ui/uui-button/lib/define';
import '@umbraco-ui/uui-icon/lib/define';
import '@umbraco-ui/uui-toast-notification/lib/define';

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

describe('UUIToastNotificationContainerElement', () => {
  let element: UUIToastNotificationContainerElement;
  let toastElement: UUIToastNotificationElement;

  beforeEach(async () => {
    element = await fixture(
      html`
        <uui-toast-notification-container></uui-toast-notification-container>
      `
    );
    toastElement = await fixture(
      html` <uui-toast-notification></uui-toast-notification> `
    );
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
    // TODO: test the method

    it('has a closeToast method', () => {
      expect(element).to.have.property('closeToast').that.is.a('function');
    });

    // TODO: Test the method
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).to.exist;
    });
  });

  // Test appending a toast will open automatically.
  describe('child toast notifications', () => {
    it('appended toast notification will open automatically', async () => {
      element.appendChild(toastElement);

      await elementUpdated(element);

      //await sleep(100); // wait a bit.
      expect(toastElement.open).to.be.true;
    });

    it('appended toast notification will be removed automatically', async () => {
      element.autoClose = 20;
      await elementUpdated(element);

      element.appendChild(toastElement);

      const event = await oneEvent(
        toastElement,
        UUIToastNotificationEvent.CLOSED
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

      await sleep(600); // Enough time to cover if it did happen that the element opened and auto-closed.

      // Check that its open.
      expect(toastElement.open).to.be.true;
    });

    it('pausing autoClose while opening', async () => {
      element.autoClose = 20;
      await elementUpdated(element);

      element.appendChild(toastElement);

      await elementUpdated(element);
      await sleep(100);

      element.pauseAutoClose();

      await sleep(500); // Enough time to cover if it did happen that the element opened and auto-closed.

      // Check that its still open, pause actually did work.
      expect(toastElement.open).to.be.true;
    });

    it('pausing autoClose when open', async () => {
      element.autoClose = 200;
      await elementUpdated(element);

      element.appendChild(toastElement);

      await elementUpdated(element);
      await sleep(500);

      element.pauseAutoClose();

      await sleep(300); // Enough time to cover if it did happen that the element auto-closed.

      // Check that its still open, pause actually did work.
      expect(toastElement.open).to.be.true;
    });

    it('pausing and resuming autoClose', async () => {
      element.autoClose = 20;
      element.pauseAutoClose();

      element.appendChild(toastElement);

      await sleep(100); // Enough time to cover if it did happen that the element opened and auto-closed.

      // Check that its still open, pause actually did work.
      expect(toastElement.open).to.be.true;

      const listener = oneEvent(toastElement, UUIToastNotificationEvent.CLOSED);

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
      await sleep(100);

      toastElement.dispatchEvent(new Event('focus'));

      await sleep(400); // Enough time to cover if it did happen that the element opened and auto-closed.

      // Check that its still open, pause actually did work.
      expect((toastElement as any)._animate).to.be.false; // Checking private _animate to ensure that guessed animation time was good.
      expect(toastElement.open).to.be.true;

      toastElement.dispatchEvent(new Event('blur'));

      await sleep(40); // Enough time to cover if it did happen that the element opened and auto-closed.

      // Check that its still open, pause actually did work.
      expect(toastElement.open).to.be.false;
    });

    it('mouseover on child item will pause and resume autoClose', async () => {
      element.autoClose = 20;

      element.appendChild(toastElement);

      await elementUpdated(element);
      await sleep(100);

      toastElement.dispatchEvent(new Event('mouseover'));

      await sleep(400); // Enough time to cover if it did happen that the element opened and auto-closed.

      // Check that its still open, pause actually did work.
      expect((toastElement as any)._animate).to.be.false; // Checking private _animate to ensure that guessed animation time was good.
      expect(toastElement.open).to.be.true;

      toastElement.dispatchEvent(new Event('mouseout'));

      await sleep(40); // Enough time to cover if it did happen that the element opened and auto-closed.

      // Check that its still open, pause actually did work.
      expect(toastElement.open).to.be.false;
    });
  });
});
