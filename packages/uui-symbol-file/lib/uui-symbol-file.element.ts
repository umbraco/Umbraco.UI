import { LitElement, html, css } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property } from 'lit/decorators.js';

/**
 *  @element uui-file-symbol
 */

@defineElement('uui-symbol-file')
export class UUISymbolFileElement extends LitElement {
  static styles = [
    css`
      :host {
        position: relative;
        display: block;
      }

      #file-type {
        position: absolute;
        bottom: 24%;
        left: 25.5%;
        margin-left: calc(var(--uui-size-3) * -1);
        padding: 0px var(--uui-size-3);
        font-weight: 700;
        color: var(--uui-color-gunmetal);
        background-color: var(--uui-color-spanish-pink);
      }

      #icon {
        fill: var(--uui-interface-border);
      }
    `,
  ];

  /**
   * The text that will appear on the file icon
   * @type {string}
   */
  @property({ type: String })
  type = '';

  render() {
    return html`<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="100%"
        id="icon">
        <path
          d="M396.441 138.878l-83.997-83.993-7.331-7.333H105.702v416.701h298.071V146.214l-7.332-7.336zM130.74 439.217V72.591h141.613c37.201 0 19.274 88.18 19.274 88.18s86-20.901 87.104 18.534v259.912H130.74z" />
      </svg>
      ${this.type
        ? html`<span id="file-type">${this.type.toUpperCase()}</span>`
        : ''} `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-symbol-file': UUISymbolFileElement;
  }
}
