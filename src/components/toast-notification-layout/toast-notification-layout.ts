import { defineElement } from '../../internal/registration/index.js';
import { UUIToastNotificationLayoutElement } from './toast-notification-layout.element.js';

export * from './toast-notification-layout.element.js';

export default UUIToastNotificationLayoutElement;

defineElement(
  'uui-toast-notification-layout',
  UUIToastNotificationLayoutElement,
);

declare global {
  interface HTMLElementTagNameMap {
    'uui-toast-notification-layout': UUIToastNotificationLayoutElement;
  }
}
