import {
  SelectableMixin,
  SelectOnlyMixin,
} from '@umbraco-ui/uui-base/lib/mixins';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { UUICardEvent } from './UUICardEvent';

/**
 *  @element uui-card
 *  @fires {UUICardEvent} open - fires when the card title is clicked
 *  @description - Base card component to be extended by specific cards.
 */
@defineElement('uui-card')
export class UUICardElement extends SelectOnlyMixin(
  SelectableMixin(LitElement)
) {
  static styles = [
    css`
      :host {
        position: relative;
        display: flex;
        width: 100%;
        justify-content: center;
        box-sizing: border-box;
        box-shadow: var(--uui-shadow-depth-1);
        border-radius: var(--uui-border-radius);
        min-height: var(--uui-layout-medium);
        background-color: var(--uui-color-surface);
        --uui-card-border-width: 3px;
        transition: box-shadow 100ms ease-out;
      }

      :host(*) * {
        /* TODO: implement globally shared outline style */
        outline-color: var(--uui-color-focus);
        outline-offset: 4px;
      }

      :host(:focus) {
        outline-color: var(--uui-color-focus);
        outline-width: var(--uui-card-border-width);
        outline-style: solid;
        outline-offset: var(--uui-card-border-width);
      }

      :host([error]) {
        border: var(--uui-card-border-width) solid var(--uui-color-danger);
      }

      :host([selectable]) {
        cursor: pointer;
      }

      :host([disabled]) {
        background: var(--uui-color-disabled);
        color: var(--uui-color-disabled-contrast);
      }

      :host([selectable])::after {
        content: '';
        position: absolute;
        pointer-events: none;
        inset: calc(var(--uui-card-border-width) * -1);
        width: calc(100% + var(--uui-card-border-width) * 2);
        height: calc(100% + var(--uui-card-border-width) * 2);
        box-sizing: border-box;
        border: var(--uui-card-border-width) solid var(--uui-color-selected);
        border-radius: calc(
          var(--uui-border-radius) + var(--uui-card-border-width)
        );
        transition: opacity 100ms ease-out;
        opacity: 0;
      }
      :host([selectable]:hover)::after {
        opacity: 0.33;
      }
      :host([selectable][selected]:hover)::after {
        opacity: 0.66;
      }
      :host([selectable][selected])::after {
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
      :host([error])::after {
        inset: calc(var(--uui-card-border-width) * -2);
        width: calc(100% + calc(var(--uui-card-border-width) * 4));
        height: calc(100% + calc(var(--uui-card-border-width) * 4));
      }

      :host([select-only]) *,
      :host([select-only]) ::slotted(*) {
        pointer-events: none;
      }
    `,
  ];

  /**
   * Set to true to prevent opening of this item.
   * This does not prevent selection, selection is controlled by property 'selectable'
   * @type {boolean}
   * @attr disabled
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: 'disabled' })
  disabled = false;

  /**
   * Set to true to highlight there is an error with this item.
   * @type {boolean}
   * @attr error
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  protected handleOpenClick(e: Event) {
    if (this.disabled) return;

    e.stopPropagation();
    this.dispatchEvent(new UUICardEvent(UUICardEvent.OPEN));
  }
  protected handleOpenKeydown(e: KeyboardEvent) {
    if (this.disabled) return;
    if (e.key !== 'Enter') return;

    e.preventDefault();
    e.stopPropagation();
    this.dispatchEvent(new UUICardEvent(UUICardEvent.OPEN));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-card': UUICardElement;
  }
}
