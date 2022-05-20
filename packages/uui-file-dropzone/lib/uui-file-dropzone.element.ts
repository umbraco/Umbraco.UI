import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { query, property } from 'lit/decorators.js';
import { UUIFileDropzoneEvent } from './UUIFileDropzoneEvents';
import { LabelMixin } from '@umbraco-ui/uui-base/lib/mixins';
import { demandCustomElement } from '@umbraco-ui/uui-base/lib/utils';

/**
 * @element uui-file-dropzone
 *  @fires {UUIFileDropzoneEvent} file-change - fires when the a file has been selected.
 *  @slot - For the content of the dropzone
 *  @description - Dropzone for file upload. Supports native browsing and drag n drop.
 */
@defineElement('uui-file-dropzone')
export class UUIFileDropzoneElement extends LabelMixin('', LitElement) {
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

  @query('#input')
  private _input!: HTMLInputElement;

  @query('#dropzone')
  private _dropzone!: HTMLElement;

  /**
   * Accepted filetypes. Will allow all types if empty.
   * @type {string}
   * @attr
   * @default false
   */
  @property({ type: String })
  public accept: string = '';

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

  protected _checkIsItDirectory(dtItem: DataTransferItem): boolean {
    // @ts-ignore // TODO: fix typescript error
    return !dtItem.type ? dtItem.webkitGetAsEntry().isDirectory : false;
  }

  private async _getAllFileEntries(dataTransferItemList: DataTransferItemList) {
    const fileEntries: FileSystemFileEntry[] = [];
    // Use BFS to traverse entire directory/file structure
    const queue = [];
    for (let i = 0; i < dataTransferItemList.length; i++) {
      queue.push(dataTransferItemList[i].webkitGetAsEntry());
    }

    // if the accept filer is set
    if (this.accept) {
      const acceptList: string[] = [];
      const wildcards: string[] = [];

      // Create the arrays defined above
      this.accept.split(',').forEach(item => {
        if (item.includes('*')) {
          wildcards.push(item.split('*')[0].trim().toLowerCase());
        } else {
          acceptList.push(item.trim().toLowerCase());
        }
      });

      while (queue.length > 0) {
        const entry: FileSystemFileEntry = queue.shift()!;
        if (
          entry.isFile &&
          (await this._isAccepted(acceptList, wildcards, entry))
        ) {
          fileEntries.push(entry);
        } else if (entry.isDirectory) {
          fileEntries.push(entry);
          queue.push(
            ...(await this._readAllDirectoryEntries(
              (entry as any).createReader()
            ))
          );
        }
      }
    } else {
      while (queue.length > 0) {
        const entry: FileSystemFileEntry = queue.shift()!;
        if (entry.isFile) {
          fileEntries.push(entry);
        } else if (entry.isDirectory) {
          fileEntries.push(entry);
          queue.push(
            ...(await this._readAllDirectoryEntries(
              (entry as any).createReader()
            ))
          );
        }
      }
    }

    return fileEntries;
  }

  // Get all the entries (files or sub-directories) in a directory
  // by calling readEntries until it returns empty array
  private async _readAllDirectoryEntries(
    directoryReader: FileSystemDirectoryReader
  ) {
    const entries: any = [];
    let readEntries: any = await this._readEntriesPromise(directoryReader);
    while (readEntries.length > 0) {
      entries.push(...readEntries);
      readEntries = await this._readEntriesPromise(directoryReader);
    }
    return entries;
  }

  private async _readEntriesPromise(
    directoryReader: FileSystemDirectoryReader
  ) {
    try {
      return await new Promise((resolve, reject) => {
        directoryReader.readEntries(resolve, reject);
      });
    } catch (err) {
      console.log(err);
    }
  }

  private async _getFile(fileEntry: FileSystemFileEntry): Promise<File> {
    return await new Promise<File>((resolve, reject) =>
      fileEntry.file(resolve, reject)
    );
  }

  private async _isAccepted(
    acceptList: string[],
    wildcards: string[],
    entry: FileSystemFileEntry
  ) {
    const file = await this._getFile(entry);
    const fileType = file.type.toLowerCase();
    const fileExtension = '.' + file.name.split('.')[1].toLowerCase();

    if (acceptList.includes(fileExtension)) {
      return true;
    }
    if (acceptList.includes(fileType)) {
      return true;
    }
    if (wildcards.some(wildcard => fileType.startsWith(wildcard))) {
      return true;
    }

    return false;
  }

  private async _onDrop(e: DragEvent) {
    e.preventDefault();
    this._dropzone.classList.remove('hover');

    const items = e.dataTransfer?.items;

    if (items) {
      let result = await this._getAllFileEntries(items);

      if (this.multiple === false && result.length > 0) {
        result = [result[0]];
      }

      this.dispatchEvent(
        new UUIFileDropzoneEvent(UUIFileDropzoneEvent.FILE_CHANGE, {
          detail: { files: result },
        })
      );
    }
  }

  private _onDragOver(e: DragEvent) {
    e.preventDefault();
  }

  private _onDragEnter(e: DragEvent) {
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
      new UUIFileDropzoneEvent(UUIFileDropzoneEvent.FILE_CHANGE, {
        detail: { files: files },
      })
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
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-file-dropzone': UUIFileDropzoneElement;
  }
}
