import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';

/**
 *  A visual representation of a key on you keyboard. use inside `<uui-keyboard-shortcut></uui-keyboard-shortcut>`
 *  @element uui-key
 *  @slot - for the key name. Anything you put in here will be lowercase.
 */
@defineElement('uui-key')
export class UUIKeyElement extends LitElement {
  static styles = [
    css`
      :host {
        background: var(--uui-color-surface);
        border: 1px solid var(--uui-color-border);
        font-family: inherit;
        font-size: var(--uui-type-small-size);
        color: var(--uui-color-text);
        border-radius: 5px;
        margin: 0px 5px;
        padding: 5px 7px;
        box-sizing: border-box;
        user-select: none;
        text-transform: lowercase;
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-key': UUIKeyElement;
  }
}
