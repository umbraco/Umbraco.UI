import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

/**
 *  @element uui-file-symbol
 */

export class UUIImageFileSymbolElement extends LitElement {
  static styles = [
    css`
      :host {
        position: relative;
        display: block;
      }

      #image-wrapper {
        position: absolute;
        top: 13%;
        bottom: 16%;
        left: 25%;
        right: 26%;
        z-index: -1;
        clip-path: polygon(60% 0, 100% 25%, 100% 100%, 0 100%, 0 0);
      }

      #image-wrapper > img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    `,
  ];

  @property({ attribute: false })
  source = '';

  @property({ attribute: false })
  type = '';

  render() {
    return html`
      <!-- TODO: figure out how we use other components, so we dont use their custom element tag name. -->
      <uui-file-symbol .type=${this.type}></uui-file-symbol>
      <div id="image-wrapper">
        <img .src=${this.source} alt="" />
      </div>
    `;
  }
}
