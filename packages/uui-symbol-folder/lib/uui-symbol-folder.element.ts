import { LitElement, html, css } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';

/**
 *  @element uui-folder-symbol
 */

@defineElement('uui-symbol-folder')
export class UUISymbolFolderElement extends LitElement {
  render() {
    return html`<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="0.6"
      stroke-linecap="round"
      stroke-linejoin="round"
      id="icon">
      <path
        d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>`;
  }

  static styles = [
    css`
      :host {
        display: block;
        position: relative;
        box-sizing: border-box;
      }

      #icon {
        width: 100%;
        color: var(--uui-color-border-standalone);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-symbol-folder': UUISymbolFolderElement;
  }
}
