import { defineElement } from '../../internal/registration/index.js';
import { UUIRefNodeDataTypeElement } from './ref-node-data-type.element.js';

export * from './ref-node-data-type.element.js';

export default UUIRefNodeDataTypeElement;

defineElement('uui-ref-node-data-type', UUIRefNodeDataTypeElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-ref-node-data-type': UUIRefNodeDataTypeElement;
  }
}
