import { html, fixture, expect } from '@open-wc/testing';
import { UUIToastNotificationContainerElement } from './uui-toast-notification-container.element';
import '.';

describe('UUIToastNotificationContainerElement', () => {
  let element: UUIToastNotificationContainerElement;

  beforeEach(async () => {
    element = await fixture(
      html`
        <uui-toast-notification-container></uui-toast-notification-container>
      `
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

  // Auto close timer is set on toast

  // auto close timer is paused on focus.

  // auto close timer is paused on mouseover.
});
