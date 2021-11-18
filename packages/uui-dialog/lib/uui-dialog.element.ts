import { LitElement, html, css } from 'lit';
import { LocalTypography } from '@umbraco-ui/uui-css/lib/local-typography';

/**
 *  @element uui-dialog
 *  @slot - for dialog contents
 *  @slot - for dialog actions
 *  @description - All-round dialog
 */
export class UUIDialogElement extends LitElement {
  static styles = [
    LocalTypography,
    css`
      :host {
        position: relative;
        display: block;
        max-width: 400px;

        padding: var(--uui-size-10) var(--uui-size-14);

        background-color: var(
          --uui-dialog-background-color,
          var(--uui-interface-surface)
        );
        box-shadow: var(--uui-dialog-box-shadow, var(--uui-shadow-depth-5));
        border-radius: var(
          --uui-dialog-border-radius,
          calc(var(--uui-border-radius) * 2)
        );
      }

      .actions {
        margin-top: var(--uui-size-8);
        display: flex;
        justify-content: flex-end;
      }

      ::slotted([slot='actions']),
      .actions > * {
        margin-left: var(--uui-size-4);
      }
    `,
  ];

  protected renderContent() {
    return html`<slot></slot>`;
  }
  protected renderActions() {
    return html`<slot name="actions"></slot>`;
  }

  render() {
    return html`
      ${this.renderContent()}
      <div class="actions">${this.renderActions()}</div>
    `;
  }
}
