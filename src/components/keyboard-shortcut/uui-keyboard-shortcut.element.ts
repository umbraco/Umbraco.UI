import { defineElement } from '../../internal/registration';
import { css, html, LitElement } from 'lit';

/**
 *  A visual representation of a keyboard shortcut.
 *  @element uui-keyboard-shortcut
 *  @slot - for `<uui-key></uui-key>` elements
 */
@defineElement('uui-keyboard-shortcut')
export class UUIKeyboardShortcutElement extends LitElement {
  render() {
    return html`<slot></slot>`;
  }

  static styles = [
    css`
      :host {
        display: inline-block;
        font-family: inherit;
        font-size: var(--uui-size-4);
        color: var(--uui-color-text);
      }

      ::slotted(*:first-child)uui-key {
        margin-left: 0px;
      }

      ::slotted(*:last-child)uui-key {
        margin-right: 0px;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-keyboard-shortcut': UUIKeyboardShortcutElement;
  }
}
