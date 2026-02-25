import {
  UUIBlinkAnimationValue,
  UUIBlinkKeyframes,
} from '../../internal/animations';
import { css, html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { UUIButtonInlineCreateEvent } from './UUIButtonInlineCreateEvent';

/**
 *  @element uui-button-inline-create
 *  @description - Special button for creating new elements
 *  @attr {Boolean} vertical - display vertical version of the button
 *  @fires click on user click
 */

export class UUIButtonInlineCreateElement extends LitElement {
  @state()
  private _position = 0;

  /**
   * Label to be used for aria-label and eventually as visual label
   * @type {string}
   * @attr
   */
  @property({ type: String })
  public label?: string;

  /**
   * Place the button vertically
   * @type {Boolean}
   * @attr
   */
  @property({ type: Boolean, reflect: true })
  vertical = false;

  /**
   * Set an href, this will turns the button into an anchor tag.
   * @type {string}
   * @attr
   * @default undefined
   */
  @property({ type: String })
  public href?: string;

  /**
   * Set an anchor tag target, only used when using href.
   * @type {string}
   * @attr
   * @default undefined
   */
  @property({ type: String })
  public target?: '_blank' | '_parent' | '_self' | '_top';

  /**
   * Set the rel attribute for an anchor tag, only used when using href.
   * @type {string}
   * @attr
   * @default undefined
   */
  @property({ type: String })
  public rel?: string;

  private _onMouseMove(e: MouseEvent) {
    this._position = (this.vertical ? e.offsetY : e.offsetX) - 5;
  }

  private _handleClick(e: MouseEvent) {
    e.preventDefault();
    e.stopImmediatePropagation();

    // We do not want to focus the button after click.
    (e.target as any)?.blur?.();

    this.dispatchEvent(
      new UUIButtonInlineCreateEvent(UUIButtonInlineCreateEvent.CLICK),
    );
  }

  #renderContent() {
    return html`
      <div
        id="plus"
        style=${styleMap({
          left: this.vertical ? '' : this._position + 'px',
          top: this.vertical ? this._position + 'px' : '',
        })}>
        <svg
          id="plus-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512">
          <path
            d="M420.592 214.291H296.104V89.804h-83.102v124.487H88.518v83.104h124.484v124.488h83.102V297.395h124.488z" />
        </svg>
      </div>
    `;
  }

  #renderLink() {
    return html`<a
      id="button-wrapper"
      @mousemove=${this._onMouseMove}
      href=${ifDefined(this.href)}
      target=${ifDefined(this.target || undefined)}
      rel=${ifDefined(
        this.rel ||
          ifDefined(
            this.target === '_blank' ? 'noopener noreferrer' : undefined,
          ),
      )}
      aria-label=${this.label ? this.label : 'create new element'}>
      ${this.#renderContent()}
    </a>`;
  }

  #renderButton() {
    return html`
      <button
        id="button-wrapper"
        @mousemove=${this._onMouseMove}
        @click=${this._handleClick}
        aria-label=${this.label ? this.label : 'create new element'}>
        ${this.#renderContent()}
      </button>
    `;
  }

  render() {
    return this.href ? this.#renderLink() : this.#renderButton();
  }

  static styles = [
    UUIBlinkKeyframes,
    css`
      :host {
        display: flex;
        position: relative;
        z-index: 1;
      }

      :host(:not([vertical])) {
        height: 20px;
        width: 100%;
        margin: -10px 0;
      }

      :host([vertical]) {
        height: 100%;
        width: 20px;
        margin: 0 -10px;
      }

      #button-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;

        position: absolute;
        z-index: 1;
        outline: 0;
        transition: opacity 0.24s;
        display: inline-flex;
        width: 100%;
        border: none;
        height: 100%;
        padding: 0;

        text-decoration: none;
        background: transparent;
        color: currentColor;

        cursor: pointer;
        -webkit-appearance: none;
        -moz-appearance: none;

        opacity: 0;
      }

      :host(:focus) #button-wrapper,
      :host(:focus-within) #button-wrapper,
      :host(:hover) #button-wrapper {
        opacity: 1;
      }

      :host(:focus) #button-wrapper:before,
      :host(:focus-within) #button-wrapper:before,
      :host(:hover) #button-wrapper:before {
        animation: ${UUIBlinkAnimationValue};
        background-color: var(--uui-color-interactive-emphasis);
        border-color: var(--uui-color-surface) !important;
      }

      #button-wrapper:before {
        content: '';
        position: absolute;
        right: 0;
        left: 0;
        height: 2px;
        background-color: transparent;
        border-top: 1px solid transparent;
        border-bottom: 1px solid transparent;
        border-radius: 2px;
        pointer-events: none;
        transition:
          background-color 720ms ease-out,
          border-color 240ms;
      }

      :host(:not([vertical])) #button-wrapper:before {
        top: 50%;
        transform: translateY(-50%);
      }

      :host([vertical]) #button-wrapper:before {
        height: 100%;
        width: 2px;
        left: 50%;
        transform: translateX(-50%);
        border-top: none;
        border-bottom: none;
        border-left: 1px solid transparent;
        border-right: 1px solid transparent;
      }

      :host(:not([vertical]):not(:hover)) #plus:not(:focus) {
        left: calc(50% - 2px) !important;
      }

      :host([vertical]:not(:hover)) #plus:not(:focus) {
        top: calc(50% - 2px) !important;
      }

      #plus {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        pointer-events: none;
        box-sizing: border-box;
        width: 28px;
        height: 28px;
        border-radius: 3em;
        font-size: 14px;
        border: 2px solid var(--uui-color-interactive-emphasis);
        color: var(--uui-color-interactive-emphasis);
        background-color: var(--uui-color-surface);

        opacity: 0;
        transform: scale(0);
        transition:
          transform 240ms ease-in,
          opacity 240ms,
          left 100ms linear 150ms,
          top 100ms linear 150ms;
      }
      :host(:focus) #plus,
      :host(:focus-within) #plus,
      :host(:hover) #plus {
        opacity: 1;
        transform: scale(1);
        transition:
          transform 240ms cubic-bezier(0.175, 0.885, 0.32, 1.275),
          opacity 80ms,
          box-shadow 240ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
        box-shadow: 0 0 0 2px var(--uui-color-surface);
      }

      :host(:not([vertical])) #plus {
        margin-left: -18px;
      }

      :host([vertical]) #plus {
        left: -4px;
        margin-top: -18px;
      }

      #button-wrapper:focus #plus {
        /* TODO: implement focus outline system */
        border: 2px solid var(--uui-color-focus);
        color: var(--uui-color-focus);
      }

      #plus-icon {
        width: 50%;
        fill: currentColor;
      }

      #button-wrapper:active #plus {
        transform: scale(1.1);
      }
    `,
  ];
}
