import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property } from 'lit/decorators.js';
import { UUIFileSize } from './UUIFileSize';

import { css, html, LitElement } from 'lit';

/**
 *  @element uui-file-preview
 *  @slot actions - To display one or more actions that can be executed on the file.
 *  @description - A file preview with file size.
 */
@defineElement('uui-file-preview')
export class UUIFilePreviewElement extends LitElement {
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

  /**
   * Name of the file.
   * @type {string}
   * @attr
   * @default ''
   */
  @property({ type: String })
  public name: string = '';

  /**
   * Link to the source of the file. Applied on the file name.
   * @type {string}
   * @attr
   * @default ''
   */
  @property({ type: String })
  public source: string = '';

  /**
   * File extension. Will be shown in the square on the file symbol. If a thumbnail is provided, then that will show instead.
   * @type {string}
   * @attr
   * @default ''
   */
  @property({ type: String })
  public extension: string = '';

  /**
   * Source of a thumbnail to be displayed as the file symbol. Often used for images and video thumbnails.
   * @type {string}
   * @attr
   * @default ''
   */
  @property({ type: String })
  public thumbnail: string = '';

  /**
   * Size of the file in bytes. It will be formatted to a more readable format.
   * @type {number}
   * @attr
   * @default 0
   */
  @property({ type: Number })
  public size: number = 0;

  /**
   * Dertermines if a folder symbol should be used instead of file symbol.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean })
  public isDirectory: boolean = false;

  private openSource() {
    window.open(this.source, '_blank');
  }

  private fileTypeTemplate() {
    if (this.isDirectory) {
      return html`<uui-symbol-folder id="file-symbol"></uui-symbol-folder>`;
    }
    if (this.thumbnail) {
      return html`<uui-symbol-file-thumbnail
        .source=${this.thumbnail}
        .alt=${this.name}
        id="file-symbol"></uui-symbol-file-thumbnail>`;
    }

    return html`<uui-symbol-file
      id="file-symbol"
      .type=${this.extension}></uui-symbol-file>`;
  }

  private renderLongName() {
    const endCharCount = 6;
    const nameStart = this.name.substring(0, this.name.length - endCharCount);
    const nameEnd = this.name.substring(
      this.name.length - endCharCount,
      this.name.length
    );
    //TODO Fix keyboard event listener
    return html`
      <span
        id="file-name"
        class=${this.source ? 'has-source' : ''}
        @click=${() => (this.source ? this.openSource() : '')}
        @keydown=${() => ''}>
        <span id="file-name-start">${nameStart}</span>
        <span id="file-name-end">${nameEnd}</span>
      </span>
    `;
  }

  render() {
    return html`
      <slot id="actions" name="actions"></slot>
      ${this.fileTypeTemplate()}
      <div id="file-info">
        ${this.renderLongName()}
        <span id="file-size">
          ${this.size && !this.isDirectory
            ? html`${UUIFileSize.humanFileSize(this.size, true)}`
            : ''}
        </span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-file-preview': UUIFilePreviewElement;
  }
}
