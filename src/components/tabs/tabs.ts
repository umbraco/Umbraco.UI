import { defineElement } from '../../internal/registration/index.js';
import { UUITabGroupElement } from './tab-group.element.js';
import { UUITabElement } from './tab.element.js';

export * from './tab-group.element.js';
export * from './tab.element.js';
export * from './UUITabEvent.js';
export * from './UUITabGroupEvent.js';

defineElement('uui-tab-group', UUITabGroupElement);
defineElement('uui-tab', UUITabElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-tab-group': UUITabGroupElement;
    'uui-tab': UUITabElement;
  }
}
