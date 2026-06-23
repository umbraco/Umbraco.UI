import { defineElement } from '../../internal/registration/index.js';
import { UUILoaderBarElement } from './loader-bar.element.js';

defineElement('uui-loader-bar', UUILoaderBarElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-loader-bar': UUILoaderBarElement;
  }
}

export * from './loader-bar.element.js';
export { UUILoaderBarElement as default } from './loader-bar.element.js';
