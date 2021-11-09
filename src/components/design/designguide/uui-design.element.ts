import { LitElement, html, css } from 'lit';

/**
 *  @element uui-design
 *  @description - Showing how to make spacing and typography come together.
 */
export class UUIDesignElement extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        padding: var(--uui-size-28) var(--uui-size-36);
        max-width: 800px;
      }
    `,
  ];

  render() {
    return html` <slot></slot> `;
  }
}
