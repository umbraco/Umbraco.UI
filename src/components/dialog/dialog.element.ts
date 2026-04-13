import { css, html, LitElement } from 'lit';

/**
 *  @element uui-dialog
 *  @slot - The slot for dialog content
 *  @description - All-round dialog
 */
export class UUIDialogElement extends LitElement {
  render() {
    return html`<slot></slot>`;
  }

  static override readonly styles = [
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
          var(--uui-border-radius-3)
        );
      }
    `,
  ];
}
