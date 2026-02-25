import { defineElement } from '../../internal/registration/index.js';
import { UUIRefNodeUserElement } from './ref-node-user.element.js';

export * from './ref-node-user.element.js';

export default UUIRefNodeUserElement;

defineElement('uui-ref-node-user', UUIRefNodeUserElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-ref-node-user': UUIRefNodeUserElement;
  }
}
