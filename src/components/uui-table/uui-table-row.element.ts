import { LitElement, css, html } from 'lit';

export class UUITableRowElement extends LitElement {
  static styles = [
    css`
      :host {
        display: table-row;
        border-top: 1px solid #e9e9eb;
        --column-number: 3;
      }

      ::slotted(uui-table-cell:nth-child(3)) {
        background-color: yellow;
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}
