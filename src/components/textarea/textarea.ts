import { defineElement } from '../../internal/registration/index.js';
import { UUITextareaElement } from './textarea.element.js';

export * from './textarea.element.js';
export * from './UUITextareaEvent.js';

export default UUITextareaElement;

defineElement('uui-textarea', UUITextareaElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-textarea': UUITextareaElement;
  }
}
