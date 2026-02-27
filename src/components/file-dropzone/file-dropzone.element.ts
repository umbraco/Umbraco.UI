import { css, html, LitElement } from 'lit';
import { query, property } from 'lit/decorators.js';
import { UUIFileDropzoneEvent } from './UUIFileDropzoneEvent.js';
import { LabelMixin } from '../../internal/mixins/index.js';

import '../symbol-file-dropzone/symbol-file-dropzone.js';

export interface UUIFileFolder {
  folderName: string;
  folders: UUIFileFolder[];
  files: File[];
}

/**
 * @element uui-file-dropzone
 *  @fires {UUIFileDropzoneEvent} change - fires when a file has been selected.
 *  @fires {UUIFileDropzoneEvent} reject - fires when files are rejected due to not matching the accept attribute.
 *  @slot - For the content of the dropzone
 *  @description - Dropzone for file upload. Supports native browsing and drag n drop.
 */
export class UUIFileDropzoneElement extends LabelMixin('', LitElement) {
  @query('#input')
  private readonly _input!: HTMLInputElement;

  @query('#dropzone')
  private readonly _dropzone!: HTMLElement;

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
        if (/^[a-z]+\/[a-z*]+$/.test(item)) {
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

  /**
   * Process a single file entry and categorize it as accepted or rejected.
   * @param entry - The data transfer item containing the file
   * @param files - Array to store accepted files
   * @param rejectedFiles - Array to store rejected files
   */
  private _processFileEntry(
    entry: DataTransferItem,
    files: File[],
    rejectedFiles: File[],
  ): void {
    const file = entry.getAsFile();
    if (!file) return;

    if (this._isAccepted(file)) {
      files.push(file);
    } else {
      rejectedFiles.push(file);
    }
  }

  /**
   * Check if folder upload should be processed based on component settings.
   * @returns true if folder upload is allowed and multiple files are enabled
   */
  private _shouldProcessFolder(): boolean {
    return !this.disallowFolderUpload && this.multiple;
  }

  private async _getAllEntries(dataTransferItemList: DataTransferItemList) {
    // Use BFS to traverse entire directory/file structure
    const queue = [...dataTransferItemList];

    const folders: UUIFileFolder[] = [];
    const files: File[] = [];
    const rejectedFiles: File[] = [];

    for (const entry of queue) {
      if (entry?.kind !== 'file') continue;

      const fileEntry = this._getEntry(entry);
      if (!fileEntry) continue;

      if (!fileEntry.isDirectory) {
        // Entry is a file
        this._processFileEntry(entry, files, rejectedFiles);
      } else if (this._shouldProcessFolder()) {
        // Entry is a directory
        const structure = await this._mkdir(fileEntry);
        folders.push(structure);
      }
    }

    return { files, folders, rejectedFiles };
  }

  /**
   * Get the directory entry from a DataTransferItem.
   * @remark Supports both WebKit and non-WebKit browsers.
   */
  private _getEntry(entry: DataTransferItem): FileSystemDirectoryEntry | null {
    let dir: FileSystemDirectoryEntry | null = null;

    if ('webkitGetAsEntry' in entry) {
      dir = entry.webkitGetAsEntry() as FileSystemDirectoryEntry;
    } else if ('getAsEntry' in entry) {
      // non-WebKit browsers may rename webkitGetAsEntry to getAsEntry. MDN recommends looking for both.
      dir = (entry as any).getAsEntry();
    }

    return dir;
  }

  // Process entries from a directory reader
  private async _processEntries(
    entries: FileSystemEntry[],
    folders: UUIFileFolder[],
    files: File[],
  ): Promise<void> {
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
  }

  // Read entries from a directory reader recursively
  private async _readAllEntries(
    reader: FileSystemDirectoryReader,
    folders: UUIFileFolder[],
    files: File[],
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      reader.readEntries(async entries => {
        if (!entries.length) {
          resolve();
          return;
        }

        await this._processEntries(entries, folders, files);

        // readEntries only reads up to 100 entries at a time. It is on purpose we call readEntries recursively.
        await this._readAllEntries(reader, folders, files);

        resolve();
      }, reject);
    });
  }

  // Make directory structure
  private async _mkdir(
    entry: FileSystemDirectoryEntry,
  ): Promise<UUIFileFolder> {
    const reader = entry.createReader();
    const folders: UUIFileFolder[] = [];
    const files: File[] = [];

    await this._readAllEntries(reader, folders, files);

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

    for (const mimeType of this._acceptedMimeTypes) {
      if (fileType === mimeType) {
        return true;
      } else if (
        mimeType.endsWith('/*') &&
        fileType.startsWith(mimeType.replace('*', ''))
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
        fileSystemResult.folders = [];
        // When multiple is false and we have an accepted file, don't report rejections
        fileSystemResult.rejectedFiles = [];
      }

      if (fileSystemResult.rejectedFiles.length > 0) {
        this.dispatchEvent(
          new UUIFileDropzoneEvent(UUIFileDropzoneEvent.REJECT, {
            detail: { files: fileSystemResult.rejectedFiles, folders: [] },
          }),
        );
      }

      if (!fileSystemResult.files.length && !fileSystemResult.folders.length) {
        return;
      }

      this.dispatchEvent(
        new UUIFileDropzoneEvent(UUIFileDropzoneEvent.CHANGE, {
          detail: {
            files: fileSystemResult.files,
            folders: fileSystemResult.folders,
          },
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

    if (this.multiple === false && files.length > 1) {
      files.splice(1, files.length - 1);
    }

    const allowedFiles = files.filter(file => this._isAccepted(file));
    const rejectedFiles = files.filter(file => !this._isAccepted(file));

    // When multiple is false and we have an accepted file, don't report rejections
    const shouldReportRejections =
      rejectedFiles.length > 0 && (this.multiple || allowedFiles.length === 0);

    if (shouldReportRejections) {
      this.dispatchEvent(
        new UUIFileDropzoneEvent(UUIFileDropzoneEvent.REJECT, {
          detail: { files: rejectedFiles, folders: [] },
        }),
      );
    }

    if (!allowedFiles.length) {
      return;
    }

    this.dispatchEvent(
      new UUIFileDropzoneEvent(UUIFileDropzoneEvent.CHANGE, {
        detail: {
          files: allowedFiles,
          folders: [],
        },
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

  static override readonly styles = [
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
