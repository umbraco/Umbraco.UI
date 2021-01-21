import { LitElement, html, css, property } from 'lit-element';
import { Size } from '../../../type/Size';
import {
  SymbolicColor,
  SymbolicColorDefaultValue,
} from '../../../type/SymbolicColor';

/**
 *  @element uui-icon
 *
 */

export class UUIIconElement extends LitElement {
  static styles = [
    css`
      :host {
        --uui-icon-base-size: 24px;
        display: inline-block;
        width: 16px;
        margin: 5px;
      }

      :host([size='xxs']) {
        width: calc(0.3 * var(--uui-icon-base-size));
      }

      :host([size='xs']) {
        width: calc(0.6 * var(--uui-icon-base-size));
      }

      :host([size='s']) {
        width: var(--uui-icon-base-size);
      }

      :host([size='m']) {
        width: calc(1.5 * var(--uui-icon-base-size));
      }

      :host([size='l']) {
        width: calc(2 * var(--uui-icon-base-size));
      }

      :host([size='xl']) {
        width: calc(2.5 * var(--uui-icon-base-size));
      }

      ::slotted(svg) {
        fill: var(--uui-color-identity);
      }
    `,
  ];

  @property({ reflect: true })
  size: Size = 'm';

  @property()
  color: SymbolicColor | null = null;

  render() {
    return html` <slot></slot> `;
  }
}
