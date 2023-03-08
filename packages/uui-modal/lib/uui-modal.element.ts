import { LitElement, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

@customElement('uui-modal')
export class UUIModalElement extends LitElement {
  @query('dialog')
  protected _dialogElement?: HTMLDialogElement;

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: Boolean, reflect: true })
  closing = false;

  @property({ type: Number, reflect: true })
  index = 0;

  @property({ type: Number, reflect: true, attribute: 'unique-index' })
  uniqueIndex = 0;

  private _transitionDuration = 250;

  @property()
  public get transitionDuration() {
    return this._transitionDuration;
  }
  public set transitionDuration(value) {
    this._transitionDuration = value;
    this.style.setProperty(
      '--uui-modal-transition-duration',
      this._transitionDuration + 'ms'
    );
  }

  protected firstUpdated(
    _changedProperties: Map<string | number | symbol, unknown>
  ): void {
    super.firstUpdated(_changedProperties);

    this.#onOpen();
  }

  openModal() {
    this.open = true;
    this._dialogElement?.showModal();
    this._dialogElement?.addEventListener('cancel', this.#onClose);
  }

  closeModal() {
    this.closing = true;
    this.open = false;
    this._dialogElement?.close();
    this.remove();
  }

  #onOpen = () => {
    const openEvent = new CustomEvent('open', {
      bubbles: true,
      cancelable: true,
    });

    this.dispatchEvent(openEvent);
    if (openEvent.defaultPrevented) return;

    this.openModal();
  };

  #onClose = (event: Event) => {
    event.preventDefault();

    const closeEvent = new CustomEvent('close', {
      bubbles: true,
      cancelable: true,
    });
    this.dispatchEvent(closeEvent);

    if (closeEvent.defaultPrevented) return;

    this.closeModal();
  };

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
        background-color: var(--uui-modal-color-backdrop, rgba(0, 0, 0, 0.5));
        pointer-events: none;
        opacity: 1;
        transition: opacity var(--uui-modal-transition-duration, 250ms);
      }
      :host([index='0']) dialog::after {
        opacity: 0;
      }
    `,
  ];
}
