import { css, html } from 'lit';
import { UUIModalElement } from './modal.element';
export class UUIModalDialogElement extends UUIModalElement {
  render() {
    return html`
      <dialog>
        <slot></slot>
      </dialog>
    `;
  }

  static override readonly styles = [
    ...UUIModalElement.styles,
    css`
      :host {
        outline: none;
        --uui-modal-dialog-background: var(--uui-color-surface);
      }
      dialog {
        margin: auto;
        max-width: 100%;
        max-height: 100%;
        border-radius: var(
          --uui-modal-dialog-border-radius,
          var(--uui-border-radius-3)
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
