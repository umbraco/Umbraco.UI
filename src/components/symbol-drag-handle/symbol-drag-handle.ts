import { defineElement } from '../../internal/registration/index.js';
import { UUISymbolDragHandleElement } from './symbol-drag-handle.element.js';

defineElement('uui-symbol-drag-handle', UUISymbolDragHandleElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-symbol-drag-handle': UUISymbolDragHandleElement;
  }
}

export * from './symbol-drag-handle.element.js';
export { UUISymbolDragHandleElement as default } from './symbol-drag-handle.element.js';
