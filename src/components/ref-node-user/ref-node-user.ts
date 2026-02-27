import { defineElement } from '../../internal/registration/index.js';
import { UUIRefNodeUserElement } from './ref-node-user.element.js';

defineElement('uui-ref-node-user', UUIRefNodeUserElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-ref-node-user': UUIRefNodeUserElement;
  }
}

export * from './ref-node-user.element.js';
export { UUIRefNodeUserElement as default } from './ref-node-user.element.js';
