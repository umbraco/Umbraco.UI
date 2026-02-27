import { UUITimer } from '../../internal/utils/index.js';
import { UUITextStyles } from '../../styles/index.js';
import { iconRemove } from '../icon-registry-essential/svgs/index.js';
import { css, html, LitElement } from 'lit';
import { property, query, state } from 'lit/decorators.js';

import { UUIToastNotificationEvent } from './UUIToastNotificationEvent.js';
import type { UUIInterfaceColor } from '../../internal/index.js';

import '../button/button.js';
import '../icon/icon.js';

/**
 *  @element uui-toast-notification
 *  @fires {UUIToastNotificationEvent} opening - fires when the toast is starting to open
 *  @fires {UUIToastNotificationEvent} opened - fires when the toast is open after the open-animation
 *  @fires {UUIToastNotificationEvent} closing - fires when the toast is starting to close
 *  @fires {UUIToastNotificationEvent} closed - fires when the toast is closed
 *  @description - Component for displaying a toast notification, preferably used in toast-notification-container.
 *  @slot - slot for dialog layout/content
 */
export class UUIToastNotificationElement extends LitElement {
  /**
   * Changes the color of the notification to one of the predefined, symbolic colors. Example: set this to danger to indicate errors.
   * @type {UUIInterfaceColor}
   * @attr
   * @default ""
   */
  @property({ reflect: true })
  color: UUIInterfaceColor = '';

  private _autoClose: number | null = null;
  /**
   * Set an auto-close timer.
   * @type number
   * @attr
   * @default null
   */
  @property({ type: Number })
  public get autoClose(): number | null {
    return this._autoClose;
  }
  public set autoClose(value: number | null) {
    this._autoClose = value;
    if (value !== null) {
      if (this._timer === null) {
        this._timer = new UUITimer(this._onOpenTimerComplete, value);
      } else {
        this._timer.setDuration(value);
      }
      if (
        this._pauseTimer === false &&
        this.isOpen === true &&
        this._animate === false
      ) {
        this._timer.start();
      }
    } else {
      this._timer?.destroy();
      this._timer = null;
    }
  }

  /**
   * Pause the auto close timer.
   */
  public pauseAutoClose() {
    this._pauseTimer = true;
    if (this._timer !== null) {
      this._timer.pause();
    }
  }
  /**
   * Resume the auto close timer.
   */
  public resumeAutoClose() {
    this._pauseTimer = false;
    if (
      this._timer !== null &&
      this.isOpen === true &&
      this._animate === false
    ) {
      this._timer.restart();
    }
  }

  private readonly _onOpenTimerComplete = () => {
    if (this._open) {
      this.open = false;
    }
  };

  @query('#toast')
  private readonly _toastEl!: HTMLElement;
  private _timer: UUITimer | null = null;
  private _pauseTimer: boolean = false;

  protected isOpen = false;
  private _open = false;

  @state()
  private _animate = false;
  private _animationTimeout?: number;

