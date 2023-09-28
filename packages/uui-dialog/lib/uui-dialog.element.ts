import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';

/**
 *  @element uui-dialog
 *  @slot - The slot for dialog content
 *  @description - All-round dialog
 */
@defineElement('uui-dialog')
export class UUIDialogElement extends LitElement {
  static styles = [
    css`
      :host {
        position: relative;
        display: block;
        max-width: 580px;
        color: var(--uui-color-text);

        background-color: var(
          --uui-dialog-background-color,
          var(--uui-color-surface)
        );

        box-shadow: var(--uui-shadow-depth-5);
        border-radius: var(
          --uui-dialog-border-radius,
          calc(var(--uui-border-radius) * 2)
        );
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-dialog': UUIDialogElement;
  }
}
