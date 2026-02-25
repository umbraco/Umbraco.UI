import { defineElement } from '../../internal/registration/index.js';
import { UUISymbolFileElement } from './symbol-file.element.js';

export * from './symbol-file.element.js';

export default UUISymbolFileElement;

defineElement('uui-symbol-file', UUISymbolFileElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-symbol-file': UUISymbolFileElement;
  }
}
