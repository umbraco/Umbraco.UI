import { css, html, LitElement } from 'lit';

export class UUITableCellElement extends LitElement {
  static styles = [
    css`
      :host {
        display: table-cell;
        padding: 1em;
        border: 1px solid red;
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}
