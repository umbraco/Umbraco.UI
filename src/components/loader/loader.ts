import { defineElement } from '../../internal/registration/index.js';
import { UUILoaderElement } from './loader.element.js';

export * from './loader.element.js';

defineElement('uui-loader', UUILoaderElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-loader': UUILoaderElement;
  }
}
