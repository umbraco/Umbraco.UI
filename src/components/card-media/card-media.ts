import { defineElement } from '../../internal/registration/index.js';
import { UUICardMediaElement } from './card-media.element.js';

defineElement('uui-card-media', UUICardMediaElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-card-media': UUICardMediaElement;
  }
}

export * from './card-media.element.js';
export { UUICardMediaElement as default } from './card-media.element.js';
