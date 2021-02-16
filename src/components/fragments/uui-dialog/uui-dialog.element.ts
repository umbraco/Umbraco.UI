import { LitElement, html, css } from 'lit-element';

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

        padding: calc(var(--uui-size-base-unit) * 5)
          calc(var(--uui-size-base-unit) * 6);

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
        margin-top: calc(var(--uui-size-base-unit) * 3);
        display: flex;
        justify-content: flex-end;
      }
      ::slotted([slot='actions']) {
        margin-left: calc(var(--uui-size-base-unit) * 3);
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
