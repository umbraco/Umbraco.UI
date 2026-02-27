import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

/**
 *  A symbol indicating whether related composition is expanded or collapsed
 *  @element uui-symbol-expand
 */
export class UUISymbolExpandElement extends LitElement {
  /**
   * Set this boolean to true for a open/expanded look.
   * @type {boolean}
   * @default false
   * @attr
   */
  @property({ type: Boolean, reflect: true })
  public open = false;

  render() {
    return html`<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round">
      <path d="m4 9 8 8 8-8"></path>
    </svg>`;
  }

  static override readonly styles = [
    css`
      :host {
        display: inline-flex;
        width: 12px;
        vertical-align: middle;
      }

      svg {
        transform: rotate(-90deg);
        transform-origin: 50% 50%;
        transition: transform 100ms cubic-bezier(0.1, 0, 0.9, 1);
        width: 100%;
        height: 100%;
      }

      :host([open]) svg {
        transform: rotate(0deg);
      }
    `,
  ];
}
