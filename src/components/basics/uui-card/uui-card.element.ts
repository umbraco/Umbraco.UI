import { LitElement, html, css, property, svg } from 'lit-element';
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
        box-shadow: 0 1px 1px 0 rgb(0 0 0 / 20%);
        border-radius: 3px;
        min-width: 125px;
        min-height: 125px;
        margin: 6px;
        background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill-opacity=".25"><path d="M50 0h50v50H50zM0 50h50v50H0z"/></svg>');
        background-color: #e9e9eb;
        background-size: 10px 10px;
        background-repeat: repeat;
      }

      :host:before {
        content: '';
        position: absolute;
        z-index: 2;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        border-radius: 5px;
        pointer-events: none;
        opacity: 0;
        transition: all 0.15s ease-in-out;
      }

      :host([selectable]:hover)::before {
        border: 2px solid #3544b1;
        box-shadow: 0 0 4px 0 #1d2663, inset 0 0 2px 0 #1d2663;
        opacity: 0.3;
      }

      :host([selectable]) {
        cursor: pointer;
      }

      :host([selected])::before {
        border: 2px solid #3544b1;
        box-shadow: 0 0 4px 0 #1d2663, inset 0 0 2px 0 #1d2663;
        opacity: 1;
      }

      :host([selected]:hover)::before {
        border: 2px solid #3544b1;
        box-shadow: 0 0 4px 0 #1d2663, inset 0 0 2px 0 #1d2663;
        opacity: 0.6;
      }

      slot[name='img']::slotted(img) {
        align-self: center;
        border-radius: 3px;
        object-fit: cover;
        width: 100%;
        height: 100%;
      }

      #details {
        position: absolute;
        bottom: 0;
        width: 100%;
        background-color: #ffffff;
        opacity: 0;
        border-radius: 0 0 3px 3px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 12px;
        box-sizing: border-box;
        padding: 6px 12px;
        transform: translateY(20%);
        transition: all 0.3s ease-in-out;
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
        margin-right: 6px;
        display: flex;
        height: var(--uui-size-medium);
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

  @property({ type: Boolean, reflect: true })
  selectable = false;

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property()
  title = '';

  @property({ type: Object, attribute: false })
  clickCallback: Function = () => {
    return;
  };

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
    e.stopPropagation();
    this.dispatchEvent(new UUICardEvent(UUICardEvent.CLICK_TITLE));
    if (this.clickCallback) this.clickCallback();
  }

  render() {
    return html`<slot></slot>
      <slot name="img"></slot>
      <div id="details" @click=${this.handleClick}>
        <uui-icon
          id="info-icon"
          name="info"
          style="color:currentColor"
        ></uui-icon
        ><span> ${this.title} </span>
      </div>`;
  }
}
