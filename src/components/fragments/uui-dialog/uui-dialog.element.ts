import { LitElement, html, css } from 'lit-element';

/**
 *  @element uui-dialog
 *  @slot - for dialog content
 */
export class UUIDialogElement extends LitElement {
  static styles = [
    css`
      :host {
        padding: 20px;
        background-color: grey;
      }

      slot.actions {
        text-align: right;
      }
    `,
  ];

  render() {
    //
    return html`
      <uui-button>Insider</uui-button>
      <slot></slot>
      <slot name="actions" class="actions"></slot>
    `;
  }
}
