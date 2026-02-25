import { defineElement } from '../../internal/registration/index.js';
import { UUISelectElement } from './select.element.js';

defineElement('uui-select', UUISelectElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-select': UUISelectElement;
  }
}

export * from './select.element.js';
export * from './UUISelectEvent.js';
export { UUISelectElement as default } from './select.element.js';
