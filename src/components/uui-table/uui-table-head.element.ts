import { LitElement, css, html } from 'lit';

export class UUITableHeadElement extends LitElement {
  static styles = [
    css`
      :host {
        display: table-header-group;
        font-weight: bold;
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}
