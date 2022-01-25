import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { UUIIconRegistry } from './UUIIconRegistry';

/**
 * @element uui-icon-registry
 * @description - Icon Registry component delivers icons for any child of this component.
 * The UUIIconRegistryElement holds an empty registry of which icons can be added to.
 * @see UUIIconRegistryEssentialElement for a registry of the most essential icons.
 */
export class UUIIconRegistryElement extends LitElement {
  /**
   * Provide a Dictionary/Record/Object where key is the icon name and the value is the SVGs to define in the icon registry.
   */
  @property({ attribute: false })
  private _icons: Record<string, string> = {};
  get icons() {
    return this._icons;
  }
  set icons(icons) {
    this._icons = icons;
    if (this._registry) {
      this.defineIconsInRegistry();
    }
  }

  private defineIconsInRegistry() {
    Object.entries(this._icons).forEach(([key, value]) =>
      this._registry.defineIcon(key, value)
    );
  }

  private _registry: UUIIconRegistry = new UUIIconRegistry();

  public get registry(): UUIIconRegistry {
    return this._registry;
  }
  public set registry(newRegistry: UUIIconRegistry) {
    if (this.shadowRoot) {
      if (this.registry) {
        this.registry.detach(this);
      }
      newRegistry.attach(this);
    }
    this._registry = newRegistry;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.registry.attach(this);
  }
  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.registry.detach(this);
  }

  render() {
    return html`<slot></slot>`;
  }
}
