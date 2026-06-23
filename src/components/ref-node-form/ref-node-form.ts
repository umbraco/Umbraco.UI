import { defineElement } from '../../internal/registration/index.js';
import { UUIRefNodeFormElement } from './ref-node-form.element.js';

defineElement('uui-ref-node-form', UUIRefNodeFormElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-ref-node-form': UUIRefNodeFormElement;
  }
}

export * from './ref-node-form.element.js';
export { UUIRefNodeFormElement as default } from './ref-node-form.element.js';
