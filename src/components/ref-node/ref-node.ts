import { defineElement } from '../../internal/registration/index.js';
import { UUIRefNodeElement } from './ref-node.element.js';

export * from './ref-node.element.js';

defineElement('uui-ref-node', UUIRefNodeElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-ref-node': UUIRefNodeElement;
  }
}
