import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { demandCustomElement } from '@umbraco-ui/uui-base/lib/utils';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { iconPicture } from '@umbraco-ui/uui-icon-registry-essential/lib/svgs';

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

  connectedCallback(): void {
    super.connectedCallback();
    demandCustomElement(this, 'uui-icon');
  }

  render() {
    return this.src
      ? html`<img src=${this.src} alt=${this.alt} />`
      : html`<uui-icon
          name="picture"
          .fallback=${iconPicture.strings[0]}></uui-icon>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-symbol-file-thumbnail': UUISymbolFileThumbnailElement;
  }
}
