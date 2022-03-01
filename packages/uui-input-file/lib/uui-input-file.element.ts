import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { state } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';
import '@umbraco-ui/uui-action-bar/lib';
import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-icon/lib';
import '@umbraco-ui/uui-icon-registry-essential/lib';

/**
 * @element uui-input-file
 */
@defineElement('uui-input-file')
export class UUIInputFileElement extends LitElement {
  static styles = [
    css`
      :host {
        max-width: 100%;
      }
      #drop-button {
        width: 100%;
        height: 100px;
      }
      #files {
        margin-top: 16px;
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
      }
    `,
  ];

  @state()
  files: FileSystemEntry[] = [];

  private handleFileDrop(e: CustomEvent) {
    const newFiles = e.detail.files as FileSystemEntry[];
    this.files = [...this.files, ...newFiles];

    const folders: FileSystemEntry[][] = [];

    const sortByFolderCount = this.files.sort((a, b) => this.pathCompare(a, b));

    sortByFolderCount.forEach(file => {
      const index = file.fullPath.split('/').length - 2;

      if (!folders[index]) {
        folders[index] = [];
      }

      folders[index].push(file);
    });

    console.log('FILES', folders);
  }

  private pathCompare(a: FileSystemEntry, b: FileSystemEntry) {
    const aLength = a.fullPath.split('/').length;
    const bLength = b.fullPath.split('/').length;

    return aLength - bLength;
  }

  private removeFile(index: number) {
    this.files.splice(index, 1);
    // Makes it rerender with the new files value
    this.files = [...this.files];
  }

  private renderFileItem(file: FileSystemEntry, index: number) {
    const name = file.name.split('.')[0];
    const extension = file.name.split('.')[1];

    return html`<uui-file-preview
      .name=${name}
      .extension=${extension}
      .source=${'https://umbraco.com'}
      .size=${696969}
      .isDirectory=${file.isDirectory}>
      <uui-action-bar slot="actions">
        <uui-button @click=${() => this.removeFile(index)} look="danger">
          <uui-icon name="delete"></uui-icon>
        </uui-button>
      </uui-action-bar>
    </uui-file-preview>`;
  }

  render() {
    return html`
      <uui-icon-registry-essential>
        <uui-file-dropzone @file-drop=${this.handleFileDrop}>
          <uui-button id="drop-button" look="placeholder">
            Click to browse or drag files here
          </uui-button>
        </uui-file-dropzone>
        <div id="files">
          ${this.files.map((file: FileSystemEntry, index: number) =>
            this.renderFileItem(file, index)
          )}
        </div>
      </uui-icon-registry-essential>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-input-file': UUIInputFileElement;
  }
}
