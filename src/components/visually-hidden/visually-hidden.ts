import { defineElement } from '../../internal/registration/index.js';
import { UUIVisuallyHiddenElement } from './visually-hidden.element.js';

defineElement('uui-visually-hidden', UUIVisuallyHiddenElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-visually-hidden': UUIVisuallyHiddenElement;
  }
}

export * from './visually-hidden.element.js';
export { UUIVisuallyHiddenElement as default } from './visually-hidden.element.js';
