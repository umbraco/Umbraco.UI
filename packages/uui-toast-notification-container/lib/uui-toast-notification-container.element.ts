import { LitElement, html, css } from 'lit';
import { UUIToastNotificationElement } from '@umbraco-ui/uui-toast-notification/lib/uui-toast-notification.element';
import { UUIToastNotificationEvent } from '@umbraco-ui/uui-toast-notification/lib/UUIToastNotificationEvent';

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

  /*
  @query('slot') protected slotElement!: HTMLSlotElement;
  */

  public removeToast(toast?: UUIToastNotificationElement) {
    let _toast = toast;
    if (!_toast) {
      _toast = this.toasts[this.toasts.length - 1];
    } else if (this.toasts.indexOf(_toast) === -1) {
      console.warn(
        'Toast-notification',
        toast,
        'could not be removed as it is not a child of this toast-notification-container',
        this
      );
      return;
    }
    _toast.removeEventListener(
      UUIToastNotificationEvent.CLOSED,
      this.onToastClosed as any
    );
    this.removeChild(_toast);
  }
  public closeToast(modal?: UUIToastNotificationElement) {
    let _modal = modal;
    if (!_modal) {
      _modal = this.toasts[this.toasts.length - 1];
    }
    _modal.open = false;
  }

  private onToastClosed = (e: UUIToastNotificationEvent) => {
    this.removeToast(e.target);
  };

  protected toasts: UUIToastNotificationElement[] = [];

  private onSlotChanged = (event: any) => {
    const existingModals = [...this.toasts];

    this.toasts = event.target
      .assignedElements({ flatten: true })
      .filter(
        (e: Node) => e instanceof UUIToastNotificationElement
      ) as UUIToastNotificationElement[];

    const newToasts = this.toasts.filter(
      modal => existingModals.indexOf(modal) === -1
    );
    newToasts.forEach(el => {
      el.addEventListener(
        UUIToastNotificationEvent.CLOSED,
        this.onToastClosed as any
      );
      el.open = true;
    });
  };

  render() {
    return html` <slot @slotchange=${this.onSlotChanged}></slot> `;
  }
}
