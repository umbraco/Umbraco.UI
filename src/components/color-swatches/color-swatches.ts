import { defineElement } from '../../internal/registration/index.js';
import { UUIColorSwatchesElement } from './color-swatches.element.js';

export * from './color-swatches.element.js';
export * from './UUIColorSwatchesEvent.js';

defineElement('uui-color-swatches', UUIColorSwatchesElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-color-swatches': UUIColorSwatchesElement;
  }
}
