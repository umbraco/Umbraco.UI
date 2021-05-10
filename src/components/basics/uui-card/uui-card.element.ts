import { LitElement, css, unsafeCSS } from 'lit';
import { property } from 'lit/decorators';
import { UUICardEvent } from './UUICardEvent';

/**
 *  @element uui-card
 *  @fires {UUICardEvent} click-title - fires when the media card title is clicked
 *  @description - Base card component to be extended by specific cards.
 */

export class UUICardElement extends LitElement {
  static styles = [
    css`
      :host {
        position: relative;
        display: flex;
        justify-content: center;
        box-shadow: 0 1px 1px 0 var(--uui-interface-border);
        border-radius: var(--uui-size-border-radius, 3px);
        /* min-width: calc(var(--uui-size-xxlarge, 66px) * 2);*/
        min-height: calc(var(--uui-size-xxlarge, 66px) * 2);
        margin: 6px;
        background-color: var(--uui-interface-surface, white);
        --uui-card-before-opacity: 0;
        transition: --uui-card-before-opacity 120ms;
      }

      :host(:focus) {
        /** TODO: implement focus outline. */
        outline-color: #6ab4f0;
      }

      :host([error]) {
        border: 2px solid var(--uui-look-danger-border, #d42054);
        box-shadow: 0 0 4px 0 var(--uui-look-danger-border, #d42054),
          inset 0 0 2px 0 var(--uui-look-danger-border, #d42054);
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
        border: 2px solid var(--uui-interface-select, #1b264f);
        border-radius: calc(var(--uui-size-border-radius, 3px) + 2px);
        box-shadow: 0 0 4px 0 var(--uui-interface-select, #1b264f),
          inset 0 0 2px 0 var(--uui-interface-select, #1b264f);
        pointer-events: none;
        opacity: 0;
        transition: opacity 80ms;
      }
      :host([selected]) #select-border {
        opacity: 1;
      }
      :host([selectable]:not([selected]):hover) #select-border {
        opacity: 0.33;
      }
      :host([selectable][selected]:hover) #select-border {
        opacity: 0.66;
      }

      :host([selectable]:not([selected])) #open-part:hover + #select-border {
        opacity: 0;
      }
      :host([selectable][selected]) #open-part:hover + #select-border {
        opacity: 1;
      }
    `,
  ];

  constructor() {
    super();
    this.addEventListener('click', this.toggleSelect);
    this.addEventListener('keydown', this.handleSelectKeydown);
  }

  private _selectable = false;
  @property({ type: Boolean, reflect: true })
  get selectable() {
    return this._selectable;
  }

  set selectable(newVal) {
    const oldVal = this._selectable;
    this._selectable = newVal;
    this.setAttribute('tabindex', `${newVal ? '0' : '-1'}`);
    this.requestUpdate('selected', oldVal);
  }

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: Boolean, reflect: true })
  error = false;

  private toggleSelect() {
    if (this.selectable) this.selected = !this.selected;
    if (this.selected)
      this.dispatchEvent(new UUICardEvent(UUICardEvent.SELECTED));
  }

  select() {
    this.selected = true;
  }

  deselect() {
    this.selected = false;
  }

  private handleSelectKeydown(e: KeyboardEvent) {
    // TODO: Is it correct to both be able to select with space and enter?
    if (e.key !== ' ' && e.key !== 'Enter') return;
    e.preventDefault();
    this.toggleSelect();
  }

  protected handleOpenClick(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(new UUICardEvent(UUICardEvent.OPEN));
  }
  protected handleOpenKeydown(e: KeyboardEvent) {
    // TODO: Is it correct to both be able to open by space and enter? We to investigate, i would think that enter was the only option.
    if (e.key !== ' ' && e.key !== 'Enter') return;
    e.preventDefault();
    e.stopPropagation();
    this.dispatchEvent(new UUICardEvent(UUICardEvent.OPEN));
  }
}
