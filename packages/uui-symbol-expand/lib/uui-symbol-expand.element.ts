import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

/**
 *  A symbol indicating whether related composition is expanded or collapsed
 *  @element uui-symbol-expand
 */
@defineElement('uui-symbol-expand')
export class UUISymbolExpandElement extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-block;
        width: 12px;
        vertical-align: middle;
      }

      svg {
        fill: currentColor;
        transform: rotate(-90deg);
        transform-origin: 50% 50%;
        transition: transform 120ms ease-in-out;
        width: 100%;
        height: 100%;
      }

      :host([open]) svg {
        transform: rotate(0deg);
      }
    `,
  ];

  /**
   * Set this boolean to true for a open/expanded look.
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public open = false;

  render() {
    return html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M 255.125 400.35 L 88.193 188.765 H 422.055 Z"></path>
    </svg>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-symbol-expand': UUISymbolExpandElement;
  }
}
