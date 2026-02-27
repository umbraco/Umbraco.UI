import { defineElement } from '../../internal/registration/index.js';
import { UUISymbolFileDropzoneElement } from './symbol-file-dropzone.element.js';

defineElement('uui-symbol-file-dropzone', UUISymbolFileDropzoneElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-symbol-file-dropzone': UUISymbolFileDropzoneElement;
  }
}

export * from './symbol-file-dropzone.element.js';
export { UUISymbolFileDropzoneElement as default } from './symbol-file-dropzone.element.js';
