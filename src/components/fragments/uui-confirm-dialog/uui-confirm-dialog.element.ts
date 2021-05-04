import { LitElement, html } from 'lit';
import { property } from 'lit/decorators';
import {
  InterfaceLookDefaultValue,
  InterfaceLookType,
} from '../../../type/InterfaceLook';
import { UUIConfirmDialogEvent } from './UUIConfirmDialogEvent';

/**
 *  @element uui-confirm-dialog
 *  @fires {UUIConfirmDialogEvent} confirm - fires when the confirm-button is clicked
 *  @fires {UUIConfirmDialogEvent} reject - fires when the reject-button is clicked
 *  @slot - Confirm dialog description
 *  @description - Confirm-dialog
 */
export class UUIConfirmDialogElement extends LitElement {
  @property({ type: String, attribute: false })
  title!: string;

  @property({ type: String, attribute: false })
  submitLabel = 'Confirm';

  @property({ type: String, attribute: false })
  cancelLabel = 'Cancel';

  @property({ attribute: false })
  look: InterfaceLookType = InterfaceLookDefaultValue;

  render() {
    return html`
      <uui-dialog>
        <h3>${this.title}</h3>
        <slot></slot>
        <uui-button
          slot="actions"
          @click=${() =>
            this.dispatchEvent(
              new UUIConfirmDialogEvent(UUIConfirmDialogEvent.CANCEL, this)
            )}
        >
          ${this.cancelLabel}
        </uui-button>
        <uui-button
          slot="actions"
          .look=${this.look}
          @click=${() =>
            this.dispatchEvent(
              new UUIConfirmDialogEvent(UUIConfirmDialogEvent.SUBMIT, this)
            )}
        >
          ${this.submitLabel}
        </uui-button>
      </uui-dialog>
    `;
  }
}
