import { defineElement } from '../../internal/registration/index.js';
import { UUISymbolMoreElement } from './symbol-more.element.js';

export * from './symbol-more.element.js';

export default UUISymbolMoreElement;

defineElement('uui-symbol-more', UUISymbolMoreElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-symbol-more': UUISymbolMoreElement;
  }
}
