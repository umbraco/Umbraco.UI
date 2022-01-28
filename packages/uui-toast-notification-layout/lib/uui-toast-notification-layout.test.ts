import { html, fixture, expect } from '@open-wc/testing';
import { UUIToastNotificationLayoutElement } from './uui-toast-notification-layout.element';
import '.';
import '@umbraco-ui/uui-button/lib/index';
import '@umbraco-ui/uui-icon/lib/index';

describe('UUIToastNotificationLayoutElement', () => {
  let element: UUIToastNotificationLayoutElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-toast-notification-layout></uui-toast-notification-layout> `
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('properties', () => {
    it('headline', () => {
      expect(element).to.have.property('headline');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).to.exist;
    });
    it('renders a headline slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name="actions"]')!;
      expect(slot).to.exist;
    });
    it('renders a actions slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name="actions"]')!;
      expect(slot).to.exist;
    });
  });
});
