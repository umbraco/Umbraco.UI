import { defineElement } from '../../internal/registration/index.js';
import { UUIInputGroupElement } from './input-group.element.js';

defineElement('uui-input-group', UUIInputGroupElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-input-group': UUIInputGroupElement;
  }
}

export * from './input-group.element.js';
export { UUIInputGroupElement as default } from './input-group.element.js';
