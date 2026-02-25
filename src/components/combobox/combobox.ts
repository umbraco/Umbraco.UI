import { defineElement } from '../../internal/registration/index.js';
import { UUIComboboxElement } from './combobox.element.js';

export * from './combobox.element.js';
export * from './UUIComboboxEvent.js';

defineElement('uui-combobox', UUIComboboxElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-combobox': UUIComboboxElement;
  }
}
