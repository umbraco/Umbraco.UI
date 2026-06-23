import { defineElement } from '../../internal/registration/index.js';
import { UUIButtonInlineCreateElement } from './button-inline-create.element.js';

defineElement('uui-button-inline-create', UUIButtonInlineCreateElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-button-inline-create': UUIButtonInlineCreateElement;
  }
}

export * from './button-inline-create.element.js';
export * from './UUIButtonInlineCreateEvent.js';
export { UUIButtonInlineCreateElement as default } from './button-inline-create.element.js';
