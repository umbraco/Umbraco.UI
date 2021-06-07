import { css, html } from 'lit';
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
      :host {
        display: block;
        border: 1px solid red;
      }

      slot:not([name])::slotted(*) {
        align-self: center;
        border-radius: var(--uui-size-border-radius, 3px);
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    `,
  ];

  public render() {
    return html`<slot></slot>`;
  }
}
