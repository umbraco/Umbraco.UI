import { css, html, LitElement } from 'lit';

export class UUIKeyboardShortcutElement extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        align-items: center;
        font-family: inherit;
        font-size: var(--uui-size-small, 12px);
        line-height: 20px;
      }

      ::slotted(*:first-child)uui-key {
        margin-left: 0px;
      }

      ::slotted(*:last-child)uui-key {
        margin-right: 0px;
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}
