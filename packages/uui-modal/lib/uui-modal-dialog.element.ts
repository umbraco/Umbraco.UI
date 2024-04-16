import { css, html } from 'lit';
import { UUIModalElement } from './uui-modal.element';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';

@defineElement('uui-modal-dialog')
export class UUIModalDialogElement extends UUIModalElement {
  render() {
    return html`
      <dialog>
        <slot></slot>
      </dialog>
    `;
  }

  static styles = [
    ...UUIModalElement.styles,
    css`
      :host {
        --uui-modal-dialog-background: var(--uui-color-surface);
      }
      dialog {
        margin: auto;
        max-width: 100%;
        max-height: 100%;
        border-radius: var(
          --uui-modal-dialog-border-radius,
          calc(var(--uui-border-radius) * 4)
        );
        background: var(
          --uui-modal-dialog-background,
          var(--uui-color-surface)
        );
      }
      :host([index='0']) dialog {
        box-shadow: var(--uui-shadow-depth-5);
      }
      :host(:not([index='0'])) dialog {
        outline: 1px solid rgba(0, 0, 0, 0.1);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-modal-dialog': UUIModalDialogElement;
  }
}
