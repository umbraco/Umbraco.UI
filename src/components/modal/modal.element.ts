import { LitElement, css } from 'lit';
import { property, query } from 'lit/decorators.js';

export const UUIModalOpenEvent = 'uui:modal-open';
export const UUIModalCloseEvent = 'uui:modal-close';
export const UUIModalCloseEndEvent = 'uui:modal-close-end';

export class UUIModalElement extends LitElement {
  @query('[popover]')
  protected readonly _popoverElement?: HTMLElement;

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
    this._popoverElement?.showPopover();
    if (!this._popoverElement?.hasAttribute('tabindex')) {
      this._popoverElement?.setAttribute('tabindex', '-1');
    }
    document.addEventListener('keydown', this._onKeydown);
    document.addEventListener('focus', this._onFocusTrap, true);
  }

  public forceClose() {
    this.isClosing = true;
    this.isOpen = false;
    this._popoverElement?.hidePopover();
    document.removeEventListener('keydown', this._onKeydown);
    document.removeEventListener('focus', this._onFocusTrap, true);

    this.dispatchEvent(new CustomEvent('close-end'));
    this.dispatchEvent(new CustomEvent(UUIModalCloseEndEvent));

    this.remove();
  }

  private _onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.index === 0) {
      this.close();
    }
  };

  private _onFocusTrap = (e: FocusEvent) => {
    if (this.index !== 0) return;
    if (!this._popoverElement?.contains(e.target as Node)) {
      this._popoverElement?.focus();
    }
  };

  static override readonly styles = [
    css`
      [popover] {
        position: fixed;
        inset: 0;
        display: block;
        margin: 0;
        padding: 0;
        max-width: unset;
        max-height: unset;
        border: none;
        background: none;
        color: var(--uui-color-text);
      }
      [popover]::after {
        content: '';
        position: absolute;
        inset: 0;
        background-color: var(--uui-modal-color-backdrop, rgba(0, 0, 0, 0.5));
        pointer-events: none;
        opacity: 1;
        transition: opacity var(--uui-modal-transition-duration, 250ms);
        z-index: 1;
      }
      :host([index='0']) [popover]::after {
        opacity: 0;
      }
    `,
  ];
}
