import {
  SelectableMixin,
  SelectOnlyMixin,
} from '@umbraco-ui/uui-base/lib/mixins';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { UUICardEvent } from './UUICardEvent';

/**
 *  @element uui-card
 *  @fires {UUICardEvent} open - fires when the card title is clicked.
 *  @description - Base card component to be extended by specific card elements.
 *  @slot - Default content.
 */
@defineElement('uui-card')
export class UUICardElement extends SelectOnlyMixin(
  SelectableMixin(LitElement),
) {
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

  /**
   * Set an href, this will turns the name of the card into an anchor tag.
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

  // This is deprecated - use href instead
  protected handleOpenClick(e: Event) {
    if (this.disabled) return;

    e.stopPropagation();
    this.dispatchEvent(new UUICardEvent(UUICardEvent.OPEN));
  }
  // This is deprecated - use href instead
  protected handleOpenKeydown(e: KeyboardEvent) {
    if (this.disabled) return;
    if (e.key !== 'Enter') return;

    e.preventDefault();
    e.stopPropagation();
    this.dispatchEvent(new UUICardEvent(UUICardEvent.OPEN));
  }

  protected render() {
    return html`<slot></slot>`;
  }

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

      :host(*) {
        /* TODO: implement globally shared outline style */
        outline-color: var(--uui-color-focus);
        outline-offset: 4px;
      }

      :host(*) * {
        /* TODO: implement globally shared outline style */
        outline-color: var(--uui-color-focus);
      }

      :host(:focus) {
        outline-color: var(--uui-color-focus);
        outline-width: var(--uui-card-border-width);
        outline-style: solid;
        outline-offset: var(--uui-card-border-width);
      }

      :host([error])::before {
        content: '';
        position: absolute;
        pointer-events: none;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        box-sizing: border-box;
        border: var(--uui-card-border-width) solid var(--uui-color-danger);
        border-radius: var(--uui-border-radius);
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
        width: calc(100% + calc(var(--uui-card-border-width) * 2));
        height: calc(100% + calc(var(--uui-card-border-width) * 2));
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

      :host([select-only]) *,
      :host([select-only]) ::slotted(*) {
        pointer-events: none;
      }

      a {
        text-decoration: none;
        color: inherit;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-card': UUICardElement;
  }
}
