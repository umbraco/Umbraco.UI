import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { iconPicture } from '../icon-registry-essential/svgs/index.js';

import '../icon/icon.js';

/**
 * @element uui-symbol-file-thumbnail
 * @description - Symbol to display a thumbnail.
 */
export class UUISymbolFileThumbnailElement extends LitElement {
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
    return this.src
      ? html`<img src=${this.src} alt=${this.alt} />`
      : html`<uui-icon
          name="picture"
          .fallback=${iconPicture.strings[0]}></uui-icon>`;
  }

  static override readonly styles = [
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

      uui-icon {
        width: 100%;
        height: 100%;
        max-width: 100%;
        display: flex;
        max-height: 100%;
        justify-content: center;
        color: var(--uui-color-surface);
        background: var(--uui-color-surface-alt);
      }
    `,
  ];
}
