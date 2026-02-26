import './modal.js';
import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import {
  UUIModalDialogElement,
  UUIModalSidebarElement,
  UUIModalContainerElement,
  UUIModalCloseEvent,
  UUIModalCloseEndEvent,
} from './modal.js';

describe('UUIModalContainerElement', () => {
  let element: UUIModalContainerElement;

  beforeEach(async () => {
    element = await fixture(html`
      <uui-modal-container></uui-modal-container>
    `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIModalContainerElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

describe('UUIModalDialogElement', () => {
  let element: UUIModalDialogElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-modal-dialog></uui-modal-dialog> `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIModalDialogElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

describe('UUIModalSidebarElement', () => {
  let element: UUIModalSidebarElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-modal-sidebar></uui-modal-sidebar> `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIModalSidebarElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('properties', () => {
    it('has a size property', () => {
      expect(element).to.have.property('size');
    });

    it('has a index property', () => {
      expect(element).to.have.property('index');
    });

    it('has a uniqueIndex property', () => {
      expect(element).to.have.property('uniqueIndex');
    });

    it('has a transitionDuration property', () => {
      expect(element).to.have.property('transitionDuration');
    });
  });

  it('can close', async () => {
    expect(element.isOpen).to.equal(true);

    const listener = oneEvent(element, UUIModalCloseEvent);

    element.close();

    const event = await listener;
    expect(event).to.not.equal(null);

    const endListener = oneEvent(element, UUIModalCloseEndEvent);

    const endEvent = await endListener;
    expect(endEvent).to.not.equal(null);

    expect(element.isOpen).to.equal(false);
  });

  it('can have a prevented close', async () => {
    expect(element.isOpen).to.equal(true);

    expect(element.isClosing).to.equal(false);
    element.addEventListener(UUIModalCloseEvent, e => e.preventDefault());
    const closeListener = oneEvent(element, UUIModalCloseEvent);
    element.close();

    const closeEvent = await closeListener;
    expect(closeEvent).to.not.equal(null);

    expect(element.isClosing).to.equal(false);
    expect(element.isOpen).to.equal(true);
  });
});
