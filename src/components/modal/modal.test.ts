import './modal.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';

import { axeRun } from '../../internal/test/a11y.js';
import { oneEvent } from '../../internal/test/index.js';
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
    element = render(html`
      <uui-modal-container></uui-modal-container>
    `).container.querySelector('uui-modal-container')!;

    await element.updateComplete;
  });

  it('is defined with its own instance', () => {
    expect(element).toBeInstanceOf(UUIModalContainerElement);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });
});

describe('UUIModalDialogElement', () => {
  let element: UUIModalDialogElement;

  beforeEach(async () => {
    element = render(html`
      <uui-modal-dialog></uui-modal-dialog>
    `).container.querySelector('uui-modal-dialog')!;

    await element.updateComplete;
  });

  it('is defined with its own instance', () => {
    expect(element).toBeInstanceOf(UUIModalDialogElement);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });
});

describe('UUIModalSidebarElement', () => {
  let element: UUIModalSidebarElement;

  beforeEach(async () => {
    element = render(html`
      <uui-modal-sidebar></uui-modal-sidebar>
    `).container.querySelector('uui-modal-sidebar')!;

    await element.updateComplete;
  });

  it('is defined with its own instance', () => {
    expect(element).toBeInstanceOf(UUIModalSidebarElement);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  describe('properties', () => {
    it('has a size property', () => {
      expect(element).toHaveProperty('size');
    });

    it('has a index property', () => {
      expect(element).toHaveProperty('index');
    });

    it('has a uniqueIndex property', () => {
      expect(element).toHaveProperty('uniqueIndex');
    });

    it('has a transitionDuration property', () => {
      expect(element).toHaveProperty('transitionDuration');
    });
  });

  it('can close', async () => {
    expect(element.isOpen).toBe(true);

    const listener = oneEvent(element, UUIModalCloseEvent);

    element.close();

    const event = await listener;
    expect(event).not.toBe(null);

    const endListener = oneEvent(element, UUIModalCloseEndEvent);

    const endEvent = await endListener;
    expect(endEvent).not.toBe(null);

    expect(element.isOpen).toBe(false);
  });

  it('can have a prevented close', async () => {
    expect(element.isOpen).toBe(true);

    expect(element.isClosing).toBe(false);
    element.addEventListener(UUIModalCloseEvent, e => e.preventDefault());
    const closeListener = oneEvent(element, UUIModalCloseEvent);
    element.close();

    const closeEvent = await closeListener;
    expect(closeEvent).not.toBe(null);

    expect(element.isClosing).toBe(false);
    expect(element.isOpen).toBe(true);
  });
});
