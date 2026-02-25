import { defineElement } from '../../internal/registration/index.js';
import { UUISymbolExpandElement } from './symbol-expand.element.js';

export * from './symbol-expand.element.js';

defineElement('uui-symbol-expand', UUISymbolExpandElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-symbol-expand': UUISymbolExpandElement;
  }
}
