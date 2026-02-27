import { defineElement } from '../../internal/registration/index.js';
import { UUITextareaElement } from './textarea.element.js';

defineElement('uui-textarea', UUITextareaElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-textarea': UUITextareaElement;
  }
}

export * from './textarea.element.js';
export * from './UUITextareaEvent.js';
export { UUITextareaElement as default } from './textarea.element.js';
