import { defineElement } from '../../internal/registration/index.js';
import { UUICardContentNodeElement } from './card-content-node.element.js';

export * from './card-content-node.element.js';

export default UUICardContentNodeElement;

defineElement('uui-card-content-node', UUICardContentNodeElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-card-content-node': UUICardContentNodeElement;
  }
}
