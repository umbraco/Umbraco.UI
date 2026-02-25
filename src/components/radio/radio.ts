import { defineElement } from '../../internal/registration/index.js';
import { UUIRadioGroupElement } from './radio-group.element.js';
import { UUIRadioElement } from './radio.element.js';

export * from './radio-group.element.js';
export * from './radio.element.js';
export * from './UUIRadioEvent.js';
export * from './UUIRadioGroupEvent.js';

export default UUIRadioElement;

defineElement('uui-radio-group', UUIRadioGroupElement);
defineElement('uui-radio', UUIRadioElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-radio-group': UUIRadioGroupElement;
    'uui-radio': UUIRadioElement;
  }
}
