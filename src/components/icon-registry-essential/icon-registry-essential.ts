import { defineElement } from '../../internal/registration/index.js';
import { UUIIconRegistryEssentialElement } from './icon-registry-essential.element.js';

export * from './icon-registry-essential.element.js';
export * from './UUIIconRegistryEssential.js';

export default UUIIconRegistryEssentialElement;

defineElement('uui-icon-registry-essential', UUIIconRegistryEssentialElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-icon-registry-essential': UUIIconRegistryEssentialElement;
  }
}
