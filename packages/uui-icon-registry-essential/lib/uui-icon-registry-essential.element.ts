import { UUIIconRegistryElement } from '@umbraco-ui/uui-icon-registry/lib/uui-icon-registry.element';
import { UUIIconRegistryEssential } from './UUIIconRegistryEssential';

/**
 * @element uui-icon-registry-essential
 */
export class UUIIconRegistryEssentialElement extends UUIIconRegistryElement {
  constructor() {
    super(new UUIIconRegistryEssential());
  }
}
