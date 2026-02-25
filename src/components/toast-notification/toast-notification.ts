import { defineElement } from '../../internal/registration/index.js';
import { UUIToastNotificationElement } from './toast-notification.element.js';

export * from './toast-notification.element.js';
export * from './UUIToastNotificationEvent.js';

export default UUIToastNotificationElement;

defineElement('uui-toast-notification', UUIToastNotificationElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-toast-notification': UUIToastNotificationElement;
  }
}
