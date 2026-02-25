import { defineElement } from '../../internal/registration/index.js';
import { UUISymbolFileDropzoneElement } from './symbol-file-dropzone.element.js';

export * from './symbol-file-dropzone.element.js';

export default UUISymbolFileDropzoneElement;

defineElement('uui-symbol-file-dropzone', UUISymbolFileDropzoneElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-symbol-file-dropzone': UUISymbolFileDropzoneElement;
  }
}
