import { defineElement } from '../../internal/registration/index.js';
import { UUIToggleElement } from './toggle.element.js';

export * from './toggle.element.js';

export default UUIToggleElement;

defineElement('uui-toggle', UUIToggleElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-toggle': UUIToggleElement;
  }
}
