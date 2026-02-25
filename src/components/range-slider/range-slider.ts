import { defineElement } from '../../internal/registration/index.js';
import { UUIRangeSliderElement } from './range-slider.element.js';

defineElement('uui-range-slider', UUIRangeSliderElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-range-slider': UUIRangeSliderElement;
  }
}

export * from './range-slider.element.js';
export * from './UUIRangeSliderEvent.js';
export { UUIRangeSliderElement as default } from './range-slider.element.js';
