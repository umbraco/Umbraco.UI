import { defineElement } from '../../internal/registration/index.js';
import { UUIInputPasswordElement } from './input-password.element.js';

defineElement('uui-input-password', UUIInputPasswordElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-input-password': UUIInputPasswordElement;
  }
}

export * from './input-password.element.js';
export { UUIInputPasswordElement as default } from './input-password.element.js';
