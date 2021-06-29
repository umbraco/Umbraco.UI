import { LitElement, css, html } from 'lit';

export class UUITableHeadElement extends LitElement {
  static styles = [
    css`
      :host {
        display: table-header-group;
        font-weight: bold;
      }

      ::slotted(uui-table-cell) {
        border-top: none;
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}
