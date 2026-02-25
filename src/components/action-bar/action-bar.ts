import { defineElement } from '../../internal/registration/index.js';
import { UUIActionBarElement } from './action-bar.element.js';

export * from './action-bar.element.js';

export default UUIActionBarElement;

defineElement('uui-action-bar', UUIActionBarElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-action-bar': UUIActionBarElement;
  }
}
