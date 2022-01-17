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
});
