import { LitElement, html } from 'lit';
import { UUIIconRequestEvent } from '@umbraco-ui/uui-icon/lib/UUIIconRequestEvent';
import { UUIIconRegistry } from './UUIIconRegistry';

/**
 * @element uui-icon-registry
 * @description - Icon Registry component delivers icons for any child of this component.
 * The UUIIconRegistryElement holds an empty registry of which icons can be added to.
 * @see UUIIconRegistryEssentialElement for a registry of the most essential icons.
 */
export class UUIIconRegistryElement extends LitElement {
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
