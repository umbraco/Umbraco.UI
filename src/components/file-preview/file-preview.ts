import { defineElement } from '../../internal/registration/index.js';
import { UUIFilePreviewElement } from './file-preview.element.js';

export * from './file-preview.element.js';
export * from './UUIFileSize.js';

defineElement('uui-file-preview', UUIFilePreviewElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-file-preview': UUIFilePreviewElement;
  }
}
