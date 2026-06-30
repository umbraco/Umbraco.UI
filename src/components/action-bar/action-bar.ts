import { defineElement } from '../../internal/registration/index.js';
import { UUIActionBarElement } from './action-bar.element.js';

defineElement('uui-action-bar', UUIActionBarElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-action-bar': UUIActionBarElement;
  }
}

export * from './action-bar.element.js';
export { UUIActionBarElement as default } from './action-bar.element.js';
