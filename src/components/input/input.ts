import { defineElement } from '../../internal/registration/index.js';
import { UUIInputElement } from './input.element.js';

export * from './input.element.js';
export * from './UUIInputEvent.js';

export default UUIInputElement;

defineElement('uui-input', UUIInputElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-input': UUIInputElement;
  }
}
