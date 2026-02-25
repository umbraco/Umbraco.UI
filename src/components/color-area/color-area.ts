import { defineElement } from '../../internal/registration/index.js';
import { UUIColorAreaElement } from './color-area.element.js';

export * from './color-area.element.js';
export * from './UUIColorAreaEvent.js';

export default UUIColorAreaElement;

defineElement('uui-color-area', UUIColorAreaElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-color-area': UUIColorAreaElement;
  }
}
