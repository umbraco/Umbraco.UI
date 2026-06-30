import { defineElement } from '../../internal/registration/index.js';
import { UUIComboboxElement } from './combobox.element.js';

defineElement('uui-combobox', UUIComboboxElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-combobox': UUIComboboxElement;
  }
}

export * from './combobox.element.js';
export * from './UUIComboboxEvent.js';
export { UUIComboboxElement as default } from './combobox.element.js';
