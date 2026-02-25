import { defineElement } from '../../internal/registration/index.js';
import { UUISymbolLockElement } from './symbol-lock.element.js';

export * from './symbol-lock.element.js';

export default UUISymbolLockElement;

defineElement('uui-symbol-lock', UUISymbolLockElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-symbol-lock': UUISymbolLockElement;
  }
}
