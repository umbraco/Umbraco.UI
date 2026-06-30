import { defineElement } from '../../internal/registration/index.js';
import { UUICardElement } from './card.element.js';

defineElement('uui-card', UUICardElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-card': UUICardElement;
  }
}

export * from './card.element.js';
export * from './UUICardEvent.js';
export { UUICardElement as default } from './card.element.js';
