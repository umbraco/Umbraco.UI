import { defineElement } from '../../internal/registration/index.js';
import { UUIVisuallyHiddenElement } from './visually-hidden.element.js';

export * from './visually-hidden.element.js';

defineElement('uui-visually-hidden', UUIVisuallyHiddenElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-visually-hidden': UUIVisuallyHiddenElement;
  }
}
