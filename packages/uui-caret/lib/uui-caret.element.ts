import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

export class UUICaretElement extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-flex;
        width: 12px;
        vertical-align: middle;
        transform: rotateZ(-90deg);
      }

      svg {
        fill: currentColor;
        transition: transform 100ms ease-out;
      }

      :host([open]) svg {
        transform: rotateZ(90deg);
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  public open = false;

  render() {
    return html`<svg viewBox="0 0 512 512">
      <path d="M255.125 361.35L88.193 149.765h333.862z"></path>
    </svg>`;
  }
}
