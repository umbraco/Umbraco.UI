import { defineElement } from '../../internal/registration/index.js';
import { UUIToastNotificationLayoutElement } from './toast-notification-layout.element.js';

defineElement(
  'uui-toast-notification-layout',
  UUIToastNotificationLayoutElement,
);

declare global {
  interface HTMLElementTagNameMap {
    'uui-toast-notification-layout': UUIToastNotificationLayoutElement;
  }
}

export * from './toast-notification-layout.element.js';
export { UUIToastNotificationLayoutElement as default } from './toast-notification-layout.element.js';
