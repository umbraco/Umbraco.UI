import { defineElement } from '../../internal/registration/index.js';
import { UUIPaginationElement } from './pagination.element.js';

defineElement('uui-pagination', UUIPaginationElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-pagination': UUIPaginationElement;
  }
}

export * from './pagination.element.js';
export * from './UUIPaginationEvent.js';
export { UUIPaginationElement as default } from './pagination.element.js';
