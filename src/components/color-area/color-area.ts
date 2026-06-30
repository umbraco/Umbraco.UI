import { defineElement } from '../../internal/registration/index.js';
import { UUIColorAreaElement } from './color-area.element.js';

defineElement('uui-color-area', UUIColorAreaElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-color-area': UUIColorAreaElement;
  }
}

export * from './color-area.element.js';
export * from './UUIColorAreaEvent.js';
export { UUIColorAreaElement as default } from './color-area.element.js';
