import {
  LitElement,
  html,
  css,
  property,
  query,
  internalProperty,
} from 'lit-element';
import { nothing } from 'lit-html';
import { UUIIconElement } from '../uui-icon/uui-icon.element';
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

      :host([selectable]) {
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

      :host([type='node']) {
        min-width: 250px;
      }

      :host([type='file']) {
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

      /* slot[name='badge']::slotted(uui-badge) {
        position: absolute;
        top: 0;
        left: 0;
      } */

      #card-content {
        width: 100%;
        padding: var(--uui-size-space-4, 24px);
      }

      #title-area {
        display: flex;
        position: relative;
        font-weight: 700;
        align-items: center;

        margin: calc(-1 * var(--uui-size-base-unit, 6px))
          calc(-1 * var(--uui-size-base-unit, 6px)) var(--uui-size-small, 12px);
      }

      #title-area > span {
        vertical-align: center;
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

  @internalProperty()
  hasAsset = false;

  @internalProperty()
  hasImage = false;

  private getAssets(): Array<UUIIconElement | HTMLImageElement> {
    return this.assetSlot
      ? (this.assetSlot
          .assignedNodes({ flatten: true })
          .filter(
            el => el instanceof UUIIconElement || el instanceof HTMLImageElement
          ) as Array<UUIIconElement | HTMLImageElement>)
      : [];
  }

  handleClick(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(new UUICardEvent(UUICardEvent.CLICK_TITLE));
    if (this.clickCallback) this.clickCallback();
  }

  // checkSlottedInstance(el) {

  // }

  handleSlotChnage() {
    const slotted = this.getAssets();

    this.hasAsset = !!slotted.length;
    this.hasImage = slotted.some(el => el instanceof HTMLImageElement);
    if (this.hasImage) this.type = 'picture';
  }

  render() {
    return html`${!this.hasAsset
        ? html`<div id="card-content">
            <div id="title-area">
              <slot name="icon"></slot>
              <span> ${this.title} </span>
              <slot name="badge"></slot>
            </div>
            <div>
              <slot></slot>
            </div>
          </div>`
        : nothing}
      <slot name="asset" @slotchange=${this.handleSlotChnage}></slot>
      ${this.hasAsset
        ? html`<div id="details" @click=${this.handleClick}>
            <uui-icon
              id="info-icon"
              name="info"
              style="color:currentColor"
            ></uui-icon
            ><span> ${this.title} </span>
          </div>`
        : nothing}`;
  }
}
