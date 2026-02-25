import { defineElement } from '../../internal/registration/index.js';
import { UUIColorPickerElement } from './color-picker.element.js';

export * from './color-picker.element.js';
export * from './UUIColorPickerEvent.js';

defineElement('uui-color-picker', UUIColorPickerElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-color-picker': UUIColorPickerElement;
  }
}
