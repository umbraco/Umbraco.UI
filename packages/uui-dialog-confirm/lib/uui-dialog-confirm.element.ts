import { html } from 'lit';
import { property } from 'lit/decorators.js';
import {
  InterfaceLookDefaultValue,
  InterfaceLookType,
} from '@umbraco-ui/uui-base/lib/types';
import { UUIDialogConfirmEvent } from './UUIDialogConfirmEvent';
import {UUIDialogElement} from '@umbraco-ui/uui-dialog/lib/uui-dialog.element';

/**
 *  @element uui-confirm-dialog
 *  @fires {UUIDialogConfirmEvent} confirm - fires when the confirm-button is clicked
 *  @fires {UUIDialogConfirmEvent} reject - fires when the reject-button is clicked
 *  @slot - Confirm dialog description
 *  @description - Confirm-dialog
 */
export class UUIDialogConfirmElement extends UUIDialogElement {

  static styles = UUIDialogElement.styles;

  @property({ type: String })
  title!: string;

  @property({ type: String })
  submitLabel = 'Confirm';

  @property({ type: String })
  cancelLabel = 'Cancel';

  @property({ reflect: true })
  look: InterfaceLookType = InterfaceLookDefaultValue;


  protected renderContent() {
    return html`
      <h4>${this.title}</h4>
      <slot></slot>
    `;
  }

  protected renderActions() {
    return html`<slot name="actions"></slot>
    <uui-button
      slot="actions"
      @click=${() =>
        this.dispatchEvent(
          new UUIDialogConfirmEvent(UUIDialogConfirmEvent.CANCEL, this)
        )}>
      ${this.cancelLabel}
    </uui-button>
    <uui-button
      slot="actions"
      .look=${this.look}
      @click=${() =>
        this.dispatchEvent(
          new UUIDialogConfirmEvent(UUIDialogConfirmEvent.SUBMIT, this)
        )}>
      ${this.submitLabel}
    </uui-button>`;
  }
}
