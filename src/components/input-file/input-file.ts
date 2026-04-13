import { defineElement } from '../../internal/registration/index.js';
import { UUIInputFileElement } from './input-file.element.js';

defineElement('uui-input-file', UUIInputFileElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-input-file': UUIInputFileElement;
  }
}

export * from './input-file.element.js';
export { UUIInputFileElement as default } from './input-file.element.js';
