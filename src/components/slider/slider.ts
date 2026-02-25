import { defineElement } from '../../internal/registration/index.js';
import { UUISliderElement } from './slider.element.js';

defineElement('uui-slider', UUISliderElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-slider': UUISliderElement;
  }
}

export * from './slider.element.js';
export * from './UUISliderEvent.js';
export { UUISliderElement as default } from './slider.element.js';
