import { defineElement } from '../../internal/registration/index.js';
import { UUILoaderBarElement } from './loader-bar.element.js';

export * from './loader-bar.element.js';

defineElement('uui-loader-bar', UUILoaderBarElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-loader-bar': UUILoaderBarElement;
  }
}
