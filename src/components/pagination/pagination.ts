import { defineElement } from '../../internal/registration/index.js';
import { UUIPaginationElement } from './pagination.element.js';

export * from './pagination.element.js';
export * from './UUIPaginationEvent.js';

export default UUIPaginationElement;

defineElement('uui-pagination', UUIPaginationElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-pagination': UUIPaginationElement;
  }
}
