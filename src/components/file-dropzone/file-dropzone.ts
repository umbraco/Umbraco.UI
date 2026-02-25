import { defineElement } from '../../internal/registration/index.js';
import { UUIFileDropzoneElement } from './file-dropzone.element.js';

export * from './file-dropzone.element.js';
export * from './UUIFileDropzoneEvent.js';

export default UUIFileDropzoneElement;

defineElement('uui-file-dropzone', UUIFileDropzoneElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-file-dropzone': UUIFileDropzoneElement;
  }
}
