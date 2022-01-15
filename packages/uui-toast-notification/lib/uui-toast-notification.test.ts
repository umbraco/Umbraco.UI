import { html, fixture, expect } from '@open-wc/testing';
import { UUIToastNotificationElement } from './uui-toast-notification.element';
import '.';

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
});
