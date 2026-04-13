import { defineElement } from '../../internal/registration/index.js';
import { UUIInputElement } from './input.element.js';

defineElement('uui-input', UUIInputElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-input': UUIInputElement;
  }
}

export * from './input.element.js';
export * from './UUIInputEvent.js';
export { UUIInputElement as default } from './input.element.js';
