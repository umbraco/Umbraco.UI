import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { query, property } from 'lit/decorators.js';
import { UUIFileDropzoneEvent } from './UUIFileDropzoneEvent';
import { LabelMixin } from '@umbraco-ui/uui-base/lib/mixins';
import { demandCustomElement } from '@umbraco-ui/uui-base/lib/utils';

export interface UUIFileFolder {
  folderName: string;
  folders: UUIFileFolder[];
  files: File[];
}

/**
 * @element uui-file-dropzone
 *  @fires {UUIFileDropzoneEvent} change - fires when the a file has been selected.
 *  @slot - For the content of the dropzone
 *  @description - Dropzone for file upload. Supports native browsing and drag n drop.
 */
@defineElement('uui-file-dropzone')
export class UUIFileDropzoneElement extends LabelMixin('', LitElement) {
  @query('#input')
  private _input!: HTMLInputElement;

  @query('#dropzone')
  private _dropzone!: HTMLElement;

  private _acceptedFileExtensions: string[] = [];
  private _acceptedMimeTypes: string[] = [];
  private _accept = '';

  /**
   * Comma-separated list of accepted mime types or file extensions (denoted with a `.`).
   * If this is left empty, it will allow all types.
   *
   * @type {string}
   * @attr
   * @examples [
   *   "image/*,application/pdf",
   *   ".gif,.png,.jpg,.jpeg,.pdf",
   * ]
   */
  @property({ type: String })
  public set accept(value: string) {
    if (value) {
      const mimetypes: string[] = [];
      const fileextensions: string[] = [];

      // Create the arrays defined above
      value.split(',').forEach(item => {
        item = item.trim().toLowerCase();

        // If the item is a mime type, add it to the accept list
        if (/[a-z]+\/[a-z*]/s.test(item)) {
          mimetypes.push(item);
        } else {
          fileextensions.push(item.replace(/^\./, ''));
        }
      });

      this._acceptedMimeTypes = mimetypes;
      this._acceptedFileExtensions = fileextensions;
    } else {
      this._acceptedMimeTypes = [];
      this._acceptedFileExtensions = [];
    }
    const old = this._accept;
    this._accept = value;
    this.requestUpdate('accept', old);
  }
  public get accept(): string {
    return this._accept;
  }

  @property({
    type: Boolean,
    reflect: true,
    attribute: 'disallow-folder-upload',
  })
  public disallowFolderUpload: boolean = false;

  /**
   * Allows for multiple files to be selected.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean })
  public multiple: boolean = false;

  /**
   * Opens the native file picker to select a file.
   * @method browse
   */
  public browse() {
    this._input.click();
  }

  constructor() {
    super();

    this.addEventListener('dragenter', this._onDragEnter, false);
    this.addEventListener('dragleave', this._onDragLeave, false);
    this.addEventListener('dragover', this._onDragOver, false);
    this.addEventListener('drop', this._onDrop, false);
  }

  connectedCallback(): void {
    super.connectedCallback();
    demandCustomElement(this, 'uui-symbol-file-dropzone');
  }

  private async _getAllEntries(dataTransferItemList: DataTransferItemList) {
    // Use BFS to traverse entire directory/file structure
    const queue = [...dataTransferItemList];

    const folders: UUIFileFolder[] = [];
    const files: File[] = [];

    for (const entry of queue) {
      if (entry.type) {
        // Entry is a file
        const file = entry.getAsFile();
        if (!file) continue;
        if (this._isAccepted(file)) {
          files.push(file);
        }
      } else if (!entry.type && !this.disallowFolderUpload) {
        // Entry is a directive. The entry kind is "file" for both files and directories which seems like a bug. The file type is empty however. Can we trust this?
        if ('webkitGetAsEntry' in entry === true) {
          const dir = entry.webkitGetAsEntry() as FileSystemDirectoryEntry;
          folders.push(await this._mkdir(dir));
        } else if ('getAsEntry' in entry === true) {
          // non-WebKit browsers may rename webkitGetAsEntry to getAsEntry. MDN recommends looking for both.
          //@ts-ignore
          const dir = entry.getAsEntry() as FileSystemDirectoryEntry;
          folders.push(await this._mkdir(dir));
        }
      }
    }
    return { files, folders };
  }

