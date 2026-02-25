import { defineElement } from '../../internal/registration/index.js';
import { UUISymbolFileElement } from './symbol-file.element.js';

defineElement('uui-symbol-file', UUISymbolFileElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-symbol-file': UUISymbolFileElement;
  }
}

export * from './symbol-file.element.js';
export { UUISymbolFileElement as default } from './symbol-file.element.js';
