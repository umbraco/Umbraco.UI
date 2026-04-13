import { defineElement } from '../../internal/registration/index.js';
import { UUIColorSwatchesElement } from './color-swatches.element.js';

defineElement('uui-color-swatches', UUIColorSwatchesElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-color-swatches': UUIColorSwatchesElement;
  }
}

export * from './color-swatches.element.js';
export * from './UUIColorSwatchesEvent.js';
export { UUIColorSwatchesElement as default } from './color-swatches.element.js';
