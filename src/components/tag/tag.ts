import { defineElement } from '../../internal/registration/index.js';
import { UUITagElement } from './tag.element.js';

defineElement('uui-tag', UUITagElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-tag': UUITagElement;
  }
}

export * from './tag.element.js';
export { UUITagElement as default } from './tag.element.js';
