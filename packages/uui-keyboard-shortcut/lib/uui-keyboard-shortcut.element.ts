import { css, html, LitElement } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';

/**
 *  A visual representation of a keyboard shortcut.
 *  @element uui-keyboard-shortcut
 *  @slot - for `<uui-key></uui-key>` elements
 */
@defineElement('uui-keyboard-shortcut')
export class UUIKeyboardShortcutElement extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-block;
        font-family: inherit;
        font-size: var(--uui-size-4);
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

declare global {
  interface HTMLElementTagNameMap {
    'uui-keyboard-shortcut': UUIKeyboardShortcutElement;
  }
}
