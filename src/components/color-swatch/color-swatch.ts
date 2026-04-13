import { defineElement } from '../../internal/registration/index.js';
import { UUIColorSwatchElement } from './color-swatch.element.js';

defineElement('uui-color-swatch', UUIColorSwatchElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-color-swatch': UUIColorSwatchElement;
  }
}

export * from './color-swatch.element.js';
export { UUIColorSwatchElement as default } from './color-swatch.element.js';
