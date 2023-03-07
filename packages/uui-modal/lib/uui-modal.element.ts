import { LitElement, css } from 'lit';
import { customElement, query } from 'lit/decorators.js';

@customElement('uui-modal')
export class UUIModalElement extends LitElement {
  @query('dialog')
  protected _dialogElement?: HTMLDialogElement;

  protected firstUpdated(
    _changedProperties: Map<string | number | symbol, unknown>
  ): void {
    super.firstUpdated(_changedProperties);

    this.#onOpen();
  }

  #onOpen() {
    const openEvent = new CustomEvent('open', {
      bubbles: true,
      composed: true,
      cancelable: true,
    });

    this.dispatchEvent(openEvent);
    if (openEvent.defaultPrevented) return;

    this._dialogElement?.showModal();
    this._dialogElement?.addEventListener('cancel', this.#onClose.bind(this));
  }

  #onClose(event: Event) {
    event.preventDefault();

    const closeEvent = new CustomEvent('close', {
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    this.dispatchEvent(closeEvent);

    if (closeEvent.defaultPrevented) return;

    this._dialogElement?.close();
    this.remove();
  }

  static styles = [
    css`
      dialog {
        display: block;
        margin: 0;
        padding: 0;
        max-width: unset;
        max-height: unset;
        border: none;
      }
      dialog::backdrop {
        background: none;
        opacity: 0;
      }
      dialog::after {
        content: '';
        position: absolute;
        inset: 0;
        background-color: var(--color-backdrop, rgba(0, 0, 0, 0.5));
        pointer-events: none;
        opacity: 1;
        transition: opacity var(--transition-duration, 250ms);
      }
      :host([front]) dialog::after {
        opacity: 0;
      }
    `,
  ];
}
