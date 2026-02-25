import { defineElement } from '../../internal/registration/index.js';
import { UUICheckboxElement } from './checkbox.element.js';

export * from './checkbox.element.js';

defineElement('uui-checkbox', UUICheckboxElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-checkbox': UUICheckboxElement;
  }
}
