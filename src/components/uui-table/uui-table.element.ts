import { css, html, LitElement } from 'lit';

export class UUITableElement extends LitElement {
  static styles = [
    css`
      :host {
        display: table;
        width: 100%;
        box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.1);
        border-radius: var(--uui-size-border-radius);
        background-color: var(--uui-interface-surface);
        user-select: none;
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
