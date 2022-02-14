import { LitElement, html, css } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';

/**
 *  @element uui-dialog
 *  @slot for dialog content
 *  @description - All-round dialog
 */
@defineElement('uui-dialog')
export class UUIDialogElement extends LitElement {
  static styles = [
    css`
      :host {
        position: relative;
        display: block;
        max-width: 400px;

        background-color: var(
          --uui-dialog-background-color,
          var(--uui-interface-surface)
        );

        /* TODO: fix automatic fallback values for shadows shadows. var(--uui-shadow-depth-5) */
        box-shadow: var(
          --uui-dialog-box-shadow,
          0 19px 38px rgba(0, 0, 0, 0.3),
          0 15px 12px rgba(0, 0, 0, 0.22)
        );
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
