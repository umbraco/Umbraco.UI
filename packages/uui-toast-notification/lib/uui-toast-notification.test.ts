import {
  html,
  fixture,
  expect,
  oneEvent,
  elementUpdated,
} from '@open-wc/testing';
import { UUIToastNotificationElement } from './uui-toast-notification.element';
import '.';
import { UUIToastNotificationEvent } from './UUIToastNotificationEvent';
import { UUIButtonElement } from 'packages/uui-button/lib/uui-button.element';

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
    it('headline', () => {
      expect(element).to.have.property('headline');
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
    it('renders a actions slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name="actions"]')!;
      expect(slot).to.exist;
    });
  });

  describe('events', () => {
    describe('open', () => {
      it('emits a open event when elements starts to open', async () => {
        const listener = oneEvent(element, UUIToastNotificationEvent.OPEN);
        element.open = true;
        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal(UUIToastNotificationEvent.OPEN);
        expect(element.open).to.be.true;
      });
    });

    describe('close', () => {
      it('emits a close event when elements starts to close', async () => {
        element.open = true;
        await elementUpdated(element);
        const listener = oneEvent(element, UUIToastNotificationEvent.CLOSE);
        await sleep(600); // enough time for open animation to be done.
        expect(element.open).to.be.true;
        element.open = false;
        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal(UUIToastNotificationEvent.CLOSE);
        expect(element.open).to.be.false;
      });
      it('emits a close event though toast is running its open animation', async () => {
        element.open = true;
        await elementUpdated(element);
        const listener = oneEvent(element, UUIToastNotificationEvent.CLOSE);
        await sleep(100); // enough time for the rendering and open-animation to start.
        expect(element.open).to.be.true;
        element.open = false;
        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal(UUIToastNotificationEvent.CLOSE);
        expect(element.open).to.be.false;
      });
    });
    describe('closed', () => {
      it('emits a open event when elements is closed', async () => {
        element.open = true;
        await elementUpdated(element);
        const listener = oneEvent(element, UUIToastNotificationEvent.CLOSED);
        await sleep(600); // enough time for open animation to be done.
        expect(element.open).to.be.true;
        element.open = false;
        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal(UUIToastNotificationEvent.CLOSED);
        expect(element.open).to.be.false;
      });
      it('emits a close event though toast is still running its open animation', async () => {
        element.open = true;
        await elementUpdated(element);
        const listener = oneEvent(element, UUIToastNotificationEvent.CLOSED);
        await sleep(100); // enough time for the rendering and open-animation to start.
        expect(element.open).to.be.true;
        element.open = false;
        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal(UUIToastNotificationEvent.CLOSED);
        expect(element.open).to.be.false;
      });
    });

    describe('sequence', () => {
      it('ensure events goes as following: open, close, closed, open', async () => {
        const openListener = oneEvent(element, UUIToastNotificationEvent.OPEN);
        element.open = true;
        const openEvent = await openListener;
        expect(openEvent).to.exist;
        expect(openEvent.type).to.equal(UUIToastNotificationEvent.OPEN);
        expect(element.open).to.be.true;

        await sleep(100); // enough time for the rendering and open-animation to start.

        const closeListener = oneEvent(
          element,
          UUIToastNotificationEvent.CLOSE
        );
        element.open = false;
        const closeEvent = await closeListener;
        expect(closeEvent).to.exist;
        expect(closeEvent.type).to.equal(UUIToastNotificationEvent.CLOSE);
        expect(element.open).to.be.false;

        const closedListener = oneEvent(
          element,
          UUIToastNotificationEvent.CLOSED
        );
        const closedEvent = await closedListener;
        expect(closedEvent).to.exist;
        expect(closedEvent.type).to.equal(UUIToastNotificationEvent.CLOSED);
        expect(element.open).to.be.false;

        // Check again that we can get an open event:
        const openListener2 = oneEvent(element, UUIToastNotificationEvent.OPEN);
        element.open = true;
        const openEvent2 = await openListener2;
        expect(openEvent2).to.exist;
        expect(openEvent2.type).to.equal(UUIToastNotificationEvent.OPEN);
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
          UUIToastNotificationEvent.CLOSE
        );
        const closeEvent = await closeListener;
        expect(closeEvent).to.exist;
        expect(closeEvent.type).to.equal(UUIToastNotificationEvent.CLOSE);
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

    describe('autoClose can be paused after open-animation', () => {
      it('did element close wait', async () => {
        element.autoClose = 200;
        element.open = true;

        await sleep(600); // enough time for open animation to be done.

        expect(element.open).to.be.true;
        element.pauseAutoClose();

        await sleep(500); // enough time for open animation to be done.

        element.resumeAutoClose();
        expect(element.open).to.be.true;

        const closeListener = oneEvent(
          element,
          UUIToastNotificationEvent.CLOSE
        );
        const closeEvent = await closeListener;
        expect(closeEvent).to.exist;
        expect(closeEvent.type).to.equal(UUIToastNotificationEvent.CLOSE);
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

        await sleep(600); // enough time for open animation to be done.

        element.resumeAutoClose();
        expect(element.open).to.be.true;

        const closeListener = oneEvent(
          element,
          UUIToastNotificationEvent.CLOSE
        );
        const closeEvent = await closeListener;
        expect(closeEvent).to.exist;
        expect(closeEvent.type).to.equal(UUIToastNotificationEvent.CLOSE);
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

        await sleep(100); // wait a bit.
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

        await sleep(100); // wait a bit.
        expect(element.open).to.be.true;

        element.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }));

        expect(element.open).to.be.false;
      });
    });
  });
});
