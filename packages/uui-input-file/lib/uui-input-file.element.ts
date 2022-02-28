import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { state } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';

/**
 * @element uui-input-file
 */
@defineElement('uui-input-file')
export class UUIInputFileElement extends LitElement {
  static styles = [
    css`
      .file-item {
        display: grid;
        grid-template-columns: 32px 1fr 32px;
        border: 1px solid;
      }

      .file-item:not(:first-child) {
        border-top: none;
      }

      .file-item-name,
      .file-item-type,
      .file-item-remove {
        padding: 4px;
        display: flex;
      }

      .file-item-type,
      .file-item-remove {
        align-items: center;
        justify-content: center;
      }

      .file-item-remove {
        cursor: pointer;
      }

      .file-item-name {
        border-left: 1px solid black;
        border-right: 1px solid black;
      }
    `,
  ];

  @state()
  files: FileSystemEntry[] = [];

  private handleFileDrop(e: CustomEvent) {
    const newFiles = e.detail.files as FileSystemEntry[];
    this.files = [...this.files, ...newFiles];
  }

  private removeFile(index: number) {
    this.files.splice(index, 1);
    // Makes it rerender with the new files value
    this.files = [...this.files];
  }

  private renderFileItem(file: FileSystemEntry, index: number) {
    return html`<div class="file-item">
      <div class="file-item-type">${file.isFile ? 'F' : 'D'}</div>
      <div class="file-item-name">${file.name}</div>
      <div
        class="file-item-remove"
        @click=${() => this.removeFile(index)}
        @keydown=${() => ''}>
        &#10005;
      </div>
    </div>`;
  }

  render() {
    return html`
      <uui-file-dropzone @file-drop=${this.handleFileDrop}>
        <uui-button look="placeholder"> Hello throw files here plz </uui-button>
      </uui-file-dropzone>
      <div>
        UPLOADED FILES:
        ${this.files.map((file: FileSystemEntry, index: number) =>
          this.renderFileItem(file, index)
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-input-file': UUIInputFileElement;
  }
}
