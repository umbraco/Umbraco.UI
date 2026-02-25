import { defineElement } from '../../internal/registration/index.js';
import { UUIRefNodeDocumentTypeElement } from './ref-node-document-type.element.js';

defineElement('uui-ref-node-document-type', UUIRefNodeDocumentTypeElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-ref-node-document-type': UUIRefNodeDocumentTypeElement;
  }
}

export * from './ref-node-document-type.element.js';
export { UUIRefNodeDocumentTypeElement as default } from './ref-node-document-type.element.js';
