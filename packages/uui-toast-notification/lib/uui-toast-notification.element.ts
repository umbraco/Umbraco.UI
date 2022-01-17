import { LitElement, html, css } from 'lit';
import { iconRemove } from '@umbraco-ui/uui-icon-registry-essential/lib/svgs/';
import { property, query, state } from 'lit/decorators.js';
import {
  InterfaceLookType,
  InterfaceLookDefaultValue,
} from '@umbraco-ui/uui-base/lib/types';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib/uui-text.styles';
import { UUIToastNotificationEvent } from './UUIToastNotificationEvent';

/**
 * @element uui-toast-notification
 */
export class UUIToastNotificationElement extends LitElement {
  static styles = [
    UUITextStyles,
    css`
      :host {
        position: relative;
        display: block;
        width: 100%;
        max-width: 400px;

        height: 0;
        pointer-events: none;

        transition: height 480ms;
      }
      :host([is-open]) #toast {
        pointer-events: all;
      }
      #toast {
        position: relative;
        width: 100%;
        min-width: 100%;
        max-width: 400px;

        box-sizing: border-box;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.21);
        background-color: var(--uui-interface-surface);
        padding: var(--uui-size-layout-1);
        padding-right: var(--uui-size-layout-2);
        padding-left: var(--uui-size-layout-3);
        border-radius: calc(var(--uui-border-radius) * 2);

        opacity: 0;
        transition: opacity 480ms;
      }

      #toast.animate {
        position: absolute;
      }

      :host([is-open]) #toast {
        opacity: 1;
      }

      #layout {
        display: flex;
        width: 100%;
      }

      #message {
        flex-grow: 1;
      }

      #close {
        flex-grow: 0;
        flex-shrink: 0;
        margin-left: var(--uui-size-space-2);
        margin-top: -7px;
      }

      #close > uui-button {
        --uui-button-border-radius: 50px 50px 50px 50px;
        --uui-button-padding-left-factor: 1.5;
        --uui-button-padding-right-factor: 1.5;

        margin-right: -6px;
      }

      slot[name='actions'] {
        display: flex;
        width: 100%;
        justify-content: flex-end;
      }

      :host([look='primary']) #toast {
        background-color: var(--uui-look-primary-surface);
        color: var(--uui-look-primary-contrast);
      }
      :host([look='positive']) #toast {
        background-color: var(--uui-look-positive-surface);
        color: var(--uui-look-positive-contrast);
      }
      :host([look='warning']) #toast {
        background-color: var(--uui-look-warning-surface);
        color: var(--uui-look-warning-contrast);
        border-color: var(--uui-look-warning-border);
      }
      :host([look='danger']) #toast {
        background-color: var(--uui-look-danger-surface);
        color: var(--uui-look-danger-contrast);
        border-color: var(--uui-look-danger-border);
      }
    `,
  ];

  /**
   * Changes the look of the notification to one of the predefined, symbolic looks. Example set this to danger for errors.
   * @type {""|"primary"|"positive"|"warning"|"danger"}
   * @attr
   * @default ""
   */
  @property({ reflect: true })
  look: InterfaceLookType = InterfaceLookDefaultValue;

  /**
   * Headline for this notification.
   * @type string
   * @attr
   * @default ""
   */
  @property({ reflect: true })
  headline: string | null = null;

  @query('#toast')
  private _toastEl!: HTMLInputElement;

  private _animationTimeout?: number;

  @property({ type: Boolean, reflect: true, attribute: 'is-open' })
  protected isOpen = false;

  @state()
  private _animate = false;

  @property({ type: Boolean, reflect: true })
  private _open = false;
  public get open() {
    return this._open;
  }
  public set open(value) {
    if (value === true) {
      this.makeOpen();
    } else {
      this.makeClose();
    }
  }

  public makeOpen() {
    this.updateComplete.then(() => {
      window.requestAnimationFrame(() => {
        window.clearTimeout(this._animationTimeout as number);
        this.isOpen = true;

        this.style.height = this._toastEl.getBoundingClientRect().height + 'px';
        this._animate = true;

        this.dispatchEvent(
          new UUIToastNotificationEvent(UUIToastNotificationEvent.OPEN, this)
        );

        this._animationTimeout = window.setTimeout(() => {
          if (this.isOpen === true) {
            this.style.height = 'auto';
            this._animate = false;
          }
        }, 480);
      });
    });
  }
  public makeClose() {
    if (this.isOpen === true) {
      window.clearTimeout(this._animationTimeout as number);
      this.isOpen = false;

      this.style.height = this._toastEl.getBoundingClientRect().height + 'px';
      this._animate = true;

      this.dispatchEvent(
        new UUIToastNotificationEvent(UUIToastNotificationEvent.CLOSE, this)
      );

      this._animationTimeout = window.setTimeout(() => {
        if (this.isOpen === false) {
          this.style.height = 'auto';
          this._animate = false;

          this.dispatchEvent(
            new UUIToastNotificationEvent(
              UUIToastNotificationEvent.CLOSED,
              this
            )
          );
          if (this.parentNode) {
            this.parentNode.removeChild(this);
          }
        }
      }, 480);
    }
  }

  render() {
    return html`
      <div id="toast" class=${this._animate ? 'animate' : ''}>
        <div id="layout">
          <div id="message" class="uui-text">
            ${this.headline ? html`<h5>${this.headline}</h5>` : ''}
            <slot></slot>
          </div>
          <div id="close">
            <uui-button .look=${this.look}>
              <uui-icon
                name="remove"
                .fallback=${iconRemove.strings[0]}></uui-icon>
            </uui-button>
          </div>
        </div>
        <slot name="actions"></slot>
      </div>
    `;
  }
}
