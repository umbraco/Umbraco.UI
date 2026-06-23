import { defineElement } from '../../internal/registration/index.js';
import { UUIButtonElement } from './button.element.js';

defineElement('uui-button', UUIButtonElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-button': UUIButtonElement;
  }
}

export * from './button.element.js';
export { UUIButtonElement as default } from './button.element.js';
