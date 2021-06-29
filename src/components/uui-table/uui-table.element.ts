import { css, html, LitElement } from 'lit';

export class UUITableElement extends LitElement {
  static styles = [
    css`
      :host {
        display: table;
        width: 100%;
        font-size: 14px;
        box-shadow: 0 1px 1px 0 rgb(0 0 0 / 16%);
        border-radius: 3px;
        background-color: var(--uui-interface-surface);
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}
