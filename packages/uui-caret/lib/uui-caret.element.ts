import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

/**
 *  A caret that rotates on click. Color will be `currentColor`
 *  @element uui-caret
 */
export class UUICaretElement extends LitElement {
  // HELLO TEST
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
        transition: transform 280ms cubic-bezier(0.17, -0.88, 0.82, 1.84); /* Julia's beloved easing */
      }
    `,
  ];

  /**
   * Sets the rotation of the arrow in degrees. By default arrow points down.
   * @type {number}
   * @default 0
   */
  @property({ type: Number, reflect: true })
  public rotation = 0;

  private getRotation() {
    return { transform: `rotate(${this.rotation}deg)` };
  }

  render() {
    return html`<svg
      viewBox="0 0 512 512"
      style=${styleMap(this.getRotation())}>
      <path d="M 255.125 400.35 L 88.193 188.765 H 422.055 Z"></path>
    </svg>`;
  }
}
