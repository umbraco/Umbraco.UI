import { defineElement } from '../../internal/registration/index.js';
import { UUIRefListElement } from './ref-list.element.js';

export * from './ref-list.element.js';

export default UUIRefListElement;

defineElement('uui-ref-list', UUIRefListElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-ref-list': UUIRefListElement;
  }
}
