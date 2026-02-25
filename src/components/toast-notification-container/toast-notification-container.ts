import { defineElement } from '../../internal/registration/index.js';
import { UUIToastNotificationContainerElement } from './toast-notification-container.element.js';

export * from './toast-notification-container.element.js';

export default UUIToastNotificationContainerElement;

defineElement(
  'uui-toast-notification-container',
  UUIToastNotificationContainerElement,
);

declare global {
  interface HTMLElementTagNameMap {
    'uui-toast-notification-container': UUIToastNotificationContainerElement;
  }
}
