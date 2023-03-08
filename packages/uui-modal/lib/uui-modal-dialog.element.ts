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
        box-shadow: 0 0 50px 0px rgba(0, 0, 0, 0.5);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-modal-dialog': UUIModalDialogElement;
  }
}
