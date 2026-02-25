import { defineElement } from '../../internal/registration/index.js';
import { UUISelectElement } from './select.element.js';

export * from './select.element.js';
export * from './UUISelectEvent.js';

defineElement('uui-select', UUISelectElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-select': UUISelectElement;
  }
}
