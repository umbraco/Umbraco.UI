import { defineElement } from '../../internal/registration/index.js';
import { UUIInputGroupAddonElement } from './input-group-addon.element.js';

defineElement('uui-input-group-addon', UUIInputGroupAddonElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-input-group-addon': UUIInputGroupAddonElement;
  }
}

export * from './input-group-addon.element.js';
export { UUIInputGroupAddonElement as default } from './input-group-addon.element.js';
