import { defineElement } from '../../internal/registration/index.js';
import { UUISymbolFolderElement } from './symbol-folder.element.js';

defineElement('uui-symbol-folder', UUISymbolFolderElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-symbol-folder': UUISymbolFolderElement;
  }
}

export * from './symbol-folder.element.js';
export { UUISymbolFolderElement as default } from './symbol-folder.element.js';
