import { defineElement } from '../../internal/registration/index.js';
import { UUIIconElement } from './icon.element.js';

export * from './icon.element.js';
export * from './UUIIconRequestEvent.js';

defineElement('uui-icon', UUIIconElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-icon': UUIIconElement;
  }
}
