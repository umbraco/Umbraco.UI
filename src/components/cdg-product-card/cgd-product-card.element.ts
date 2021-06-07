import { css, html, LitElement } from 'lit';

/**
 *  @element cdg-product-card
 *  @slot - for stuff
 *  @description - A card that will show your awesome product
 */

export class CdgProductCardElement extends LitElement {
  static styles = [css``];

  render() {
    return html`<slot></slot>`;
  }
}
