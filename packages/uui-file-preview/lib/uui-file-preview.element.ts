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
        display: inline-block;
      }

      :host(:hover) slot[name='actions']::slotted(*) {
        opacity: 1;
      }

      #file-preview {
        position: relative;
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 1fr 2rem;
        box-shadow: var(--uui-shadow-depth-1);
        background: white;
        width: 200px;
        box-sizing: border-box;
        border-radius: 4px;
        aspect-ratio: 1;
      }

      slot[name='actions']::slotted(*) {
        position: absolute;
        top: 8px;
        right: 8px;
        max-width: 100%;
        height: 28px;
        font-size: 12px;
        opacity: 0;
      }

      #file-icon {
        max-width: 50px;
        margin: auto;
      }

      #file-info {
        display: grid;
        font-size: 0.8rem;
        grid-template-columns: 1fr 1fr;
        padding: 4px 8px;
        border-top: 1px solid var(--uui-interface-border);
      }

      #file-size {
        text-align: end;
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

  render() {
    return html`
      <div id="file-preview">
        <slot id="actions" name="actions"></slot>
        ${this.fileTypeTemplate()}
        <div id="file-info">
          <span id="file-name">${this.name}</span>
          <span id="file-size">
            ${this.size && !this.isDirectory
              ? html`${UUIFileSize.humanFileSize(this.size, true)}`
              : ''}
          </span>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-file-preview': UUIFilePreviewElement;
  }
}
