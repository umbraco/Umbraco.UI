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

      /*

      :host([type='node']),
      :host([type='user']) {
        min-width: 250px;
      }

      slot[name='asset']::slotted(img) {
        align-self: center;
        border-radius: var(--uui-size-border-radius, 3px);
        object-fit: cover;
        width: 100%;
        height: 100%;
      }

      :host([type='user'], [type='node'])
        ::slotted(:not(uui-avatar, uui-tag, uui-badge)) {
        font-size: var(--uui-size-small, 12px);
        line-height: calc(2 * var(--uui-size-xsmall, 9px));
      }

      :host([type='user']) ::slotted(*) {
        text-align: center;
      }

      slot[name='asset']::slotted(uui-icon) {
        align-self: center;
        font-size: var(--uui-size-xlarge);
        // change this color to something more suitable
        color: var(--uui-interface-contrast-disabled);
        transform: translateY(
          calc(
            -1 * var(--uui-size-medium, 24px) + var(--uui-size-base-unit, 6px) *
              2
          )
        );
      }

      slot[name='asset']::slotted(uui-file-icon) {
        align-self: center;
        margin: var(--uui-size-xlarge);
        width: 80%;

        transform: translateY(
          calc(
            -1 * var(--uui-size-medium, 24px) + var(--uui-size-base-unit, 6px) *
              2
          )
        );
      }

      slot[name='tag']::slotted(uui-tag) {
        position: absolute;
        top: 6px;
        right: 6px;
      }

      slot[name='avatar']::slotted(uui-avatar) {
        margin-bottom: 12px;
      }

      #card-content {
        width: 100%;
        display: flex;
        position: relative;
        flex-direction: column;
        justify-content: space-between;
      }

      :host([type='node']) #card-content,
      :host([type='user']) #card-content {
        padding: var(--uui-size-space-3, 12px);
      }

      :host([type='user']) #card-content {
        align-items: center;
      }

      #title-area {
        display: flex;
        position: relative;
        font-weight: 700;
        align-items: center;
        cursor: pointer;
      }

      slot[name='icon']::slotted(uui-icon) {
        font-size: 1.2em;
      }

      :host([type='user']) #title-area {
        margin: 0 0 3px 0;
      }

      #title-area > span {
        vertical-align: center;
        margin-left: 0.5em;
        margin-top: 3px;
      }

      #title-area:hover,
      #title-area:focus {
        text-decoration: underline;
        outline-color: #6ab4f0;
      }

      #details {
        position: absolute;
        bottom: 0;
        width: 100%;
        background-color: var(--uui-color-white, #ffff);
        color: var(--uui-color-black, #0000);
        opacity: 0;
        border-radius: 0 0 var(--uui-size-border-radius, 3px)
          var(--uui-size-border-radius, 3px);
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: var(--uui-size-small, 12px);
        box-sizing: border-box;
        padding: var(--uui-size-base-unit, 6px) var(--uui-size-small, 12px);
        transition: opacity 120ms;
      }

      :host([type='file']) #details {
        opacity: 0.9;
        border-top: 1px solid rgba(0, 0, 0, 0.04);
      }

      :host(:hover) #details,
      :host(:focus, :focus-within) #details {
        opacity: 0.9;
      }

      :host([selected]) #details {
        opacity: 0.9;
      }

      #info-icon {
        margin-right: var(--uui-size-base-unit, 6px);
        display: flex;
        height: var(--uui-size-medium, 24px);
      }

      #details:hover,
      #details:focus {
        text-decoration: underline;
        outline-color: #6ab4f0;
      }
      */
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

  //* Templates to specific card types

  /*
  // types: user, node
  get nodeUserTemplate() {
    return html`<div id="card-content">
      <slot name="tag"></slot>
      <slot name="avatar"></slot>
      <div
        id="open-part"
        tabindex="0"
        @click=${this.handleOpenClick}
        @keydown=${this.handleOpenKeydown}
      >
        <slot name="icon"></slot>
        <span> ${this.title} </span>
      </div>
      <!-- Select border must be right after .open-part -->
      <div id="select-border"></div>

      <slot></slot>
    </div>`;
  }

  // types: image, file
  get mediaTemplate() {
    return html`<slot name="asset"></slot>
      <div
        id="open-part"
        tabindex="0"
        @click=${this.handleOpenClick}
        @keydown=${this.handleOpenKeydown}
      >
        <uui-icon
          id="info-icon"
          name="info"
          style="color:currentColor"
        ></uui-icon
        ><span> ${this.title} </span>
      </div>
      <!-- Select border must be right after .open-part -->
      <div id="select-border"></div>`;
  }

  // No type
  get noTypeTemplate() {
    return html`<slot></slot>`;
  }

  */
}
