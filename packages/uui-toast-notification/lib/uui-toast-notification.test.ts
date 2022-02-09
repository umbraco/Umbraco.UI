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
import { UUIButtonElement } from '@umbraco-ui/uui-button/lib/uui-button.element';

import { UUIToastNotificationElement } from './uui-toast-notification.element';
import { UUIToastNotificationEvent } from './UUIToastNotificationEvent';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('UUIToastNotificationElement', () => {
  let element: UUIToastNotificationElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-toast-notification></uui-toast-notification> `
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('properties', () => {
    it('look', () => {
      expect(element).to.have.property('look');
    });
    it('autoClose', () => {
      expect(element).to.have.property('autoClose');
    });
    it('open', () => {
      expect(element).to.have.property('open');
    });
  });

  describe('methods', () => {
    it('has a pauseAutoClose method', () => {
      expect(element).to.have.property('pauseAutoClose').that.is.a('function');
    });
    it('has a resumeAutoClose method', () => {
      expect(element).to.have.property('resumeAutoClose').that.is.a('function');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).to.exist;
    });
  });

  describe('events', () => {
    describe('opening', () => {
      it('emits a opening event when elements starts to opening', async () => {
        const listener = oneEvent(element, UUIToastNotificationEvent.OPENING);
        element.open = true;
        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal(UUIToastNotificationEvent.OPENING);
        expect(element.open).to.be.true;
      });
    });

    describe('closing', () => {
      it('emits a closing event when elements starts to closing', async () => {
        element.open = true;
        await elementUpdated(element);
        const listener = oneEvent(element, UUIToastNotificationEvent.CLOSING);
        await sleep(600); // enough time for opening-animation to be done.
        expect(element.open).to.be.true;
        element.open = false;
        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal(UUIToastNotificationEvent.CLOSING);
        expect(element.open).to.be.false;
      });
      it('emits a closing event though toast is running its opening-animation', async () => {
        element.open = true;
        await elementUpdated(element);
        const listener = oneEvent(element, UUIToastNotificationEvent.CLOSING);
        await sleep(100); // enough time for the rendering and opening-animation to start.
        expect(element.open).to.be.true;
        element.open = false;
        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal(UUIToastNotificationEvent.CLOSING);
        expect(element.open).to.be.false;
      });
      it('emits a closing event can preventDefault to cancel the close', async () => {
        element.open = true;
        await elementUpdated(element);
        const listener = oneEvent(element, UUIToastNotificationEvent.CLOSING);
        element.addEventListener(UUIToastNotificationEvent.CLOSING, e => {
          e.preventDefault();
        });
        await sleep(100); // enough time for the rendering and opening-animation to start.
        expect(element.open).to.be.true;
        element.open = false;
        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal(UUIToastNotificationEvent.CLOSING);
        expect(element.open).to.be.true;
      });
    });
    describe('closed', () => {
      it('emits a opening event when elements is closed', async () => {
        element.open = true;
        await elementUpdated(element);
        const listener = oneEvent(element, UUIToastNotificationEvent.CLOSED);
        await sleep(600); // enough time for opening-animation to be done.
        expect(element.open).to.be.true;
        element.open = false;
        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal(UUIToastNotificationEvent.CLOSED);
        expect(element.open).to.be.false;
      });
      it('emits a close event though toast is still running its opening-animation', async () => {
        element.open = true;
        await elementUpdated(element);
        const listener = oneEvent(element, UUIToastNotificationEvent.CLOSED);
        await sleep(100); // enough time for the rendering and opening-animation to start.
        expect(element.open).to.be.true;
        element.open = false;
        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal(UUIToastNotificationEvent.CLOSED);
        expect(element.open).to.be.false;
      });
    });

    describe('sequence', () => {
      it('ensure events goes as following: opening, closing, closed, opening', async () => {
        const openListener = oneEvent(
          element,
          UUIToastNotificationEvent.OPENING
        );
        element.open = true;
        const openEvent = await openListener;
        expect(openEvent).to.exist;
        expect(openEvent.type).to.equal(UUIToastNotificationEvent.OPENING);
        expect(element.open).to.be.true;

        await sleep(100); // enough time for the rendering and opening-animation to start.

        const closeListener = oneEvent(
          element,
          UUIToastNotificationEvent.CLOSING
        );
        element.open = false;
        const closeEvent = await closeListener;
        expect(closeEvent).to.exist;
        expect(closeEvent.type).to.equal(UUIToastNotificationEvent.CLOSING);
        expect(element.open).to.be.false;

        const closedListener = oneEvent(
          element,
          UUIToastNotificationEvent.CLOSED
        );
        const closedEvent = await closedListener;
        expect(closedEvent).to.exist;
        expect(closedEvent.type).to.equal(UUIToastNotificationEvent.CLOSED);
        expect(element.open).to.be.false;

        // Check again that we can get an opening event:
        const openListener2 = oneEvent(
          element,
          UUIToastNotificationEvent.OPENING
        );
        element.open = true;
        const openEvent2 = await openListener2;
        expect(openEvent2).to.exist;
        expect(openEvent2.type).to.equal(UUIToastNotificationEvent.OPENING);
        expect(element.open).to.be.true;
      });
    });
  });

  describe('autoClose', () => {
    describe('autoClose 20ms', () => {
      it('did element close again', async () => {
        element.autoClose = 20;
        element.open = true;
        expect(element.open).to.be.true;

        const closeListener = oneEvent(
          element,
          UUIToastNotificationEvent.CLOSING
        );
        const closeEvent = await closeListener;
        expect(closeEvent).to.exist;
        expect(closeEvent.type).to.equal(UUIToastNotificationEvent.CLOSING);
        expect(element.open).to.be.false;

        const closedListener = oneEvent(
          element,
          UUIToastNotificationEvent.CLOSED
        );
        const closedEvent = await closedListener;
        expect(closedEvent).to.exist;
        expect(closedEvent.type).to.equal(UUIToastNotificationEvent.CLOSED);
        expect(element.open).to.be.false;
      });
    });

    describe('autoClose can be paused while opening', () => {
      it('did element close wait', async () => {
        element.autoClose = 20;
        element.open = true;

        element.pauseAutoClose();

        // Wait for OPENED event
        const openedListener = oneEvent(
          element,
          UUIToastNotificationEvent.OPENED
        );
        const openedEvent = await openedListener;
        expect(openedEvent).to.exist;
        expect(openedEvent.type).to.equal(UUIToastNotificationEvent.OPENED);

        element.resumeAutoClose();
        expect(
          element.open,
          'Element should still be open immediately after resuming'
        ).to.be.true;

        const closeListener = oneEvent(
          element,
          UUIToastNotificationEvent.CLOSING
        );
        const closeEvent = await closeListener;
        expect(closeEvent).to.exist;
        expect(closeEvent.type).to.equal(UUIToastNotificationEvent.CLOSING);
        expect(element.open).to.be.false;

        const closedListener = oneEvent(
          element,
          UUIToastNotificationEvent.CLOSED
        );
        const closedEvent = await closedListener;
        expect(closedEvent).to.exist;
        expect(closedEvent.type).to.equal(UUIToastNotificationEvent.CLOSED);
        expect(element.open).to.be.false;
      });
    });
  });

  describe('close by interactions', () => {
    describe('click close-button', () => {
      it('clicking on the close-button did close', async () => {
        element.open = true;

        // Wait for OPENED event
        const openedListener = oneEvent(
          element,
          UUIToastNotificationEvent.OPENED
        );
        const openedEvent = await openedListener;
        expect(openedEvent).to.exist;
        expect(openedEvent.type).to.equal(UUIToastNotificationEvent.OPENED);

        expect(element.open).to.be.true;

        const closeButton = element.shadowRoot!.querySelector(
          '#close > uui-button'
        ) as UUIButtonElement;
        expect(closeButton).to.exist;
        closeButton!.click();

        expect(element.open).to.be.false;
      });
    });
    describe('press esc key', () => {
      it('pressing esc when focus did close', async () => {
        element.open = true;

        // Wait for OPENED event
        const openedListener = oneEvent(
          element,
          UUIToastNotificationEvent.OPENED
        );
        const openedEvent = await openedListener;
        expect(openedEvent).to.exist;
        expect(openedEvent.type).to.equal(UUIToastNotificationEvent.OPENED);

        expect(element.open).to.be.true;

        element.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }));

        expect(element.open).to.be.false;
      });
    });
  });
});
