import { defineElement } from '../../internal/registration/index.js';
import { UUIRangeSliderElement } from './range-slider.element.js';

export * from './range-slider.element.js';
export * from './UUIRangeSliderEvent.js';

defineElement('uui-range-slider', UUIRangeSliderElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-range-slider': UUIRangeSliderElement;
  }
}
