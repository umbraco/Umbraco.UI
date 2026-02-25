import { defineElement } from '../../internal/registration/index.js';
import { UUILoaderCircleElement } from './loader-circle.element.js';

export * from './loader-circle.element.js';

export default UUILoaderCircleElement;

defineElement('uui-loader-circle', UUILoaderCircleElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-loader-circle': UUILoaderCircleElement;
  }
}
