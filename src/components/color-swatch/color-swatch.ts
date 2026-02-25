import { defineElement } from '../../internal/registration/index.js';
import { UUIColorSwatchElement } from './color-swatch.element.js';

export * from './color-swatch.element.js';

export default UUIColorSwatchElement;

defineElement('uui-color-swatch', UUIColorSwatchElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-color-swatch': UUIColorSwatchElement;
  }
}
