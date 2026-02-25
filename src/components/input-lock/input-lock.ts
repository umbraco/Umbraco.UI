import { defineElement } from '../../internal/registration/index.js';
import { UUIInputLockElement } from './input-lock.element.js';

export * from './input-lock.element.js';
export * from './UUIInputLockEvent.js';

defineElement('uui-input-lock', UUIInputLockElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-input-lock': UUIInputLockElement;
  }
}
