import { defineElement } from '../../internal/registration/index.js';
import { UUIButtonCopyTextElement } from './button-copy-text.element.js';

defineElement('uui-button-copy-text', UUIButtonCopyTextElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-button-copy-text': UUIButtonCopyTextElement;
  }
}

export * from './button-copy-text.element.js';
export * from './UUICopyTextEvent.js';
export { UUIButtonCopyTextElement as default } from './button-copy-text.element.js';
