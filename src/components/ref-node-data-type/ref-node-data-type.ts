import { defineElement } from '../../internal/registration/index.js';
import { UUIRefNodeDataTypeElement } from './ref-node-data-type.element.js';

defineElement('uui-ref-node-data-type', UUIRefNodeDataTypeElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-ref-node-data-type': UUIRefNodeDataTypeElement;
  }
}

export * from './ref-node-data-type.element.js';
export { UUIRefNodeDataTypeElement as default } from './ref-node-data-type.element.js';
