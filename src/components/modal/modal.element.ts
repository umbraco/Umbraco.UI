import { LitElement, css } from 'lit';
import { property, query } from 'lit/decorators.js';

export const UUIModalOpenEvent = 'uui:modal-open';
export const UUIModalCloseEvent = 'uui:modal-close';
export const UUIModalCloseEndEvent = 'uui:modal-close-end';

export class UUIModalElement extends LitElement {
  @query('dialog')
  protected _dialogElement?: HTMLDialogElement;

  @property({ type: Boolean, reflect: true, attribute: 'is-open' })
  isOpen = false;

  @property({ type: Boolean, reflect: true, attribute: 'is-closing' })
  isClosing = false;

  @property({ type: Number, reflect: true })
  index = 0;

  @property({ type: Number, reflect: true, attribute: 'unique-index' })
  uniqueIndex = 0;

  private _transitionDuration = 250;

  @property({ type: Number, attribute: 'transition-duration' })
  public get transitionDuration() {
    return this._transitionDuration;
  }
  public set transitionDuration(value: number) {
    this._transitionDuration = value;
    this.style.setProperty(
      '--uui-modal-transition-duration',
      this._transitionDuration + 'ms',
    );
  }

  protected firstUpdated(
    _changedProperties: Map<string | number | symbol, unknown>,
  ): void {
    super.firstUpdated(_changedProperties);

    if (!this.isClosing) {
      this.open();
    }
  }

  public open = (event?: Event) => {
    event?.preventDefault();
    event?.stopImmediatePropagation();

    const openEvent = new CustomEvent(UUIModalOpenEvent, {
      cancelable: true,
    });
    // TODO: get rid of legacy 'open'-event sometime in the future. [NL]
    const legacyOpenEvent = new CustomEvent('open', {
      cancelable: true,
    });

    this.dispatchEvent(openEvent);
    this.dispatchEvent(legacyOpenEvent);
    if (openEvent.defaultPrevented || legacyOpenEvent.defaultPrevented) return;

    this._openModal();
  };

  public close = (event?: Event) => {
    event?.preventDefault();
    event?.stopImmediatePropagation();

    const closeEvent = new CustomEvent(UUIModalCloseEvent, {
      cancelable: true,
    });
    this.dispatchEvent(closeEvent);

    if (closeEvent.defaultPrevented) return;

    this.forceClose();
  };

  protected _openModal() {
    this.isOpen = true;
    this._dialogElement?.showModal();
    this._dialogElement?.addEventListener('cancel', this.close);
  }

  public forceClose() {
    this.isClosing = true;
    this.isOpen = false;
    this._dialogElement?.close();

    // TODO: get rid of legacy 'close-end'-event sometime in the future. [NL]
    this.dispatchEvent(new CustomEvent('close-end'));
    this.dispatchEvent(new CustomEvent(UUIModalCloseEndEvent));

    this.remove();
  }

  static override readonly styles = [
    css`
      dialog {
        display: block;
        margin: 0;
        padding: 0;
        max-width: unset;
        max-height: unset;
        border: none;
        background: none;
        color: var(--uui-color-text);
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
        z-index: 1;
      }
      :host([index='0']) dialog::after {
        opacity: 0;
      }
    `,
  ];
}
