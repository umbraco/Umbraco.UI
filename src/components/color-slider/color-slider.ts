import { defineElement } from '../../internal/registration/index.js';
import { UUIColorSliderElement } from './color-slider.element.js';

defineElement('uui-color-slider', UUIColorSliderElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-color-slider': UUIColorSliderElement;
  }
}

export * from './color-slider.element.js';
export * from './UUIColorSliderEvent.js';
export { UUIColorSliderElement as default } from './color-slider.element.js';
