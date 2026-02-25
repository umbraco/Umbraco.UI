import { defineElement } from '../../internal/registration/index.js';
import { UUIIconRegistryElement } from './icon-registry.element.js';

export * from './icon-registry.element.js';
export * from './UUIIconHost.js';
export * from './UUIIconRegistry.js';

defineElement('uui-icon-registry', UUIIconRegistryElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-icon-registry': UUIIconRegistryElement;
  }
}
