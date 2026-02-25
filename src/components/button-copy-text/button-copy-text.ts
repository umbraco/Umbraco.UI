import { defineElement } from '../../internal/registration/index.js';
import { UUIButtonCopyTextElement } from './button-copy-text.element.js';

export * from './button-copy-text.element.js';
export * from './UUICopyTextEvent.js';

defineElement('uui-button-copy-text', UUIButtonCopyTextElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-button-copy-text': UUIButtonCopyTextElement;
  }
}
