import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { UUIModalElement } from './uui-modal.element';

@customElement('uui-modal-dialog')
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
      dialog {
        margin: auto;
        max-width: 100%;
        max-height: 100%;
        border-radius: 12px;
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
