import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import {
  InterfaceLookDefaultValue,
  InterfaceLookType,
} from '@umbraco-ui/uui-base/lib/types';
import { UUIConfirmDialogEvent } from './UUIConfirmDialogEvent';

/**
 *  @element uui-confirm-dialog
 *  @fires {UUIConfirmDialogEvent} confirm - fires when the confirm-button is clicked
 *  @fires {UUIConfirmDialogEvent} reject - fires when the reject-button is clicked
 *  @slot - Confirm dialog description
 *  @description - Confirm-dialog
 */
export class UUIConfirmDialogElement extends LitElement {
  @property({ type: String })
  title!: string;

  @property({ type: String })
  submitLabel = 'Confirm';

  @property({ type: String })
  cancelLabel = 'Cancel';

  @property({ reflect: true })
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
            )}>
          ${this.cancelLabel}
        </uui-button>
        <uui-button
          slot="actions"
          .look=${this.look}
          @click=${() =>
            this.dispatchEvent(
              new UUIConfirmDialogEvent(UUIConfirmDialogEvent.SUBMIT, this)
            )}>
          ${this.submitLabel}
        </uui-button>
      </uui-dialog>
    `;
  }
}
