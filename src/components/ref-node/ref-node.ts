import { defineElement } from '../../internal/registration/index.js';
import { UUIRefNodeElement } from './ref-node.element.js';

defineElement('uui-ref-node', UUIRefNodeElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-ref-node': UUIRefNodeElement;
  }
}

export * from './ref-node.element.js';
export { UUIRefNodeElement as default } from './ref-node.element.js';
