import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

export class UUICaretElement extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-block;
        width: 12px;
        vertical-align: middle;
      }

      svg {
        fill: currentColor;
        transform-origin: 50% 50%;
        transition: transform 320ms cubic-bezier(0.17, -0.88, 0.82, 1.84); /* Julia's beloved easing */
      }

      :host([open]) svg {
        transform: rotate(180deg);
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  public open = false;

  render() {
    return html`<svg viewBox="0 0 512 512">
      <path d="M 255.125 400.35 L 88.193 188.765 H 422.055 Z"></path>
    </svg>`;
  }
}
