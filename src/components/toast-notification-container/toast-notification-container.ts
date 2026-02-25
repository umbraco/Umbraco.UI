import { defineElement } from '../../internal/registration/index.js';
import { UUIToastNotificationContainerElement } from './toast-notification-container.element.js';

defineElement(
  'uui-toast-notification-container',
  UUIToastNotificationContainerElement,
);

declare global {
  interface HTMLElementTagNameMap {
    'uui-toast-notification-container': UUIToastNotificationContainerElement;
  }
}

export * from './toast-notification-container.element.js';
export { UUIToastNotificationContainerElement as default } from './toast-notification-container.element.js';
