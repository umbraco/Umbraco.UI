import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

/**
 * @element uui-symbol-file-thumbnail
 * @description - Symbol to display a thumbnail.
 */
@defineElement('uui-symbol-file-thumbnail')
export class UUISymbolFileThumbnailElement extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }

      img {
        object-fit: contain;
        height: 100%;
        width: 100%;
      }
    `,
  ];

  /**
   * Source of the thumbnail.
   * @type {string}
   * @attr
   * @default ''
   */
  @property({ type: String })
  src: string = '';

  /**
   * Alt of the thumbnail.
   * @type {string}
   * @attr
   * @default ''
   */
  @property({ type: String })
  alt: string = '';

  render() {
    return html`<img src=${this.src} alt=${this.alt} />`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-symbol-file-thumbnail': UUISymbolFileThumbnailElement;
  }
}
