import { LitElement, html, css } from 'lit-element';

export class UUIPaginationElement extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-block;
        background-color: red;
      }
    `,
  ];

  render() {
    return html`Hello world <uui-pagination-button></uui-pagination-button>`;
  }
}
