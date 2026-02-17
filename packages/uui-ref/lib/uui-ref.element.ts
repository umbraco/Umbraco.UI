import { LitElement, css } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property } from 'lit/decorators.js';
import {
  SelectableMixin,
  SelectOnlyMixin,
} from '@umbraco-ui/uui-base/lib/mixins';
import { UUIRefEvent } from './UUIRefEvent';

/**
 *  @element uui-ref
 *  @fires {UUIRefEvent} open - fires when the ref is opened
 *  @fires {UUISelectableEvent} selected - fires when the ref is selected
 *  @fires {UUISelectableEvent} deselected - fires when the ref is deselected
 *  @description - Base ref component to be extended by specific ref elements. Does not have a tag.
 *  @attr {boolean} [disabled=false] - Set to true to disable
 *  @attr {boolean} [error=false] - Set to true to display error state
 *  @attr {boolean} [standalone=false] - Set to true to make element stand out
 */

@defineElement('uui-ref')
export class UUIRefElement extends SelectOnlyMixin(
  SelectableMixin(LitElement),
) {
  /**
   * Set tot true to disable
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Sets the input to readonly mode, meaning value cannot be changed but still able to read and select its content.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Set to true to display error state
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  protected handleOpenClick(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(new UUIRefEvent(UUIRefEvent.OPEN));
  }
  protected handleOpenKeydown(e: KeyboardEvent) {
    // TODO: Is it correct to both be able to open by space and enter? We to investigate, i would think that enter was the only option.
    if (e.key !== ' ' && e.key !== 'Enter') return;
    e.preventDefault();
    e.stopPropagation();
    this.dispatchEvent(new UUIRefEvent(UUIRefEvent.OPEN));
  }

  static styles = [
    css`
      :host {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        font-size: var(--uui-font-size);

        box-sizing: border-box;
        border-radius: var(--uui-border-radius);
        background-color: var(--uui-color-surface);
        --uui-card-before-opacity: 0;
        transition: --uui-card-before-opacity 120ms;
      }

      :host([selectable]:focus-visible) {
        outline-color: var(--uui-color-focus);
        outline-width: var(--uui-card-border-width);
        outline-style: solid;
        outline-offset: var(--uui-card-border-width);
      }

      :host([error]) {
        border: 1px solid var(--uui-color-invalid);
      }

      :host([standalone]) {
        border: 1px solid var(--uui-color-border);
      }

      :host([selectable]) {
        cursor: pointer;
      }
      :host([selectable]) #select-border {
        position: absolute;
        z-index: 2;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        pointer-events: none;
        opacity: 0;
        transition: opacity 120ms;
      }
      :host([selectable]) #select-border::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 2px solid var(--uui-color-selected);
        border-radius: calc(var(--uui-border-radius) + 2px);
        box-shadow:
          0 0 4px 0 var(--uui-color-selected),
          inset 0 0 2px 0 var(--uui-color-selected);
      }
      :host([selected]) #select-border {
        opacity: 1;
      }
      :host([selectable]:not([selected]):hover) #select-border {
        opacity: 0.33;
      }
      :host([selectable][selected]:hover) #select-border {
        opacity: 0.8;
      }

      :host([selectable]:not([selected])) #open-part:hover + #select-border {
        opacity: 0;
      }
      :host([selectable][selected]) #open-part:hover + #select-border {
        opacity: 1;
      }

      :host([selectable]:not([selected]):hover) #select-border::after {
        animation: not-selected--hover 1.2s infinite;
      }
      @keyframes not-selected--hover {
        0%,
        100% {
          opacity: 0.66;
        }
        50% {
          opacity: 1;
        }
      }

      :host([selectable][selected]:hover) #select-border::after {
        animation: selected--hover 1.4s infinite;
      }
      @keyframes selected--hover {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.66;
        }
      }
      :host([selectable]) #open-part:hover + #select-border::after {
        animation: none;
      }

      :host([select-only]) *,
      :host([select-only]) ::slotted(*) {
        pointer-events: none;
      }

      button {
        font-size: inherit;
        font-family: inherit;
        border: 0;
        padding: 0;
        background-color: transparent;
        text-align: left;
        color: var(--uui-color-text);
      }
      a {
        text-decoration: none;
        color: inherit;
      }

      button:focus,
      a:focus {
        outline-offset: var(--uui-card-border-width);
        border-radius: var(--uui-border-radius);
        outline: 2px solid var(--uui-color-focus);
      }

      slot[name='actions']::slotted(*) {
        --uui-button-height: calc(var(--uui-size-2) * 4);
      }

      slot[name='actions']::slotted(*:first-child) {
        margin-right: var(--uui-size-2);
      }
      slot[name='actions'] {
        display: flex;
        align-items: center;
      }
      #tag-container::slotted(*:first-child) {
        margin: calc(var(--uui-size-2));
      }
      #actions-container::slotted(*:first-child) {
        margin: calc(var(--uui-size-2));
      }
      #actions-container {
        opacity: 0;
        transition: opacity 120ms;
      }
      :host(:hover) #actions-container,
      :host(:focus) #actions-container,
      :host(:focus-within) #actions-container {
        opacity: 1;
      }

      :host([standalone]:not([disabled]):hover) {
        border-color: var(--uui-color-border-emphasis);
      }

      :host([disabled]) #open-part {
        cursor: default;
      }

      :host([standalone][disabled]) {
        border-color: var(--uui-color-disabled-standalone);
      }

      slot[name='tag'] {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-ref': UUIRefElement;
  }
}
