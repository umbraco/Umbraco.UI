import { UUIIconRegistryElement } from '../icon-registry/icon-registry.element.js';
import { UUIIconRegistryEssential } from './UUIIconRegistryEssential.js';

/**
 * @element uui-icon-registry-essential
 * @description - Essential Icon Registry of Umbraco UI Library. This component delivers essential Umbraco UI icons for any child of this component.
 * @see UUIIconRegistryElement.
 */
export class UUIIconRegistryEssentialElement extends UUIIconRegistryElement {
  constructor() {
    super();
    this.registry = new UUIIconRegistryEssential();
  }
}
