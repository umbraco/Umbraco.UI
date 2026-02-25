import { defineElement } from '../../internal/registration/index.js';
import { UUIButtonGroupElement } from './button-group.element.js';

export * from './button-group.element.js';

export default UUIButtonGroupElement;

defineElement('uui-button-group', UUIButtonGroupElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-button-group': UUIButtonGroupElement;
  }
}
