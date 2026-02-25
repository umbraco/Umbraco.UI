import { defineElement } from '../../internal/registration/index.js';
import { UUICardElement } from './card.element.js';

export * from './card.element.js';
export * from './UUICardEvent.js';

defineElement('uui-card', UUICardElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-card': UUICardElement;
  }
}
