import { defineElement } from '../../internal/registration/index.js';
import { UUIFilePreviewElement } from './file-preview.element.js';

defineElement('uui-file-preview', UUIFilePreviewElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-file-preview': UUIFilePreviewElement;
  }
}

export * from './file-preview.element.js';
export * from './UUIFileSize.js';
export { UUIFilePreviewElement as default } from './file-preview.element.js';
