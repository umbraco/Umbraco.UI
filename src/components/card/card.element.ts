import { SelectableMixin, SelectOnlyMixin } from '../../internal/mixins';
import { UUITextStyles } from '../../styles';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { UUICardEvent } from './UUICardEvent';

import '../checkbox/checkbox.js';

/**
 *  Card is a Component that provides the basics for a Card component. This can be extended in code to match a certain need.
 *  @element uui-card
 *  @fires {UUICardEvent} open - fires when the card title is clicked.
 *  @description - Base card component to be extended by specific card elements.
 *  @slot - Default content.
 */
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

  /**
   * Set the rel attribute for an anchor tag, only used when using href.
   * @type {string}
   * @attr
   * @default undefined
   */
  @property({ type: String })
  public rel?: string;

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

  protected renderCheckbox() {
    if (!this.selectable) return;
    return html`
      <uui-checkbox
        id="select-checkbox"
        label="select"
        tabindex="-1"
        ?checked=${this.selected}
        @click=${(e: MouseEvent) => e.stopPropagation()}
        @change=${() => this.click()}>
      </uui-checkbox>
    `;
  }

  protected render() {
    return html`<slot id="open-part"></slot>
      <div id="select-border"></div>`;
  }

  static styles = [
    UUITextStyles,
    css`
      :host {
        position: relative;
        display: flex;
        width: 100%;
        justify-content: center;
        box-sizing: border-box;
        border: 1px solid var(--uui-color-border);
        border-radius: var(--uui-border-radius-2);
        min-height: var(--uui-layout-medium);
        background-color: var(--uui-color-surface);
        --uui-card-border-width: 3px;
        transition: box-shadow 100ms ease-out;
      }

      :host([selectable]:focus-visible) {
        outline-color: var(--uui-color-focus);
        outline-width: var(--uui-card-border-width);
        outline-style: solid;
        outline-offset: var(--uui-card-border-width);
      }

      :host() * {
        /* TODO: implement globally shared outline style */
        outline-color: var(--uui-color-focus);
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
        border: var(--uui-card-border-width) solid var(--uui-color-invalid);
        border-radius: var(--uui-border-radius-2);
      }

      button {
        font-size: inherit;
        font-family: inherit;
        border: 0;
        padding: 0;
        margin: 0 0 1px 0;
        background-color: transparent;
        text-align: left;
        color: var(--uui-color-text);
      }

      a {
        text-decoration: none;
        color: inherit;
        line-height: initial;
      }

      button:focus,
      a:focus {
        outline-color: var(--uui-color-focus);
        outline-width: var(--uui-card-border-width);
        outline-style: solid;
        outline-offset: var(--uui-card-border-width);
        border-radius: var(--uui-border-radius-2);
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
        border-radius: calc(var(--uui-border-radius-2) + 2px);
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

      :host([disabled]) {
        background: var(--uui-color-disabled);
        color: var(--uui-color-disabled-contrast);
      }

      #select-checkbox {
        position: absolute;
        top: var(--uui-size-4);
        left: var(--uui-size-4);
        opacity: 0;
        transition: opacity 120ms;
        z-index: 3;
      }
      :host(:focus) #select-checkbox,
      :host(:focus-within) #select-checkbox,
      :host(:hover) #select-checkbox,
      #select-checkbox[checked] {
        opacity: 1;
      }
    `,
  ];
}
