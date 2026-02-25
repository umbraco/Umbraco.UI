import { defineElement } from '../../internal/registration/index.js';
import { UUISymbolSortElement } from './symbol-sort.element.js';

export * from './symbol-sort.element.js';

defineElement('uui-symbol-sort', UUISymbolSortElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-symbol-sort': UUISymbolSortElement;
  }
}
