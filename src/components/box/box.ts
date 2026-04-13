import { defineElement } from '../../internal/registration/index.js';
import { UUIBoxElement } from './box.element.js';

defineElement('uui-box', UUIBoxElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-box': UUIBoxElement;
  }
}

export * from './box.element.js';
export { UUIBoxElement as default } from './box.element.js';
