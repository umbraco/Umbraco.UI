import { css, html } from 'lit';
import { property } from 'lit/decorators';
import { UUICardElement } from '../uui-card/uui-card.element';

/**
 *  @element cdg-product-card
 *  @slot - for stuff
 *  @description - A card that will show your awesome product
 */

export class UUIProductCardElement extends UUICardElement {
  static styles = [
    ...UUICardElement.styles,
    css`
      #open-part {
        position: absolute;
        bottom: 0;
        width: 100%;
        background-color: var(--uui-color-white, #ffff);
        color: var(--uui-color-black, #0000);
        border: none;
        cursor: pointer;
        border-top: 1px solid rgba(0, 0, 0, 0.04);
        border-radius: 0 0 var(--uui-size-border-radius, 3px)
          var(--uui-size-border-radius, 3px);
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        font-family: inherit;
        font-size: 1.2rem;
        box-sizing: border-box;
        padding: var(--uui-size-base-unit, 6px) var(--uui-size-small, 12px);
      }

      #open-part:hover,
      #open-part:focus {
        /* text-decoration: underline; */
        color: var(--uui-interface-contrast-hover);
      }

      slot:not([name])::slotted(*) {
        align-self: center;
        border-radius: var(--uui-size-border-radius, 3px);
        object-fit: cover;
        width: 100%;
        height: 100%;
      }

      slot[name='tag'] {
        position: absolute;
        top: 6px;
        right: 6px;
        display: flex;
        justify-content: right;
      }

      /* :host([image]:not([image=''])) #open-part {
        transition: opacity 0.5s 0.5s;
        opacity: 0;
      }

      :host([image]:not([image='']):hover, [image]:not([image='']):focus, [image]:not([image='']):focus-within, [selected][image]:not([image='']), [error][image]:not([image='']))
        #open-part {
        opacity: 1;
        transition-duration: 120ms;
        transition-delay: 0s;
      } */

      #tag {
        position: absolute;
        top: 6px;
        right: 6px;
        display: flex;
        justify-content: right;
      }

      #name-container {
        margin-bottom: var(--uui-size-small, 12px);
        font-weight: 600;
      }

      #price-container {
        font-size: 1rem;
      }

      #info-icon {
        margin-right: var(--uui-size-base-unit, 6px);
        display: inline-flex;
        height: var(--uui-size-medium, 24px);
      }
    `,
  ];

  @property()
  name = 'Recycle your mind';

  @property({ type: Number })
  price = 99.99;

  @property({ type: Boolean })
  available = false;

  showAvailibility() {
    return this.available
      ? html`<uui-tag id="tag" look="positive">Available</uui-tag>`
      : html`<uui-tag id="tag" look="danger">Out of stock</uui-tag>`;
  }

  public render() {
    return html`${this.showAvailibility()}<slot></slot>
      <button
        id="open-part"
        tabindex="0"
        @click=${this.handleOpenClick}
        @keydown=${this.handleOpenKeydown}
      >
        <div id="name-container">
          <uui-icon
            id="info-icon"
            name="bug"
            style="color: currentColor"
          ></uui-icon
          ><span id="name"> ${this.name} </span>
        </div>
        <div id="price-container"><span id="price"> ${this.price}$ </span></div>
      </button>`;
  }
}
