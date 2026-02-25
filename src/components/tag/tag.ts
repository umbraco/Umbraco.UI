import { defineElement } from '../../internal/registration/index.js';
import { UUITagElement } from './tag.element.js';

export * from './tag.element.js';

export default UUITagElement;

defineElement('uui-tag', UUITagElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-tag': UUITagElement;
  }
}
