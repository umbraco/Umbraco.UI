import { defineElement } from '../../internal/registration/index.js';
import { UUIRefNodePackageElement } from './ref-node-package.element.js';

export * from './ref-node-package.element.js';

defineElement('uui-ref-node-package', UUIRefNodePackageElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-ref-node-package': UUIRefNodePackageElement;
  }
}
