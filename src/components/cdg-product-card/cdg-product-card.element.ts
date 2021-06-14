import { css, html } from 'lit';
import { property } from 'lit/decorators';
import { UUICardElement } from '../uui-card/uui-card.element';

export class CDGProductCardElement extends UUICardElement {
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
        font-weight: 700;
      }

      #price-container {
        margin-top: 6px;
        font-size: 1rem;
        width: 100%;
        text-align: right;
      }

      #info-icon {
        margin-right: var(--uui-size-base-unit, 6px);
        display: inline-flex;
        color: currentColor;
      }
    `,
  ];

  @property({ type: String })
  name = '';

  @property({ type: String })
  price = '';

  public render() {
    return html` <slot></slot>
      <button id="product-info">
        <div id="name-container">
          <uui-icon
            id="info-icon"
            name="document"
            svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M396.441 138.878l-83.997-83.993-7.331-7.333H105.702v416.701h298.071V146.214l-7.332-7.336zM130.74 439.217V72.591h141.613c37.201 0 19.274 88.18 19.274 88.18s86-20.901 87.104 18.534v259.912H130.74z"></path></svg>'
          ></uui-icon>
          <span id="name">${this.name}</span>
        </div>
        <div id="price-container">
          <span id="price">${this.price}</span>
        </div>
      </button>`;
  }
}
