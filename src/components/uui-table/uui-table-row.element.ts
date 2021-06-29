import { LitElement, css, html } from 'lit';

export class UUITableRowElement extends LitElement {
  static styles = [
    css`
      :host {
        display: table-row;
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}
