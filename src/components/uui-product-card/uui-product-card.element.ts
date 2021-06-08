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
      #product-info {
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

      #product-info:hover,
      #product-info:focus {
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
        color: currentColor;
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
    return html`${this.showAvailibility()}
      <slot></slot>
      <button id="product-info">
        <div id="name-container">
          <uui-icon id="info-icon" name="bug"></uui-icon
          ><span id="name"> ${this.name} </span>
        </div>
        <div id="price-container">
          <span id="price"> ${this.price}$ </span>
        </div>
      </button>`;
  }
}
