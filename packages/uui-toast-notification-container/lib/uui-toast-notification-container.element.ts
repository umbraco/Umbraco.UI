import { LitElement, html, css } from 'lit';
import { UUIToastNotificationElement } from '@umbraco-ui/uui-toast-notification/lib/uui-toast-notification.element';
import { UUIToastNotificationEvent } from '@umbraco-ui/uui-toast-notification/lib/UUIToastNotificationEvent';
import { property } from 'lit/decorators.js';

/**
 * @element uui-toast-notification-container
 */
export class UUIToastNotificationContainerElement extends LitElement {
  static styles = [
    css`
      :host {
        position: absolute;
        overflow: hidden;
        max-width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: end;

        pointer-events: none;
      }

      :host([bottom-up]) {
        justify-content: end;
      }

      :host() > * {
        padding: var(--uui-size-layout-2);
      }
    `,
  ];

  /**
   * Set an auto-close timer, the timer will be paused on mouse-hover.
   * @type string
   * @attr
   * @default ""
   */
  @property({ type: Number, reflect: true, attribute: 'auto-close' })
  private _autoClose: number | null = null;
  public get autoClose(): number | null {
    return this._autoClose;
  }
  public set autoClose(value: number | null) {
    this._autoClose = value;
  }

  private _autoClosePause = false;
  private _onInteractionEnter = () => {
    this._autoClosePause = true;
    this._toasts?.forEach(el => el.pauseAutoClose());
  };
  private _onInteractionLeave = () => {
    // Only reset autoClose if we have it and if one of the children does not have focus.
    if (
      this._autoClose &&
      this.matches(':focus-within:not(:focus)') === false
    ) {
      this._autoClosePause = false;
      this._toasts?.forEach(el => el.resumeAutoClose());
    }
  };

  public removeToast(toast?: UUIToastNotificationElement) {
    if (!toast) {
      toast = this._toasts[this._toasts.length - 1];
    } else if (this._toasts.indexOf(toast) === -1) {
      console.warn(
        'Toast-notification',
        toast,
        'could not be removed as it is not a child of this toast-notification-container',
        this
      );
      return;
    }
    toast.removeEventListener(
      UUIToastNotificationEvent.CLOSED,
      this.onToastClosed as any
    );

    toast.removeEventListener('mouseover', this._onInteractionEnter);
    toast.removeEventListener('mouseout', this._onInteractionLeave);
    toast.removeEventListener('focus', this._onInteractionEnter);
    toast.removeEventListener('blur', this._onInteractionLeave);

    this.removeChild(toast);
  }
  public closeToast(modal?: UUIToastNotificationElement) {
    let _modal = modal;
    if (!_modal) {
      _modal = this._toasts[this._toasts.length - 1];
    }
    _modal.open = false;
  }

  private onToastClosed = (e: UUIToastNotificationEvent) => {
    this.removeToast(e.target);
  };

  private _toasts: UUIToastNotificationElement[] = [];

  private onSlotChanged = (event: any) => {
    const existingModals = [...this._toasts];

    this._toasts = event.target
      .assignedElements({ flatten: true })
      .filter(
        (e: Node) => e instanceof UUIToastNotificationElement
      ) as UUIToastNotificationElement[];

    const newToasts = this._toasts.filter(
      modal => existingModals.indexOf(modal) === -1
    );
    newToasts.forEach(toast => {
      toast.addEventListener(
        UUIToastNotificationEvent.CLOSED,
        this.onToastClosed as any
      );

      toast.addEventListener('mouseover', this._onInteractionEnter);
      toast.addEventListener('mouseout', this._onInteractionLeave);
      toast.addEventListener('focus', this._onInteractionEnter);
      toast.addEventListener('blur', this._onInteractionLeave);

      if (this._autoClose && this._autoClosePause === false) {
        toast.autoClose = this._autoClose;
      }
      toast.open = true;
    });
  };

  render() {
    return html` <slot @slotchange=${this.onSlotChanged}></slot> `;
  }
}
