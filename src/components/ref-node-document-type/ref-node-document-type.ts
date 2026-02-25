import { defineElement } from '../../internal/registration/index.js';
import { UUIRefNodeDocumentTypeElement } from './ref-node-document-type.element.js';

export * from './ref-node-document-type.element.js';

export default UUIRefNodeDocumentTypeElement;

defineElement('uui-ref-node-document-type', UUIRefNodeDocumentTypeElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-ref-node-document-type': UUIRefNodeDocumentTypeElement;
  }
}
