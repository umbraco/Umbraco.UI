import { defineElement } from '../../internal/registration/index.js';
import { UUIFormElement } from './form.element.js';

defineElement('uui-form', UUIFormElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-form': UUIFormElement;
  }
}

export * from './form.element.js';
export { UUIFormElement as default } from './form.element.js';