  // Make directory structure
  private async _mkdir(
    entry: FileSystemDirectoryEntry,
  ): Promise<UUIFileFolder> {
    const reader = entry.createReader();
    const folders: UUIFileFolder[] = [];
    const files: File[] = [];

    const readEntries = (reader: FileSystemDirectoryReader) => {
      reader.readEntries(async entries => {
        if (!entries.length) return;

        for (const en of entries) {
          if (en.isFile) {
            const file = await this._getAsFile(en as FileSystemFileEntry);
            if (this._isAccepted(file)) {
              files.push(file);
            }
          } else if (en.isDirectory) {
            const directory = await this._mkdir(en as FileSystemDirectoryEntry);
            folders.push(directory);
          }
        }

        readEntries(reader);
      });
    };

    readEntries(reader);

    const result: UUIFileFolder = { folderName: entry.name, folders, files };
    return result;
  }

  private _isAccepted(file: File) {
    if (
      this._acceptedFileExtensions.length === 0 &&
      this._acceptedMimeTypes.length === 0
    ) {
      return true;
    }

    const fileType = file.type.toLowerCase();
    const fileExtension = file.name.split('.').pop();

    if (
      fileExtension &&
      this._acceptedFileExtensions.includes(fileExtension.toLowerCase())
    ) {
      return true;
    }

    for (const mimeType in this._acceptedMimeTypes) {
      if (fileType === mimeType) {
        return true;
      } else if (
        mimeType.endsWith('/*') &&
        fileType.startsWith(mimeType.replace('/*', ''))
      ) {
        return true;
      }
    }

    return false;
  }

  private async _getAsFile(fileEntry: FileSystemFileEntry): Promise<File> {
    return new Promise((resolve, reject) => fileEntry.file(resolve, reject));
  }

  private async _onDrop(e: DragEvent) {
    e.preventDefault();
    this._dropzone.classList.remove('hover');

    const items = e.dataTransfer?.items;

    if (items) {
      const fileSystemResult = await this._getAllEntries(items);

      if (this.multiple === false && fileSystemResult.files.length) {
        fileSystemResult.files = [fileSystemResult.files[0]];
      }

      this._getAllEntries(items);

      this.dispatchEvent(
        new UUIFileDropzoneEvent(UUIFileDropzoneEvent.CHANGE, {
          detail: fileSystemResult,
        }),
      );
    }
  }

  private _onDragOver(e: DragEvent) {
    e.preventDefault();
  }

  private _onDragEnter(e: DragEvent) {
    // TODO: make visual indication of wether the file is acceptable or not. If not we need to make a more negative/disabled visual look.
    this._dropzone.classList.add('hover');
    e.preventDefault();
  }

  private _onDragLeave(e: DragEvent) {
    this._dropzone.classList.remove('hover');
    e.preventDefault();
  }

  private _onFileInputChange() {
    const files = this._input.files ? Array.from(this._input.files) : [];

    this.dispatchEvent(
      new UUIFileDropzoneEvent(UUIFileDropzoneEvent.CHANGE, {
        detail: { files: files },
      }),
    );
  }

  render() {
    return html`
      <div id="dropzone">
        <uui-symbol-file-dropzone id="symbol"></uui-symbol-file-dropzone>
        ${this.renderLabel()}
        <input
          @click=${(e: Event) => e.stopImmediatePropagation()}
          id="input"
          type="file"
          accept=${this.accept}
          ?multiple=${this.multiple}
          @change=${this._onFileInputChange}
          aria-label="${this.label}" />
        <slot></slot>
      </div>
    `;
  }

  static styles = [
    css`
      #dropzone {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: var(--uui-size-4);
        border: 3px solid transparent;
        margin: -3px;
        backdrop-filter: blur(2px);
      }
      #dropzone.hover {
        border-color: var(--uui-color-default);
      }
      #dropzone.hover::before {
        content: '';
        position: absolute;
        inset: 0;
        opacity: 0.2;
        border-color: var(--uui-color-default);
        background-color: var(--uui-color-default);
      }
      #symbol {
        color: var(--uui-color-default);
        max-width: 100%;
        max-height: 100%;
      }
      #input {
        position: absolute;
        width: 0px;
        height: 0px;
        opacity: 0;
        display: none;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-file-dropzone': UUIFileDropzoneElement;
  }
}
