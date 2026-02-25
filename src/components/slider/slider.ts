import { defineElement } from '../../internal/registration/index.js';
import { UUISliderElement } from './slider.element.js';

export * from './slider.element.js';
export * from './UUISliderEvent.js';

defineElement('uui-slider', UUISliderElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-slider': UUISliderElement;
  }
}
