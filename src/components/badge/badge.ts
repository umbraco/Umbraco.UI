import { defineElement } from '../../internal/registration/index.js';
import { UUIBadgeElement } from './badge.element.js';

export * from './badge.element.js';

export default UUIBadgeElement;

defineElement('uui-badge', UUIBadgeElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-badge': UUIBadgeElement;
  }
}
