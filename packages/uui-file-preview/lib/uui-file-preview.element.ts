import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property, state } from 'lit/decorators.js';
import { UUIFileSize } from './UUIFileSize';

import { css, html, LitElement } from 'lit';
import { demandCustomElement } from '@umbraco-ui/uui-base/lib/utils';

/**
 *  @element uui-file-preview
 *  @slot actions - To display one or more actions that can be executed on the file.
 *  @description - A file preview with file size.
 */
@defineElement('uui-file-preview')
export class UUIFilePreviewElement extends LitElement {
  /**
   * Name of the file.
   * @type {string}
   * @attr
   * @default ''
   */
  @state()
  private _name: string = '';

  /**
   * Link to the source of the file. Applied on the file name.
   * @type {string}
   * @attr
   * @default ''
   */
  @state()
  private _url: string = '';

  /**
   * File extension. Will be shown in the square on the file symbol. If a thumbnail is provided, then that will show instead.
   * @type {string}
   * @attr
   * @default ''
   */
  @state()
  private _extension: string = '';

  /**
   * Source of a thumbnail to be displayed as the file symbol. Often used for images and video thumbnails.
   * @type {string}
   * @attr
   * @default ''
   */
  @state()
  private _src: string = '';

  /**
   * Size of the file in bytes. It will be formatted to a more readable format.
   * @type {number}
   * @attr
   * @default 0
   */
  @state()
  private _size: number = 0;

  /**
   * Dertermines if a folder symbol should be used instead of file symbol.
   * @type {boolean}
   * @attr
   * @default false
   */
  @state()
  private _isDirectory: boolean = false;

  @state()
  private _file?: File;

  @state()
  private _isImage?: boolean;

  @property({ attribute: false })
  public get file() {
    return this._file;
  }
  public set file(newValue) {
    const oldValue = this._file;

    if (newValue instanceof File) {
      this._name = newValue.name.split('.')[0];
      this._extension = newValue.name.split('.')[1];
      this._isDirectory = false;
      this._size = newValue.size;

      if (this._isFileAnImage(newValue)) {
        this._isImage = true;
        this._getThumbnail(newValue).then(result => {
          this._src = result;
        });
      }

      this.requestUpdate('file', oldValue);
    }
  }

  connectedCallback(): void {
    super.connectedCallback();

    demandCustomElement(this, 'uui-symbol-file-thumbnail');
    demandCustomElement(this, 'uui-symbol-folder');
    demandCustomElement(this, 'uui-symbol-file');
  }

  private _openSource() {
    window.open(this._url, '_blank');
  }

  private _fileTypeTemplate() {
    if (this._isDirectory) {
      return html`<uui-symbol-folder id="file-symbol"></uui-symbol-folder>`;
    }
    if (this._isImage) {
      return html`<uui-symbol-file-thumbnail
        .src=${this._src}
        .alt=${this._name}
        id="file-symbol"></uui-symbol-file-thumbnail>`;
    }

    return html`<uui-symbol-file
      id="file-symbol"
      .type=${this._extension}></uui-symbol-file>`;
  }

  private _renderLongName() {
    const endCharCount = 6;
    const nameStart = this._name.substring(0, this._name.length - endCharCount);
    const nameEnd = this._name.substring(
      this._name.length - endCharCount,
      this._name.length,
    );
    //TODO Fix keyboard event listener
    return html`
      <span
        id="file-name"
        class=${this._url ? 'has-source' : ''}
        @click=${() => (this._url ? this._openSource() : '')}
        @keydown=${() => ''}>
        <span id="file-name-start">${nameStart}</span>
        <span id="file-name-end">${nameEnd}</span>
      </span>
    `;
  }

  private _isFileAnImage(file: File) {
    return file ? file['type'].split('/')[0] === 'image' : false;
  }

  private async _getThumbnail(file: File): Promise<any> {
    return await new Promise<any>(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result);
      };
    });
  }

  render() {
    return html`
      <slot id="actions" name="actions"></slot>
      ${this._fileTypeTemplate()}
      <div id="file-info">
        ${this._renderLongName()}
        <span id="file-size">
          ${this._size && !this._isDirectory
            ? html`${UUIFileSize.humanFileSize(this._size, true)}`
            : ''}
        </span>
      </div>
    `;
  }

  static styles = [
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

      .has-source:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-file-preview': UUIFilePreviewElement;
  }
}
