import { defineElement } from '../../internal/registration/index.js';
import { UUICardContentNodeElement } from './card-content-node.element.js';

defineElement('uui-card-content-node', UUICardContentNodeElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-card-content-node': UUICardContentNodeElement;
  }
}

export * from './card-content-node.element.js';
export { UUICardContentNodeElement as default } from './card-content-node.element.js';
