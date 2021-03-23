import { LitElement, html, css, property, query } from 'lit-element';
import { CardType } from '../../../type/CardType';
import { UUICardEvent } from './UUICardEvents';
/**
 *  @element uui-card
 *  @fires {UUICardEvent} click-title - fires when the media card title is clicked
 *  @slot - for things
 * @slot {img} - for things
 *  @description - Card to display your media or conmtent nodes
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
        min-width: calc(var(--uui-size-xxlarge, 66px) * 2);
        min-height: calc(var(--uui-size-xxlarge, 66px) * 2);
        margin: 6px;
        background-color: var(--uui-interface-surface, white);

        /* background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill-opacity=".25"><path d="M50 0h50v50H50zM0 50h50v50H0z"/></svg>'); */
        /* background-size: 10px 10px;
        background-repeat: repeat; */
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
        opacity: 0;
        transition: all 0.15s ease-in-out;
      }

      :host([selectable]:hover)::before {
        border: 2px solid var(--uui-interface-selected, #1b264f);
        box-shadow: 0 0 4px 0 var(--uui-interface-selected, #1b264f),
          inset 0 0 2px 0 var(--uui-interface-selected, #1b264f);
        opacity: 0.3;
      }

      :host([selectable]) #details {
        cursor: pointer;
      }

      :host([selected])::before {
        border: 2px solid var(--uui-interface-selected, #1b264f);
        box-shadow: 0 0 4px 0 var(--uui-interface-selected, #1b264f),
          inset 0 0 2px 0 var(--uui-interface-selected, #1b264f);
        opacity: 1;
      }

      :host([selected]:hover)::before {
        border: 2px solid var(--uui-interface-selected, #1b264f);
        box-shadow: 0 0 4px 0 var(--uui-interface-selected, #1b264f),
          inset 0 0 2px 0 var(--uui-interface-selected, #1b264f);
        opacity: 0.6;
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

      ::slotted(ul) {
        font-size: var(--uui-size-small, 12px);
        line-height: calc(2 * var(--uui-size-xsmall, 9px));
      }

      :host([type='user']) ::slotted(:not(uui-avatar)) {
        font-size: var(--uui-size-small, 12px);
        line-height: calc(2 * var(--uui-size-xsmall, 9px));
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

      slot[name='badge']::slotted(uui-badge) {
        --uui-badge-inset: 12px 12px auto auto;
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
        padding: var(--uui-size-space-4, 24px);
      }

      :host([type='user']) #card-content,
      :host([type='node']) #card-content {
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
  }

  @query('slot[name="asset"]')
  assetSlot!: HTMLSlotElement;

  @property({ type: Boolean, reflect: true })
  selectable = false;

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property()
  title = '';

  @property({ attribute: false })
  clickCallback: Function = () => {
    return;
  };

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
    if (this.clickCallback) this.clickCallback();
  }

  //* Templates to specifiuc card types

  //* types: user, node
  get nodeUserTemplate() {
    return html`<div id="card-content">
      <slot name="badge"></slot>
      <slot name="avatar"></slot>
      <div id="title-area" @click=${this.handleClick}>
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
