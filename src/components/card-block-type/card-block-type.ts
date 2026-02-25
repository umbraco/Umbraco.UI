import { defineElement } from '../../internal/registration/index.js';
import { UUICardBlockTypeElement } from './card-block-type.element.js';

export * from './card-block-type.element.js';

export default UUICardBlockTypeElement;

defineElement('uui-card-block-type', UUICardBlockTypeElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-card-block-type': UUICardBlockTypeElement;
  }
}