  /**
   * define if this toast should open or close.
   * @type boolean
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public get open() {
    return this._open;
  }
  public set open(value: boolean) {
    if (value === true) {
      this._makeOpen();
    } else {
      this._makeClose();
    }
  }

  constructor() {
    super();
    this.addEventListener('keyup', (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        this.open = false;
      }
    });
  }

  private _getAnimationDuration(): number {
    return (
      Number.parseInt(
        getComputedStyle(this).getPropertyValue(
          '--uui-toast-notification-animation-duration',
        ),
        10,
      ) || 480
    );
  }

  private _requestAnimationUpdate = 0;
  private _makeOpen() {
    if (this._open === true) {
      return;
    }
    this._open = true;
    this.updateComplete.then(() => {
      if (this._open !== true) {
        return;
      }
      cancelAnimationFrame(this._requestAnimationUpdate);
      this._requestAnimationUpdate = requestAnimationFrame(() => {
        clearTimeout(this._animationTimeout as number);
        this.isOpen = true;
        this.setAttribute('is-open', '');

        this.style.height = this._toastEl.getBoundingClientRect().height + 'px';
        this._animate = true;

        this.dispatchEvent(
          new UUIToastNotificationEvent(UUIToastNotificationEvent.OPENING),
        );

        this._animationTimeout = window.setTimeout(() => {
          if (this.isOpen === true) {
            this.style.height = 'auto';
            this._animate = false;
            if (this._pauseTimer === false) {
              this._timer?.start();
            }

            this.dispatchEvent(
              new UUIToastNotificationEvent(UUIToastNotificationEvent.OPENED),
            );
          }
        }, this._getAnimationDuration());
      });
    });
  }
  private _makeClose() {
    if (this._open === false) {
      return;
    }

    const event = new UUIToastNotificationEvent(
      UUIToastNotificationEvent.CLOSING,
      { cancelable: true },
    );
    this.dispatchEvent(event);

    if (event.defaultPrevented === true) {
      return;
    }

    this._open = false;
    this._timer?.pause();
    cancelAnimationFrame(this._requestAnimationUpdate); // do cancel though isOpen wasn't set jet.
    if (this.isOpen === true) {
      this._requestAnimationUpdate = requestAnimationFrame(() => {
        clearTimeout(this._animationTimeout as number);
        this.isOpen = false;
        this.removeAttribute('is-open');

        this.style.height = this._toastEl.getBoundingClientRect().height + 'px';
        this._animate = true;

        requestAnimationFrame(() => {
          // Dont overwrite the height instantly, but instead wait one frame to ensure animate is set before setting the goal of the animation.
          this.style.height = '0';
        });

        this._animationTimeout = window.setTimeout(() => {
          if (this.isOpen === false) {
            this._animate = false;

            this.dispatchEvent(
              new UUIToastNotificationEvent(UUIToastNotificationEvent.CLOSED),
            );
            if (this.parentNode) {
              this.parentNode.removeChild(this);
            }
          }
        }, this._getAnimationDuration());
      });
    }
  }

  render() {
    return html`
      <div id="toast" class=${this._animate ? 'animate' : ''}>
        <div>
          <div id="close">
            <uui-button
              .label=${'close'}
              .color=${this.color}
              .look=${this.color ? 'primary' : 'default'}
              @click=${() => (this.open = false)}>
              <uui-icon
                name="remove"
                .fallback=${iconRemove.strings[0]}></uui-icon>
            </uui-button>
          </div>
          <slot></slot>
        </div>
      </div>
    `;
  }

  static override readonly styles = [
    UUITextStyles,
    css`
      :host {
        --uui-toast-notification-margin: var(--uui-size-space-2);

        position: relative;
        display: block;
        width: 100%;
        max-width: 400px;
        margin: 0 var(--uui-toast-notification-margin);
        box-sizing: border-box;

        height: 0;
        pointer-events: none;

        transition: height
          var(--uui-toast-notification-animation-duration, 480ms) ease-in-out;
      }
      :host([is-open]) {
        pointer-events: all;
        transition-timing-function: cubic-bezier(
          0.19,
          1,
          0.22,
          1
        ); /* easeOutExpo */
      }

      #toast {
        position: relative;
        display: block;
        padding: calc(var(--uui-toast-notification-margin) * 0.5) 0;
        width: 100%;
        max-width: 400px;
      }
      #toast.animate {
        position: absolute;
      }

      #toast > div {
        position: relative;
        display: block;

        box-sizing: border-box;
        box-shadow: var(--uui-shadow-depth-1);
        background-color: var(--uui-color-surface);
        padding: var(--uui-size-layout-1);
        padding-right: var(--uui-size-layout-1);
        padding-left: var(--uui-size-layout-3);
        border-radius: var(--uui-border-radius-3);

        opacity: 0;
        transition: opacity
          var(--uui-toast-notification-animation-duration, 480ms);
      }
      :host([is-open]) #toast > div {
        opacity: 1;
      }

      #close {
        float: right;
        margin-top: -6px;
        margin-left: var(--uui-size-space-1);
        margin-bottom: -4px;
      }

      #close > uui-button {
        --uui-button-border-radius: 50px 50px 50px 50px;
        --uui-button-padding-left-factor: 1.5;
        --uui-button-padding-right-factor: 1.5;
      }

      :host #toast > div {
        background-color: var(--uui-color-surface);
        color: var(--uui-color-text);
        border-color: var(--uui-color-surface);
      }
      :host([color='default']) #toast > div {
        background-color: var(--uui-color-default);
        color: var(--uui-color-default-contrast);
        border-color: var(--uui-color-default-standalone);
      }
      :host([color='positive']) #toast > div {
        background-color: var(--uui-color-positive);
        color: var(--uui-color-positive-contrast);
        border-color: var(--uui-color-positive-standalone);
      }
      :host([color='warning']) #toast > div {
        background-color: var(--uui-color-warning);
        color: var(--uui-color-warning-contrast);
        border-color: var(--uui-color-warning-standalone);
      }
      :host([color='danger']) #toast > div {
        background-color: var(--uui-color-danger);
        color: var(--uui-color-danger-contrast);
        border-color: var(--uui-color-danger-standalone);
      }
      :host([color='invalid']) #toast > div {
        background-color: var(--uui-color-invalid);
        color: var(--uui-color-invalid-contrast);
        border-color: var(--uui-color-invalid-standalone);
      }
    `,
  ];
}
