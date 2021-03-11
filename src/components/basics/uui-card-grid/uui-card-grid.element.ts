import { LitElement, html, css } from 'lit-element';
/**
 *  @element uui-card-grid
 *
 */

export class UUICardGridElement extends LitElement {
  static styles = [
    css`
      :host {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        grid-column-gap: 6px;
        grid-row-gap: 6px;
        place-items: stretch;
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}
