import { defineElement } from '../../internal/registration/index.js';
import { UUIInputPasswordElement } from './input-password.element.js';

export * from './input-password.element.js';

export default UUIInputPasswordElement;

defineElement('uui-input-password', UUIInputPasswordElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-input-password': UUIInputPasswordElement;
  }
}
