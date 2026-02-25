import { defineElement } from '../../internal/registration/index.js';
import { UUIFormLayoutItemElement } from './form-layout-item.element.js';

export * from './form-layout-item.element.js';

defineElement('uui-form-layout-item', UUIFormLayoutItemElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-form-layout-item': UUIFormLayoutItemElement;
  }
}
