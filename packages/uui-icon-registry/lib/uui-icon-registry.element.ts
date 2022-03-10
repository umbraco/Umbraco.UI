import { LitElement, html } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property } from 'lit/decorators.js';
import { UUIIconRegistry } from './UUIIconRegistry';

/**
 * @element uui-icon-registry
 * @description - Icon Registry component delivers icons for any child of this component.
 * The UUIIconRegistryElement holds an empty registry of which icons can be added to.
 * @see UUIIconRegistryEssentialElement for a registry of the most essential icons.
 */
@defineElement('uui-icon-registry')
export class UUIIconRegistryElement extends LitElement {
  /**
   * Provide a Dictionary/Record/Object where key is the icon name and the value is the SVGs to define in the icon registry.
   * @type {Record<string, string>}
   * @default {}
   */
  @property({ attribute: false })
  private _icons: Record<string, string> = {};
  get icons() {
    return this._icons;
  }
  set icons(icons) {
    this._icons = icons;
    if (this._registry) {
      Object.entries(this._icons).forEach(([key, value]) =>
        this._registry.defineIcon(key, value)
      );
    }
  }

  private _registry: UUIIconRegistry = new UUIIconRegistry();

  public get registry(): UUIIconRegistry {
    return this._registry;
  }
  public set registry(newRegistry: UUIIconRegistry) {
    if (this.registry) {
      this.registry.detach(this);
    }
    newRegistry.attach(this);
    this._registry = newRegistry;
  }

  constructor() {
    super();
    this._registry.attach(this);
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-icon-registry': UUIIconRegistryElement;
  }
}
