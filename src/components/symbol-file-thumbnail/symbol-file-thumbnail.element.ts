import { css, html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';

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

  @state()
  private _imageError = false;

  protected override willUpdate(changed: Map<string, unknown>) {
    if (changed.has('src')) {
      this._imageError = false;
    }
  }

  render() {
    return when(
      this.src && !this._imageError,
      () =>
        html`<img
          src=${this.src}
          alt=${this.alt}
          @error=${this.#onImageError} />`,
      () =>
        html`<uui-icon
          name="picture"
          .fallback=${iconPicture.strings[0]}></uui-icon>`,
    );
  }

  #onImageError() {
    this._imageError = true;
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
