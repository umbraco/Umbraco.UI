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
        /* Styles goes here */
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
      return html`<uui-symbol-file-thumbnail></uui-symbol-file-thumbnail>`;
    }
    if (this.thumbnail) {
      return html`<uui-symbol-file-thumbnail></uui-symbol-file-thumbnail>`;
    }

    return html`<uui-symbol-file .type=${this.extension}></uui-symbol-file>`;
  }

  render() {
    return html`<slot name="actions"> </slot>
      ${this.fileTypeTemplate()}
      <span id="file-name">
        ${this.name}
        ${this.size && !this.isDirectory
          ? html`<br />
              ${UUIFileSize.humanFileSize(this.size, true)}`
          : ''}
      </span> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-file-preview': UUIFilePreviewElement;
  }
}
