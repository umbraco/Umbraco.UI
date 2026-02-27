import { defineElement } from '../../internal/registration/index.js';
import { UUIComboboxListOptionElement } from './combobox-list-option.element.js';
import { UUIComboboxListElement } from './combobox-list.element.js';

defineElement('uui-combobox-list-option', UUIComboboxListOptionElement);
defineElement('uui-combobox-list', UUIComboboxListElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-combobox-list-option': UUIComboboxListOptionElement;
    'uui-combobox-list': UUIComboboxListElement;
  }
}

export * from './combobox-list-option.element.js';
export * from './combobox-list.element.js';
export * from './UUIComboboxListEvent.js';
export { UUIComboboxListElement as default } from './combobox-list.element.js';
