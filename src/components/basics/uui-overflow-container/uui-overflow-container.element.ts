import { LitElement, html, css } from 'lit';

/**
 *  @element uui-overflow-container
 *  @slot - for content
 */
export class UUIOverflowContainer extends LitElement {
  static styles = [
    css`
      :host {
        --uui-overflow-container-height: 180px;
      }

      :host {
        display: block;
        scrollbar-width: thin;
        scrollbar-color: var(--uui-interface-contrast-disabled)
          var(--uui-interface-background-alt);
        overflow-y: scroll;
        max-height: var(--uui-overflow-container-height);
      }

      :host::-webkit-scrollbar {
        width: 5px;
      }

      :host::-webkit-scrollbar-track {
        background: var(--uui-interface-background-alt);
        border-radius: 12px;
      }
      :host::-webkit-scrollbar-thumb {
        background-color: var(--uui-interface-contrast-disabled);
        border-radius: 12px;
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}
