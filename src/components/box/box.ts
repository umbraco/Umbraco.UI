import { defineElement } from '../../internal/registration/index.js';
import { UUIBoxElement } from './box.element.js';

export * from './box.element.js';

export default UUIBoxElement;

defineElement('uui-box', UUIBoxElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-box': UUIBoxElement;
  }
}
