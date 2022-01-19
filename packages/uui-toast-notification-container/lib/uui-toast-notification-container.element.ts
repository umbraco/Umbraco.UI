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

        pointer-events: none;
        box-sizing: border-box;
      }

      slot {
        display: flex;
        flex-direction: column;
        align-items: end;

        height: 100%;
        box-sizing: border-box;

        padding-top: var(--uui-size-space-1);
        padding-bottom: var(--uui-size-space-1);
      }
      :host([bottom-up]) slot {
        justify-content: end;
      }
      :host([left-align]) slot {
        align-items: start;
      }
    `,
  ];

  /**
   * Set an auto-close timer, the timer will be paused on mouse-hover.
   * @type number | null
   * @attr
   * @default null
   */
  @property({ type: Number, reflect: true, attribute: 'auto-close' })
  private _autoClose: number | null = null;
  public get autoClose(): number | null {
    return this._autoClose;
  }
  public set autoClose(value: number | null) {
    this._autoClose = value;
    this._toasts?.forEach(el => (el.autoClose = value));
  }

  private _autoClosePause = false;

  /**
   * pause all auto close timer, including later coming.
   */
  public pauseAutoClose = () => {
    this._autoClosePause = true;
    this._toasts?.forEach(el => el.pauseAutoClose());
  };
  /**
   * resume the auto close timers.
   */
  public resumeAutoClose = () => {
    // Only reset autoClose if we have it and if one of the children does not have focus.
    if (
      this._autoClose &&
      this.matches(':focus-within:not(:focus)') === false
    ) {
      this._autoClosePause = false;
      this._toasts?.forEach(el => el.resumeAutoClose());
    }
  };

  /**
   * Instantly remove a toast element.
   * @param  {UUIToastNotificationElement} toast The toast element to remove
   */
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
    this.removeChild(toast);
  }

  /**
   * Close a toast element, this will animate out and then be removed.
   * @param  {UUIToastNotificationElement} toast The toast element to close and remove
   */
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
        (e: Node) => e.nodeName === 'UUI-TOAST-NOTIFICATION'
      ) as UUIToastNotificationElement[];

    const oldToasts = existingModals.filter(
      modal => this._toasts.indexOf(modal) === -1
    );
    oldToasts.forEach(toast => {
      toast.removeEventListener(
        UUIToastNotificationEvent.CLOSED,
        this.onToastClosed as any
      );
      toast.removeEventListener('mouseover', this.pauseAutoClose);
      toast.removeEventListener('mouseout', this.resumeAutoClose);
      toast.removeEventListener('focus', this.pauseAutoClose);
      toast.removeEventListener('blur', this.resumeAutoClose);
    });

    const newToasts = this._toasts.filter(
      modal => existingModals.indexOf(modal) === -1
    );
    newToasts.forEach(toast => {
      toast.addEventListener(
        UUIToastNotificationEvent.CLOSED,
        this.onToastClosed as any
      );

      toast.addEventListener('mouseover', this.pauseAutoClose);
      toast.addEventListener('mouseout', this.resumeAutoClose);
      toast.addEventListener('focus', this.pauseAutoClose);
      toast.addEventListener('blur', this.resumeAutoClose);

      if (this._autoClose) {
        toast.autoClose = this._autoClose;
      }
      if (this._autoClosePause === true) {
        toast.pauseAutoClose();
      }
      toast.open = true;
    });
  };

  render() {
    return html` <slot @slotchange=${this.onSlotChanged}></slot> `;
  }
}
