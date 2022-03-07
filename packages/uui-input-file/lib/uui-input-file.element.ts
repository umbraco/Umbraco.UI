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

interface FileDisplay {
  name: string;
  extension: string;
  isDirectory: boolean;
  show: boolean;
  size?: number;
  thumbnail?: string;
  source?: string;
  file?: FileSystemFileEntry | File;
}
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
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 16px;
        padding: 16px;
        overflow: auto;
        max-height: 100%;
      }

      #dropzone {
        display: none;
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
  allFiles: FileSystemFileEntry[] = [];

  @state()
  fileDisplays: FileDisplay[] = [];

  constructor() {
    super();
    this.addEventListener('dragenter', () => this.setShowDropzone(true));
    this.addEventListener('dragleave', () => this.setShowDropzone(false));
    this.addEventListener('drop', () => this.setShowDropzone(false));
  }

  private async handleFileDrop(e: CustomEvent) {
    const newFiles = e.detail.files as FileSystemFileEntry[] | FileList;
    // this.allFiles = [...this.allFiles, ...newFiles];
    // TODO: fix browse. Its broken. Files come as File and not FileSystemFileEntry

    console.log('FILES', newFiles);

    for (const file of newFiles) {
      // TODO Handle source and thumbnail

      if (file instanceof File) {
        const fileDisplay = this.fileDisplayFromFile(file);
        this.fileDisplays.push(fileDisplay);
      } else {
        const fileDisplay = await this.fileDisplayFromFileSystemFileEntry(file);
        this.fileDisplays.push(fileDisplay);
      }
    }

    // * Sort to make sure all the files that should be shown is first. Because of this we can break out of the
    // * render loop as soon as we hit the first show=false
    this.fileDisplays = this.fileDisplays.sort(
      (a: FileDisplay, b: FileDisplay) => Number(b.show) - Number(a.show)
    );

    this.fileDisplays = [...this.fileDisplays];
  }

  private fileDisplayFromFile(file: File): FileDisplay {
    return {
      name: file.name.split('.')[0],
      extension: file.name.split('.')[1],
      isDirectory: false,
      show: true,
      size: file.size,
      file: file,
    };
  }

  private async fileDisplayFromFileSystemFileEntry(
    file: FileSystemFileEntry
  ): Promise<FileDisplay> {
    const index = file.fullPath.split('/').length - 2;

    const fileDisplay: FileDisplay = {
      name: file.name.split('.')[0],
      extension: file.name.split('.')[1],
      isDirectory: file.isDirectory,
      show: index === 0 ? true : false,
      file: file,
    };

    if (file.isFile) {
      const size = (await this.getFile(file)).size;
      fileDisplay.size = size;
    }

    return fileDisplay;
  }

  private async getFile(fileEntry: FileSystemFileEntry): Promise<File> {
    return await new Promise<File>((resolve, reject) =>
      fileEntry.file(resolve, reject)
    );
  }

  private removeFile(index: number) {
    this.fileDisplays.splice(index, 1);
    this.fileDisplays = [...this.fileDisplays]; // Updates the UI
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

  private renderFileItem(file: FileDisplay, index: number) {
    return html`<uui-file-preview
      .name=${file.name}
      .extension=${file.extension}
      .source=${file.source}
      .size=${file.size}
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

  private renderFiles() {
    const result = [];

    for (let index = 0; index < this.fileDisplays.length; index++) {
      const file = this.fileDisplays[index];

      if (file.show) {
        result.push(file);
      } else {
        // * Because we sorted the fileDisplays by 'show' we can safely break on the first false value
        break;
      }
    }

    return html`${result.map((file: FileDisplay, index: number) =>
      file.show ? this.renderFileItem(file, index) : ''
    )}`;
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
          ${this.renderFiles()}
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
