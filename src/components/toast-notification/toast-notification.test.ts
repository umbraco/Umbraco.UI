import './toast-notification.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';

import { axeRun } from '../../internal/test/a11y.js';
import { oneEvent } from '../../internal/test/index.js';
import '../button/button.js';
import '../icon/icon.js';

import { UUIButtonElement } from '../button/button.js';

import { UUIToastNotificationElement } from './toast-notification.element';
import { UUIToastNotificationEvent } from './UUIToastNotificationEvent';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const ANIMATION_DURATION: number = 25; // still needs to be some time, otherwise it goes too fast for the rendering and the test to work properly.

describe('UUIToastNotificationElement', () => {
  let element: UUIToastNotificationElement;

  beforeEach(async () => {
    element = render(html`
      <uui-toast-notification></uui-toast-notification>
    `).container.querySelector('uui-toast-notification')!;

    await element.updateComplete;
    element.style.setProperty(
      '--uui-toast-notification-animation-duration',
      ANIMATION_DURATION + 'ms',
    );
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  describe('properties', () => {
    it('color', () => {
      expect(element).toHaveProperty('color');
    });
    it('autoClose', () => {
      expect(element).toHaveProperty('autoClose');
    });
    it('open', () => {
      expect(element).toHaveProperty('open');
    });
  });

  describe('methods', () => {
    it('has a pauseAutoClose method', () => {
      expect(element).toHaveProperty('pauseAutoClose');
    });
    it('has a resumeAutoClose method', () => {
      expect(element).toHaveProperty('resumeAutoClose');
    });
    it('private _getAnimationDuration', () => {
      expect(element).toHaveProperty('_getAnimationDuration');
      expect((element as any)._getAnimationDuration()).toBe(ANIMATION_DURATION);
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).not.toBe(null);
    });
  });

  describe('events', () => {
    describe('opening', () => {
      it('emits a opening event when elements starts to opening', async () => {
        const listener = oneEvent(
          element,
          UUIToastNotificationEvent.OPENING,
          false,
        );
        element.open = true;
        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe(UUIToastNotificationEvent.OPENING);
        expect(element.open).toBe(true);
      });
    });

    describe('closing', () => {
      it('emits a closing event when elements starts to closing', async () => {
        const openedListener = oneEvent(
          element,
          UUIToastNotificationEvent.OPENED,
          false,
        );
        const closingListener = oneEvent(
          element,
          UUIToastNotificationEvent.CLOSING,
          false,
        );

        element.open = true;
        await openedListener;

        expect(element.open).toBe(true);
        element.open = false;
        const event = await closingListener;

        expect(event).not.toBe(null);
        expect(event.type).toBe(UUIToastNotificationEvent.CLOSING);
        expect(element.open).toBe(false);
      });
      it('emits a closing event though toast is running its opening-animation', async () => {
        element.open = true;
        await element.updateComplete;
        const listener = oneEvent(
          element,
          UUIToastNotificationEvent.CLOSING,
          false,
        );
        await sleep(ANIMATION_DURATION / 2); // enough time for the rendering and opening-animation to start, but not finished.
        expect(element.open).toBe(true);
        element.open = false;
        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe(UUIToastNotificationEvent.CLOSING);
        expect(element.open).toBe(false);
      });
      it('emits a closing event can preventDefault to cancel the close', async () => {
        element.open = true;
        await element.updateComplete;
        const listener = oneEvent(
          element,
          UUIToastNotificationEvent.CLOSING,
          false,
        );
        element.addEventListener(UUIToastNotificationEvent.CLOSING, e => {
          e.preventDefault();
        });
        await sleep(ANIMATION_DURATION / 2); // enough time for the rendering and opening-animation to start, but not finished.
        expect(element.open).toBe(true);
        element.open = false;
        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe(UUIToastNotificationEvent.CLOSING);
        expect(element.open).toBe(true);
      });
    });
    describe('closed', () => {
      it('emits a opening event when elements is closed', async () => {
        const openedListener = oneEvent(
          element,
          UUIToastNotificationEvent.OPENED,
          false,
        );
        const listener = oneEvent(
          element,
          UUIToastNotificationEvent.CLOSED,
          false,
        );

        element.open = true;
        await openedListener;

        expect(element.open).toBe(true);

        element.open = false;
        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe(UUIToastNotificationEvent.CLOSED);
        expect(element.open).toBe(false);
      });
      it('emits a close event though toast is still running its opening-animation', async () => {
        const openedListener = oneEvent(
          element,
          UUIToastNotificationEvent.OPENED,
          false,
        );
        const listener = oneEvent(
          element,
          UUIToastNotificationEvent.CLOSED,
          false,
        );

        element.open = true;
        await openedListener;

        expect(element.open).toBe(true);
        element.open = false;
        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe(UUIToastNotificationEvent.CLOSED);
        expect(element.open).toBe(false);
      });
    });

    describe('sequence', () => {
      it('ensure events goes as following: opening, closing, closed, opening', async () => {
        const openListener = oneEvent(
          element,
          UUIToastNotificationEvent.OPENING,
          false,
        );
        element.open = true;
        const openEvent = await openListener;
        expect(openEvent).not.toBe(null);
        expect(openEvent.type).toBe(UUIToastNotificationEvent.OPENING);
        expect(element.open).toBe(true);

        await sleep(ANIMATION_DURATION / 2); // enough time for the rendering and opening-animation to start, but not finished.

        const closeListener = oneEvent(
          element,
          UUIToastNotificationEvent.CLOSING,
          false,
        );
        element.open = false;
        const closeEvent = await closeListener;
        expect(closeEvent).not.toBe(null);
        expect(closeEvent.type).toBe(UUIToastNotificationEvent.CLOSING);
        expect(element.open).toBe(false);

        const closedListener = oneEvent(
          element,
          UUIToastNotificationEvent.CLOSED,
          false,
        );
        const closedEvent = await closedListener;
        expect(closedEvent).not.toBe(null);
        expect(closedEvent.type).toBe(UUIToastNotificationEvent.CLOSED);
        expect(element.open).toBe(false);

        // Check again that we can get an opening event:
        const openListener2 = oneEvent(
          element,
          UUIToastNotificationEvent.OPENING,
          false,
        );
        element.open = true;
        const openEvent2 = await openListener2;
        expect(openEvent2).not.toBe(null);
        expect(openEvent2.type).toBe(UUIToastNotificationEvent.OPENING);
        expect(element.open).toBe(true);
      });
    });
  });

  describe('autoClose', () => {
    describe('autoClose 20ms', () => {
      it('did element close again', async () => {
        element.autoClose = 20;
        element.open = true;
        expect(element.open).toBe(true);

        const closeListener = oneEvent(
          element,
          UUIToastNotificationEvent.CLOSING,
          false,
        );
        const closeEvent = await closeListener;
        expect(closeEvent).not.toBe(null);
        expect(closeEvent.type).toBe(UUIToastNotificationEvent.CLOSING);
        expect(element.open).toBe(false);

        const closedListener = oneEvent(
          element,
          UUIToastNotificationEvent.CLOSED,
          false,
        );
        const closedEvent = await closedListener;
        expect(closedEvent).not.toBe(null);
        expect(closedEvent.type).toBe(UUIToastNotificationEvent.CLOSED);
        expect(element.open).toBe(false);
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
          UUIToastNotificationEvent.OPENED,
          false,
        );
        const openedEvent = await openedListener;
        expect(openedEvent).not.toBe(null);
        expect(openedEvent.type).toBe(UUIToastNotificationEvent.OPENED);

        element.resumeAutoClose();
        expect(
          element.open,
          'Element should still be open immediately after resuming',
        ).toBe(true);

        const closeListener = oneEvent(
          element,
          UUIToastNotificationEvent.CLOSING,
          false,
        );
        const closeEvent = await closeListener;
        expect(closeEvent).not.toBe(null);
        expect(closeEvent.type).toBe(UUIToastNotificationEvent.CLOSING);
        expect(element.open).toBe(false);

        const closedListener = oneEvent(
          element,
          UUIToastNotificationEvent.CLOSED,
          false,
        );
        const closedEvent = await closedListener;
        expect(closedEvent).not.toBe(null);
        expect(closedEvent.type).toBe(UUIToastNotificationEvent.CLOSED);
        expect(element.open).toBe(false);
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
          UUIToastNotificationEvent.OPENED,
          false,
        );
        const openedEvent = await openedListener;
        expect(openedEvent).not.toBe(null);
        expect(openedEvent.type).toBe(UUIToastNotificationEvent.OPENED);

        expect(element.open).toBe(true);

        const closeButton = element.shadowRoot!.querySelector(
          '#close > uui-button',
        ) as UUIButtonElement;
        expect(closeButton).not.toBe(null);
        await closeButton!.click();

        expect(element.open).toBe(false);
      });
    });
    describe('press esc key', () => {
      it('pressing esc when focus did close', async () => {
        element.open = true;

        // Wait for OPENED event
        const openedListener = oneEvent(
          element,
          UUIToastNotificationEvent.OPENED,
          false,
        );
        const openedEvent = await openedListener;
        expect(openedEvent).not.toBe(null);
        expect(openedEvent.type).toBe(UUIToastNotificationEvent.OPENED);

        expect(element.open).toBe(true);

        element.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }));

        expect(element.open).toBe(false);
      });
    });
  });
});
