import { defineElement } from '../../internal/registration/index.js';
import { UUIColorPickerElement } from './color-picker.element.js';

defineElement('uui-color-picker', UUIColorPickerElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-color-picker': UUIColorPickerElement;
  }
}

export * from './color-picker.element.js';
export * from './UUIColorPickerEvent.js';
export { UUIColorPickerElement as default } from './color-picker.element.js';
