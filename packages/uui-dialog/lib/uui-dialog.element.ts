import { LitElement, html, css } from 'lit';
import {LocalTypography} from '@umbraco-ui/uui-css/lib/local-typography';

/**
 *  @element uui-dialog
 *  @slot - for dialog contents
 *  @slot - for dialog actions
 *  @description - All-round dialog
 */
export class UUIDialogElement extends LitElement {

  static styles = [LocalTypography,
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

      ::slotted([slot='actions']) {
        margin-left: var(--uui-size-4);
      }
    `,
  ];

  render() {

    return html`
      <h4>Publish with descendants?</h4>
      <p>
        Publish <b>This example</b> and all content items underneath and thereby
        making their content publicly available.
      </p>
      <uui-button
        slot="actions"
        look="secondary"
        style="margin-right: auto; margin-left: 0"
        >Cancel</uui-button
      >
      <uui-button slot="actions">Save</uui-button>
      <uui-button slot="actions" look="positive">Publish</uui-button>
      <h1>The original stuff:</h1>
      <slot></slot>
      <div class="actions"><slot name="actions"></slot></div>
    `;
  }
}
