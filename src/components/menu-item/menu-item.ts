import { defineElement } from '../../internal/registration/index.js';
import { UUIMenuItemElement } from './menu-item.element.js';

defineElement('uui-menu-item', UUIMenuItemElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-menu-item': UUIMenuItemElement;
  }
}

export * from './menu-item.element.js';
export * from './UUIMenuItemEvent.js';
export { UUIMenuItemElement as default } from './menu-item.element.js';
