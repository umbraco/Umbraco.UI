import { defineElement } from '../../internal/registration/index.js';
import { UUILabelElement } from './label.element.js';

export * from './label.element.js';

defineElement('uui-label', UUILabelElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-label': UUILabelElement;
  }
}
