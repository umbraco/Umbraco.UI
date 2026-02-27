import { defineElement } from '../../internal/registration/index.js';
import { UUIInputLockElement } from './input-lock.element.js';

defineElement('uui-input-lock', UUIInputLockElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-input-lock': UUIInputLockElement;
  }
}

export * from './input-lock.element.js';
export * from './UUIInputLockEvent.js';
export { UUIInputLockElement as default } from './input-lock.element.js';
