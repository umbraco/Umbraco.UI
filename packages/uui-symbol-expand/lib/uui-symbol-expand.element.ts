import { LitElement, html, css } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property } from 'lit/decorators.js';

/**
 *  A symbol indicating weather related composition is expanded or collapsed
 *  @element uui-symbol-expand
 *  @property open - Set this boolean to true for a open/expanded look.
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
      }

      :host([open]) svg {
        transform: rotate(0deg);
      }
    `,
  ];

  /**
   * Turns the arrow around.
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public open = false;

  render() {
    return html`<svg viewBox="0 0 512 512">
      <path d="M 255.125 400.35 L 88.193 188.765 H 422.055 Z"></path>
    </svg>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-symbol-expand': UUISymbolExpandElement;
  }
}
