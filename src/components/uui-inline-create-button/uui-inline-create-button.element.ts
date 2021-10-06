import { LitElement, html, css } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { property, state } from 'lit/decorators.js';
import {
  UUIBlinkKeyframes,
  UUIBlinkAnimationValue,
} from '@umbraco-ui/uui-base/lib/animations';
import { LabelMixin } from '@umbraco-ui/uui-base/lib/mixins';
import { UUIInlineCreateButtonEvent } from './UUIInlineCreateButtonEvent';
/**
 *  @element uui-inline-create-button
 *  @description - Special button for creating new elements
 *  @attr {Boolean} vertical - display vertical version of the button
 *  @fires click on user click
 */

export class UUIInlineCreateButtonElement extends LabelMixin('', LitElement) {
  static styles = [
    UUIBlinkKeyframes,
    css`
      :host {
        display: inline-block;
        width: 100%;
        position: relative;
      }

      :host([vertical]) {
        height: 100%;
      }

      #button-wrapper {
        position: absolute;

        z-index: 1;

        outline: 0;
        height: 12px;
        margin-top: -9px;
        padding-top: 6px;
        margin-bottom: -6px;
        transition: opacity 0.24s;
        display: inline-flex;
        width: 100%;
        border: none;

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

      :host([vertical]) #button-wrapper {
        height: 100%;
        width: auto;
        margin-left: -12px;
        padding-left: 6px;
        margin-right: -6px;
      }

      #button-wrapper:before {
        content: '';
        position: absolute;
        top: 5px;
        right: 0;
        left: 0;
        height: 2px;
        background-color: var(--uui-interface-select, #2152a3);
        border-top: 1px solid var(--uui-interface-surface, #fff);
        border-bottom: 1px solid var(--uui-interface-surface, #fff);
        border-radius: 2px;
        pointer-events: none;
        animation: ${UUIBlinkAnimationValue};
      }

      :host([vertical]) #button-wrapper:before {
        height: 100%;
        width: 2px;
        background: linear-gradient(
          180deg,
          rgba(33, 82, 163, 0) 0%,
          rgba(33, 82, 163, 1) 30%,
          rgba(33, 82, 163, 1) 70%,
          rgba(33, 82, 163, 0) 100%
        );
      }

      #plus {
        position: absolute;
        top: 9px;
        left: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        pointer-events: none;
        box-sizing: border-box;
        width: 28px;
        height: 28px;
        margin-left: -24px;
        margin-top: -16px;
        border-radius: 3em;
        font-size: 14px;
        border: 2px solid var(--uui-interface-selected, #2152a3);
        color: var(--uui-interface-selected, #2152a3);
        background-color: var(--uui-interface-surface, #fff);
        box-shadow: 0 0 0 2px var(--uui-interface-surface, #fff);

        opacity: 0;
        transform: scale(0);
        transition: transform 240ms ease-in, opacity 240ms;
      }
      :host(:focus) #plus,
      :host(:focus-within) #plus,
      :host(:hover) #plus {
        opacity: 1;
        transform: scale(1);
        transition: transform 240ms cubic-bezier(0.175, 0.885, 0.32, 1.275),
          opacity 80ms;
      }

      :host([vertical]) #plus {
        left: 12px;
      }

      #button-wrapper:focus #plus {
        /* TODO: implement focus outline system */
        border: 2px solid #6ab4f0;
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

  @state()
  position = 0;

  @property({ type: Boolean, reflect: true })
  vertical = false;

  private _onMouseMove(e: MouseEvent) {
    this.position = this.vertical ? e.offsetY : e.offsetX;
  }

  private _handleClick() {
    this.dispatchEvent(
      new UUIInlineCreateButtonEvent(UUIInlineCreateButtonEvent.CLICK)
    );
  }

  render() {
    return html`
      <button
        id="button-wrapper"
        @mousemove=${this._onMouseMove}
        @click=${this._handleClick}
        aria-label=${this.label ? this.label : 'create new element'}>
        <div
          id="plus"
          style=${styleMap({
            left: this.vertical ? '' : this.position + 'px',
            top: this.vertical ? this.position + 'px' : '',
          })}>
          <svg
            id="plus-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
            <path
              d="M420.592 214.291H296.104V89.804h-83.102v124.487H88.518v83.104h124.484v124.488h83.102V297.395h124.488z" />
          </svg>
        </div>
      </button>
    `;
  }
}
