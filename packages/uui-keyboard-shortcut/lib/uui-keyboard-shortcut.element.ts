import { css, html, LitElement } from 'lit';

export class UUIKeyboardShortcutElement extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-block;
        font-family: inherit;
        font-size: var(--uui-size-small, 12px);
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
