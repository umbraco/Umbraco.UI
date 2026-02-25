import { defineElement } from '../../internal/registration/index.js';
import { UUIRefNodeMemberElement } from './ref-node-member.element.js';

export * from './ref-node-member.element.js';

defineElement('uui-ref-node-member', UUIRefNodeMemberElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-ref-node-member': UUIRefNodeMemberElement;
  }
}
