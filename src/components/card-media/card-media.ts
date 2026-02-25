import { defineElement } from '../../internal/registration/index.js';
import { UUICardMediaElement } from './card-media.element.js';

export * from './card-media.element.js';

defineElement('uui-card-media', UUICardMediaElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-card-media': UUICardMediaElement;
  }
}
