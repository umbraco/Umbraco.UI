import { defineElement } from '../../internal/registration/index.js';
import { UUIButtonGroupElement } from './button-group.element.js';

defineElement('uui-button-group', UUIButtonGroupElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-button-group': UUIButtonGroupElement;
  }
}

export * from './button-group.element.js';
export { UUIButtonGroupElement as default } from './button-group.element.js';
