import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property } from 'lit/decorators.js';
import { UUIFileSize } from './UUIFileSize';

import { css, html, LitElement } from 'lit';

/**
 * @element uui-file-preview
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

      #file-icon {
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

  @property({ type: String })
  public name: string = '';

  @property({ type: String })
  public extension: string = '';

  @property({ type: String })
  public thumbnail: string = '';

  @property({ type: Number })
  public size: number = 0;

  @property({ type: Boolean })
  public isDirectory: boolean = false;

  private fileTypeTemplate() {
    if (this.isDirectory) {
      return html`<uui-symbol-folder id="file-icon"></uui-symbol-folder>`;
    }
    if (this.thumbnail) {
      return html`<uui-symbol-file-thumbnail
        id="file-icon"></uui-symbol-file-thumbnail>`;
    }

    return html`<uui-symbol-file
      id="file-icon"
      .type=${this.extension}></uui-symbol-file>`;
  }

  private renderLongName() {
    const endCharCount = 6;
    const nameStart = this.name.substring(0, this.name.length - endCharCount);
    const nameEnd = this.name.substring(
      this.name.length - endCharCount,
      this.name.length
    );
    return html`
      <span id="file-name">
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
