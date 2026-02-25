import { defineElement } from '../../internal/registration/index.js';
import { UUIFileDropzoneElement } from './file-dropzone.element.js';

defineElement('uui-file-dropzone', UUIFileDropzoneElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-file-dropzone': UUIFileDropzoneElement;
  }
}

export * from './file-dropzone.element.js';
export * from './UUIFileDropzoneEvent.js';
export { UUIFileDropzoneElement as default } from './file-dropzone.element.js';
