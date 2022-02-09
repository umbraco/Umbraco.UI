import { LitElement, html, css } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';

/**
 *  @element uui-scroll-container
 *  @slot - for content
 *  @description - Component for displaying a larger amount of .
 */
@defineElement('uui-scroll-container')
export class UUIScrollContainerElement extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        scrollbar-width: thin;
        scrollbar-color: var(--uui-interface-contrast-disabled)
          var(--uui-interface-background-alt);
        overflow-y: scroll;
      }

      /*
      :host(:focus) {
        outline-width: thin;
        outline-color: var(--uui-interface-border);
      }
      */

      :host::-webkit-scrollbar {
        width: 6px;
        height: 6px; /* needed for horizontal scrollbar */
      }

      :host::-webkit-scrollbar-track {
        background: var(--uui-interface-background-alt);
        border-radius: 3px;
      }
      :host::-webkit-scrollbar-thumb {
        background-color: var(--uui-interface-contrast-disabled);
        border-radius: 3px;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('tabindex', '0');
  }
  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-scroll-container': UUIScrollContainerElement;
  }
}
