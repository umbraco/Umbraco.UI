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
        padding: var(--uui-size-layout-4) var(--uui-size-layout-5);
        max-width: 800px;
      }
    `,
  ];

  render() {
    return html` <slot></slot> `;
  }
}
