import { LitElement, html, css, property, query, unsafeCSS } from 'lit-element';
import { CardType, CardTypeNames } from '../../../type/CardType';
import { UUICardEvent } from './UUICardEvents';
/**
 *  @element uui-card
 *  @fires {UUICardEvent} click-title - fires when the media card title is clicked
 *  @slot - for things
 * @slot {img} - for things
 *  @description - Card to display your media or conmtent nodes
 */

//TODO dont show hover border when hovering on the clickable link part

const allCardTypesSelector = `${CardTypeNames.map(
  cardType => `[type="${cardType}"]`
).join(',')}`;

export class UUICardElement extends LitElement {
  static styles = [
    css`
      :host {
        position: relative;
        display: flex;
        justify-content: center;
        box-shadow: 0 1px 1px 0 var(--uui-interface-border);
        border-radius: var(--uui-size-border-radius, 3px);
        min-width: calc(var(--uui-size-xxlarge, 66px) * 2);
        min-height: calc(var(--uui-size-xxlarge, 66px) * 2);
        margin: 6px;
        background-color: var(--uui-interface-surface, white);
        /* --uui-card-before-opacity: 0; */
        transition: --uui-card-before-opacity 0.15s ease-in-out;
      }

      :host:before {
        content: '';
        position: absolute;
        z-index: 2;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        border-radius: var(--uui-size-border-radius, 3px);
        pointer-events: none;
        opacity: var(--uui-card-before-opacity);
        transition: all 0.15s ease-in-out;
      }

      :host([selectable]:hover)::before {
        border: 2px solid var(--uui-interface-selected, #1b264f);
        box-shadow: 0 0 4px 0 var(--uui-interface-selected, #1b264f),
          inset 0 0 2px 0 var(--uui-interface-selected, #1b264f);

        opacity: var(--uui-card-before-opacity);
      }

      :host([selectable]) #details {
        cursor: pointer;
      }

      :host([selected])::before {
        border: 2px solid var(--uui-interface-selected, #1b264f);
        box-shadow: 0 0 4px 0 var(--uui-interface-selected, #1b264f),
          inset 0 0 2px 0 var(--uui-interface-selected, #1b264f);
        opacity: var(--uui-card-before-opacity);
      }

      :host([selected]:hover)::before {
        /* border: 2px solid var(--uui-interface-selected, #1b264f);
        box-shadow: 0 0 4px 0 var(--uui-interface-selected, #1b264f),
          inset 0 0 2px 0 var(--uui-interface-selected, #1b264f); */
        opacity: var(--uui-card-before-opacity);
      }

      :host([type='node']),
      :host([type='user']) {
        min-width: 250px;
      }

      :host([type='media']) {
        max-width: 200px;
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
        /* change this color to something more suitable */
        color: var(--uui-interface-contrast-disabled);
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

      :host([type='user'], [type='node']) #card-content {
        padding: var(--uui-size-space-3, 12px);
      }

      :host(:not(${unsafeCSS(allCardTypesSelector)})) {
        padding: var(--uui-size-space-4, 24px);
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

        /* margin: calc(-1 * var(--uui-size-base-unit, 6px))
          calc(-1 * var(--uui-size-base-unit, 6px)) var(--uui-size-small, 12px); */
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
        /* line-height: var(--uui-size-small, 12px); */
      }

      #title-area:hover > span {
        text-decoration: underline;
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
        transform: translateY(20%);
        transition: all 0.3s ease-in-out;
      }

      :host([type='file']) #details {
        opacity: 0.9;
        transform: translateY(0%);
        border-top: 1px solid rgba(0, 0, 0, 0.04);
      }

      :host(:hover) #details {
        opacity: 0.9;
        transform: translateY(0%);
      }

      :host([selected]) #details {
        opacity: 0.9;
        transform: translateY(0%);
      }

      #info-icon {
        margin-right: var(--uui-size-base-unit, 6px);
        display: flex;
        height: var(--uui-size-medium, 24px);
      }

      #details > span:hover {
        text-decoration: underline;
      }
    `,
  ];

  constructor() {
    super();
    this.addEventListener('click', this.toggleSelect);
    this.addEventListener('mouseenter', this.handleMouseEneter);
    this.addEventListener('mouseleave', this.handleMouseLeave);
  }

  @query('slot[name="asset"]')
  assetSlot!: HTMLSlotElement;

  @query(':host::before')
  hostBefore!: HTMLElement;

  @query('#title-area')
  titleArea!: HTMLElement;

  @property({ type: Boolean, reflect: true })
  selectable = false;

  private _selected = false;
  @property({ type: Boolean, reflect: true })
  get selected() {
    return this._selected;
  }

  set selected(newVal) {
    const oldVal = this._selected;
    this._selected = newVal;
    this.style.setProperty(
      '--uui-card-before-opacity',
      `${newVal ? '1' : '0.3'}`
    );

    this.requestUpdate('selected', oldVal);
  }

  @property()
  title = '';

  @property({ reflect: true })
  type: CardType = null;

  toggleSelect() {
    if (this.selectable) this.selected = !this.selected;
  }

  select() {
    this.selected = true;
  }

  deselect() {
    this.selected = false;
  }

  handleClick(e: Event) {
    console.log('zabba');
    e.stopPropagation();
    this.dispatchEvent(new UUICardEvent(UUICardEvent.CLICK_TITLE));
  }

  handleMouseEneter(e: MouseEvent) {
    if (e.target === this && !this.selected)
      this.style.setProperty('--uui-card-before-opacity', '0.3');

    if (e.target === this && this.selected)
      this.style.setProperty('--uui-card-before-opacity', '0.6');

    if (e.target === this.titleArea && this.selected)
      this.style.setProperty('--uui-card-before-opacity', '0');
  }

  handleMouseLeave(e: MouseEvent) {
    if (e.target === this && !this.selected)
      this.style.setProperty('--uui-card-before-opacity', '0');

    if (e.target === this && this.selected)
      this.style.setProperty('--uui-card-before-opacity', '1');

    if (e.target === this.titleArea && this.selected)
      this.style.setProperty('--uui-card-before-opacity', '0.6');
    if (e.target === this.titleArea && !this.selected)
      this.style.setProperty('--uui-card-before-opacity', '0.3');
  }

  //* Templates to specific card types

  //* types: user, node
  get nodeUserTemplate() {
    return html`<div id="card-content">
      <slot name="tag"></slot>
      <slot name="avatar"></slot>
      <div
        id="title-area"
        @click=${this.handleClick}
        @mouseenter=${this.handleMouseEneter}
        @mouseleave=${this.handleMouseLeave}
      >
        <slot name="icon"></slot>
        <span> ${this.title} </span>
      </div>

      <slot></slot>
    </div>`;
  }

  //* types: image, file
  get mediaTemplate() {
    return html`<slot name="asset"></slot>
      <div id="details" @click=${this.handleClick}>
        <uui-icon
          id="info-icon"
          name="info"
          style="color:currentColor"
        ></uui-icon
        ><span> ${this.title} </span>
      </div>`;
  }

  //* No type
  get noTypeTemplate() {
    return html`<slot></slot>`;
  }

  private _renderCardType(type: CardType) {
    switch (type) {
      case 'file':
      case 'image':
        return this.mediaTemplate;

      case 'user':
      case 'node':
        return this.nodeUserTemplate;

      case null:
        return this.noTypeTemplate;
    }
  }

  render() {
    return html`${this._renderCardType(this.type)}`;
  }
}
