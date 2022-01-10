import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { UUIIconRequestEvent } from '@umbraco-ui/uui-icon/lib/UUIIconRequestEvent';
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
    if (this.registry) {
      this.defineIconsInRegistry();
    }
  }

  private defineIconsInRegistry() {
    Object.entries(this._icons).forEach(([key, value]) =>
      this.registry.defineIcon(key, value)
    );
  }

  public registry!: UUIIconRegistry;

  constructor() {
    super();
    this.addEventListener(
      UUIIconRequestEvent.ICON_REQUEST,
      this.onIconRequest as EventListener
    );
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.registry = this.registry || new UUIIconRegistry();
    this.defineIconsInRegistry();
  }

  private onIconRequest = (event: UUIIconRequestEvent) => {
    const icon = this.registry.getIcon(event.detail.iconName);
    if (icon !== null) {
      event.acceptRequest(icon);
    }
  };

  render() {
    return html`<slot></slot>`;
  }
}
