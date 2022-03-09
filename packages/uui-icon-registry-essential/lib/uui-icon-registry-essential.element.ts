import { UUIIconRegistryElement } from '@umbraco-ui/uui-icon-registry/lib';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';

import { UUIIconRegistryEssential } from './UUIIconRegistryEssential';

/**
 * @element uui-icon-registry-essential
 * @description - Essential Icon Registry of Umbraco UI Library. This component delivers essential Umbraco UI icons for any child of this component.
 * @see UUIIconRegistryElement.
 */
@defineElement('uui-icon-registry-essential')
export class UUIIconRegistryEssentialElement extends UUIIconRegistryElement {
  constructor() {
    super();
    this.registry = new UUIIconRegistryEssential();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-icon-registry-essential': UUIIconRegistryEssentialElement;
  }
}
