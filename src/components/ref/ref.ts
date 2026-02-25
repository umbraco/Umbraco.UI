import { defineElement } from '../../internal/registration/index.js';
import { UUIRefElement } from './ref.element.js';

export * from './ref.element.js';
export * from './UUIRefEvent.js';

defineElement('uui-ref', UUIRefElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-ref': UUIRefElement;
  }
}
