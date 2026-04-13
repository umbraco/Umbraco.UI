import { defineElement } from '../../internal/registration/index.js';
import { UUISymbolLockElement } from './symbol-lock.element.js';

defineElement('uui-symbol-lock', UUISymbolLockElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-symbol-lock': UUISymbolLockElement;
  }
}

export * from './symbol-lock.element.js';
export { UUISymbolLockElement as default } from './symbol-lock.element.js';
