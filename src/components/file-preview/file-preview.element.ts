import { property, state } from 'lit/decorators.js';
import { UUIFileSize } from './UUIFileSize.js';

import { css, html, LitElement } from 'lit';

import '../symbol-folder/symbol-folder.js';
import '../symbol-file-thumbnail/symbol-file-thumbnail.js';
import '../symbol-file/symbol-file.js';

/**
 *  @element uui-file-preview
 *  @slot actions - To display one or more actions that can be executed on the file.
 *  @description - A file preview with file size.
 */
export class UUIFilePreviewElement extends LitElement {
  #file?: File;

  @state()
  private _src: string = '';

  @property({ attribute: false })
  public get file() {
    return this.#file;
  }
  public set file(newValue) {
    if (newValue instanceof File) {
      this.#file = newValue;
      this._src = '';

      if (this.#isImage(newValue)) {
        this.#loadThumbnail(newValue);
      }

      this.requestUpdate();
    }
  }

  #isImage(file: File) {
    return file.type.split('/')[0] === 'image';
  }

  #loadThumbnail(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this._src = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  #renderFileSymbol() {
    if (this.#file && this.#isImage(this.#file)) {
      const name = this.#file.name.split('.')[0];
      return html`<uui-symbol-file-thumbnail
        .src=${this._src}
        .alt=${name}
        id="file-symbol"></uui-symbol-file-thumbnail>`;
    }

    const extension = this.#file?.name.split('.')[1] ?? '';
    return html`<uui-symbol-file
      id="file-symbol"
      .type=${extension}></uui-symbol-file>`;
  }

  #renderName() {
    const name = this.#file?.name.split('.')[0] ?? '';
    const endCharCount = 6;
    const nameStart = name.substring(0, name.length - endCharCount);
    const nameEnd = name.substring(name.length - endCharCount, name.length);
    return html`
      <span id="file-name">
        <span id="file-name-start">${nameStart}</span>
        <span id="file-name-end">${nameEnd}</span>
      </span>
    `;
  }

  #renderSize() {
    const size = this.#file?.size ?? 0;
    if (!size) return '';
    return html`${UUIFileSize.humanFileSize(size, true)}`;
  }

  render() {
    return html`
      <slot id="actions" name="actions"></slot>
      ${this.#renderFileSymbol()}
      <div id="file-info">
        ${this.#renderName()}
        <span id="file-size">${this.#renderSize()}</span>
      </div>
    `;
  }

  static override readonly styles = [
    css`
      :host {
        position: relative;
        display: grid;
        /* These have to be changed together */
        grid-template-rows: 100px 50px;
        width: 150px;
        height: 150px;
        /* --------------------------------- */
        box-sizing: border-box;
        aspect-ratio: 1;
        color: var(--uui-color-text);
      }

      :host(:hover) slot[name='actions']::slotted(*) {
        opacity: 1;
      }

      slot[name='actions']::slotted(*) {
        position: absolute;
        top: 8px;
        right: 8px;
        max-width: 100%;
        height: 32px;
        font-size: 13px;
        opacity: 0;
        z-index: 1;
        transition: opacity 150ms;
      }

      #file-symbol {
        aspect-ratio: 1 / 1;
        margin: auto;
        max-width: 100%;
        max-height: 100%;
      }

      #file-info {
        min-width: 0;
        display: flex;
        text-align: center;
        flex-direction: column;
        font-size: 1rem;
      }

      #file-name {
        display: flex;
        justify-content: center;
      }

      #file-name-start {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      #file-name-end {
        white-space: nowrap;
      }

      #file-size {
        opacity: 0.6;
      }
    `,
  ];
}
