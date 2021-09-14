import { LitElement, html, css } from 'lit';

/**
 *  @element uui-dialog
 *  @slot - for dialog contents
 *  @slot - for dialog actions
 *  @description - All-round dialog
 */
export class UUIDialogElement extends LitElement {
  static styles = [
    css`
      :host {
        position: relative;
        display: block;
        max-width: 400px;

        padding: var(--uui-size-large) var(--uui-size-xlarge);

        background-color: var(
          --uui-dialog-background-color,
          var(--uui-interface-surface)
        );
        box-shadow: var(--uui-dialog-box-shadow, var(--uui-shadow-depth-5));
        border-radius: var(
          --uui-dialog-border-radius,
          calc(var(--uui-size-border-radius) * 2)
        );
      }

      .actions {
        margin-top: var(--uui-size-medium);
        display: flex;
        justify-content: flex-end;
      }

      ::slotted([slot='actions']) {
        margin-left: var(--uui-size-small);
      }
    `,
  ];

  render() {
    return html`
      <slot></slot>
      <div class="actions"><slot name="actions"></slot></div>
    `;
  }
}
