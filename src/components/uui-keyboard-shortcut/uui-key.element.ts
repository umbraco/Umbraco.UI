import { css, html, LitElement } from 'lit';

export class UUIKeyElement extends LitElement {
  static styles = [
    css`
      :host {
        background: var(--uui-interface-surface, #fff);
        border: 1px solid var(--uui-interface-border, #d8d7d9);
        color: #515054;
        font-family: inherit;
        font-size: var(--uui-size-small, 12px);
        border-radius: 5px;
        margin: 0px 5px;
        padding: 1px 7px;
        box-sizing: border-box;
        user-select: none;
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}
