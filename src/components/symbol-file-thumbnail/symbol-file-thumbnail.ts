import { defineElement } from '../../internal/registration/index.js';
import { UUISymbolFileThumbnailElement } from './symbol-file-thumbnail.element.js';

export * from './symbol-file-thumbnail.element.js';

defineElement('uui-symbol-file-thumbnail', UUISymbolFileThumbnailElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-symbol-file-thumbnail': UUISymbolFileThumbnailElement;
  }
}
