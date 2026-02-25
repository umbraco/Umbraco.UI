import { defineElement } from '../../internal/registration/index.js';
import { UUIColorSliderElement } from './color-slider.element.js';

export * from './color-slider.element.js';
export * from './UUIColorSliderEvent.js';

export default UUIColorSliderElement;

defineElement('uui-color-slider', UUIColorSliderElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-color-slider': UUIColorSliderElement;
  }
}
