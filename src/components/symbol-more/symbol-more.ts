import { defineElement } from '../../internal/registration/index.js';
import { UUISymbolMoreElement } from './symbol-more.element.js';

defineElement('uui-symbol-more', UUISymbolMoreElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-symbol-more': UUISymbolMoreElement;
  }
}

export * from './symbol-more.element.js';
export { UUISymbolMoreElement as default } from './symbol-more.element.js';
