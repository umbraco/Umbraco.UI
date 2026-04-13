import { defineElement } from '../../internal/registration/index.js';
import { UUIToastNotificationElement } from './toast-notification.element.js';

defineElement('uui-toast-notification', UUIToastNotificationElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-toast-notification': UUIToastNotificationElement;
  }
}

export * from './toast-notification.element.js';
export * from './UUIToastNotificationEvent.js';
export { UUIToastNotificationElement as default } from './toast-notification.element.js';
