import './toast-notification-layout.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import '../button/button.js';
import '../icon/icon.js';

import { UUIToastNotificationLayoutElement } from './toast-notification-layout.element';

describe('UUIToastNotificationLayoutElement', () => {
  let element: UUIToastNotificationLayoutElement;

  beforeEach(async () => {
    element = render(html`
      <uui-toast-notification-layout></uui-toast-notification-layout>
    `).container.querySelector('uui-toast-notification-layout')!;

    await element.updateComplete;
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  describe('properties', () => {
    it('headline', () => {
      expect(element).toHaveProperty('headline');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).not.toBe(null);
    });
    it('renders a headline slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name="actions"]')!;
      expect(slot).not.toBe(null);
    });
    it('renders a actions slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name="actions"]')!;
      expect(slot).not.toBe(null);
    });
  });
});
