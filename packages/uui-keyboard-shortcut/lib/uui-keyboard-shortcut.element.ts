import { css, html, LitElement } from 'lit';

/**
 *  A visual representation of a keyboard shortcut.
 *  @element uui-keyboard-shortcut
 *  @slot - for `<uui-key></uui-key>` elements
 */
export class UUIKeyboardShortcutElement extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-block;
        font-family: inherit;
        font-size: var(--uui-size-small);
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
