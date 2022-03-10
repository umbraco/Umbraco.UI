import { LitElement, css, html } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property } from 'lit/decorators.js';

/**
 *  A caret that rotates on click. Color will be `currentColor`
 *  @element uui-caret
 */
@defineElement('uui-caret')
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
        transition: transform 280ms cubic-bezier(0.17, -0.88, 0.82, 1.84); /* Julia's beloved easing */
      }

      :host([open]) svg {
        transform: rotate(180deg);
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

  constructor() {
    super();
    console.error(
      '´uui-caret´ is deprecated, please use ´uui-symbol-expand´ or ´uui-symbol-sort´'
    );
  }

  render() {
    return html`<svg viewBox="0 0 512 512">
      <path d="M 255.125 400.35 L 88.193 188.765 H 422.055 Z"></path>
    </svg>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-caret': UUICaretElement;
  }
}
