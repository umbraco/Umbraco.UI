import { defineElement } from '../../internal/registration/index.js';
import { UUIIconRegistryEssentialElement } from './icon-registry-essential.element.js';

defineElement('uui-icon-registry-essential', UUIIconRegistryEssentialElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-icon-registry-essential': UUIIconRegistryEssentialElement;
  }
}

export * from './icon-registry-essential.element.js';
export * from './UUIIconRegistryEssential.js';
export { UUIIconRegistryEssentialElement as default } from './icon-registry-essential.element.js';
