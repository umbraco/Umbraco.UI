import { css, html, LitElement } from 'lit';

export class UUIKeyboardShortcutElement extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-flex;
        align-items: center;
        font-family: inherit;
        font-size: var(--uui-size-small, 12px);
        line-height: 20px;
      }

      ::slotted(*:first-child) {
        margin-left: 0px;
      }

      ::slotted(*:last-child) {
        margin-right: 0px;
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}
