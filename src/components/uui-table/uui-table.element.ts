import { css, html, LitElement } from 'lit';

export class UUITableElement extends LitElement {
  static styles = [
    css`
      :host {
        display: table;
        border: 1px solid red;
        border-collapse: collapse;
        border-spacing: 5px;
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}
