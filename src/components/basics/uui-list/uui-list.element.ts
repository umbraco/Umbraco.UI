import { LitElement, html, css, property } from 'lit-element';

/**
 *  @element uui-list
 *  @slot  for list items
 *
 */

export class UUIListElement extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        color: red;
      }

      ::slotted(*) {
        margin: 0.5em 0;
      }

      :host([dense]) ::slotted(*) {
        margin: 0.2em 0;
      }
    `,
  ];

  @property({ type: Boolean })
  dense = false;

  render() {
    return html` <slot></slot> `;
  }
}
