import { css, html, LitElement } from 'lit';

export class UUITableElement extends LitElement {
  static styles = [
    css`
      :host {
        font-size: 14px;
        box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.1);
        border-radius: 3px;
        background-color: var(--uui-interface-surface);
        user-select: none;
        display: table;
        width: 100%;
        font-family: inherit;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'table');
  }

  render() {
    return html`<slot></slot>`;
  }
}
