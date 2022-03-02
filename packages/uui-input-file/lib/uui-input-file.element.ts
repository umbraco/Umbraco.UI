import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { query, state } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';
import '@umbraco-ui/uui-action-bar/lib';
import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-icon/lib';
import '@umbraco-ui/uui-icon-registry-essential/lib';
import { UUIFileDropzoneElement } from '@umbraco-ui/uui-file-dropzone/lib';

/**
 * @element uui-input-file
 */
@defineElement('uui-input-file')
export class UUIInputFileElement extends LitElement {
  static styles = [
    css`
      :host {
        width: 100%;
        height: 100%;
        position: relative;
        width: 100%;
        height: 500px;
        display: flex;
        box-sizing: border-box;
        border: 1px solid var(--uui-interface-border);
      }

      :host(.dropzone-active) {
        border: 3px dashed var(--uui-color-malibu-dimmed);
      }

      #files {
        display: grid;
        box-sizing: border-box;
        justify-items: center;
        width: 100%;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 16px;
        padding: 16px;
        overflow: auto;
        max-height: 100%;
      }

      #dropzone {
        display: flex;
        background: var(--uui-interface-surface-alt);
        position: absolute;
        inset: 0px;
        z-index: 1;
        justify-content: center;
        align-items: center;
      }
      #dropzone-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 20%;
        color: var(--uui-color-malibu-dimmed);
      }

      #dropzone-content uui-icon {
        width: 100%;
        height: 100%;
      }
      #dropzone-content span {
        font-size: 1rem;
        font-weight: bold;
        white-space: nowrap;
      }
      #drop-button {
        width: 100%;
        height: 100%;
      }
      #add-zone {
        width: 150px;
        height: 150px;
        display: flex;
        padding: 16px;
        box-sizing: border-box;
        justify-content: center;
        align-items: center;
      }

      #add-button {
        width: 100%;
        height: 100%;
      }
    `,
  ];

  @query('#dropzone')
  dropZone: UUIFileDropzoneElement | undefined;

  @query('#file-input')
  fileInput: HTMLElement | undefined;

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
  }

  private setShowDropzone(show: boolean) {
    if (show) {
      this.dropZone!.style.display = 'flex';
      this.classList.add('dropzone-active');
    } else {
      this.dropZone!.style.display = 'none';
      this.classList.remove('dropzone-active');
    }
  }

  // TODO: move to constructor
  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('dragstart', () => this.setShowDropzone(true));

    this.addEventListener('dragenter', () => this.setShowDropzone(true));
    this.addEventListener('dragleave', () => this.setShowDropzone(false));
    this.addEventListener('drop', () => this.setShowDropzone(false));
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
        <uui-button
          @click=${() => this.removeFile(index)}
          look="danger"
          compact>
          <uui-icon name="delete"></uui-icon>
        </uui-button>
      </uui-action-bar>
    </uui-file-preview>`;
  }

  render() {
    //TODO fix icon registry style
    return html`
      <uui-icon-registry-essential style="width: 100%">
        <uui-file-dropzone id="dropzone" @file-drop=${this.handleFileDrop}>
          <div id="dropzone-content">
            <uui-icon name="download"></uui-icon>
            <span> Drop to add files </span>
          </div>
        </uui-file-dropzone>
        <div id="files">
          ${this.files.map((file: FileSystemEntry, index: number) =>
            this.renderFileItem(file, index)
          )}
          <uui-file-dropzone
            multiple
            id="add-zone"
            @file-drop=${this.handleFileDrop}>
            <uui-button id="add-button" look="placeholder">Add</uui-button>
          </uui-file-dropzone>
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
