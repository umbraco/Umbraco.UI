import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property, query, state } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';
import '@umbraco-ui/uui-action-bar/lib';
import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-icon/lib';
import '@umbraco-ui/uui-icon-registry-essential/lib';
import { UUIFileDropzoneElement } from '@umbraco-ui/uui-file-dropzone/lib';
import { FormControlMixin } from '@umbraco-ui/uui-base/lib/mixins';
import { demandCustomElement } from '@umbraco-ui/uui-base/lib/utils';

interface FileWrapper {
  name: string;
  extension: string;
  isDirectory: boolean;
  show: boolean;
  size?: number;
  thumbnail?: string;
  source?: string;
  file?: File;
}

/**
 * @element uui-input-file
 * @description - A form associated file input that supports multiple files.
 */
@defineElement('uui-input-file')
export class UUIInputFileElement extends FormControlMixin(LitElement) {
  static styles = [
    css`
      :host {
        width: 100%;
        height: 100%;
        position: relative;
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
        max-height: 100%;
        max-width: 100%;
        height: 100%;
        aspect-ratio: 1;
        padding: var(--uui-size-6);
        box-sizing: border-box;
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

  @query('#dropzone')
  private _dropZone: UUIFileDropzoneElement | undefined;

  private _fileWrappers: FileWrapper[] = [];

  @state()
  private get fileWrappers() {
    return this._fileWrappers;
  }
  private set fileWrappers(newValue) {
    const oldValue = newValue;
    this._fileWrappers = newValue;
    const formData = new FormData();
    for (const fileWrapper of this.fileWrappers) {
      if (fileWrapper.file) {
        formData.append(this.name, fileWrapper.file);
      }
    }
    this.value = formData;
    this.requestUpdate('fileWrappers', oldValue);
  }

  constructor() {
    super();
    this.addEventListener('dragenter', () => this._setShowDropzone(true));
    this.addEventListener('dragleave', () => this._setShowDropzone(false));
    this.addEventListener('drop', () => this._setShowDropzone(false));
  }

  connectedCallback(): void {
    super.connectedCallback();
    demandCustomElement(this, 'uui-icon');
    demandCustomElement(this, 'uui-icon-registry-essential');
    demandCustomElement(this, 'uui-file-dropzone');
    demandCustomElement(this, 'uui-button');
    demandCustomElement(this, 'uui-action-bar');
    demandCustomElement(this, 'uui-file-preview');
  }

  protected getFormElement(): HTMLElement {
    return this._dropZone! as HTMLElement;
  }

  private async _handleFileDrop(e: CustomEvent) {
    const newFiles = e.detail.files as FileSystemFileEntry[] | FileList;

    for (const file of newFiles) {
      if (file instanceof File) {
        const fileDisplay = await this._fileDisplayFromFile(file);

        if (this.multiple) {
          this.fileWrappers.push(fileDisplay);
        } else {
          this.fileWrappers = [fileDisplay];
        }
      } else {
        const fileDisplay = await this._fileDisplayFromFileSystemFileEntry(
          file
        );

        if (this.multiple) {
          this.fileWrappers.push(fileDisplay);
        } else {
          this.fileWrappers = [fileDisplay];
        }
      }
    }

    // * Sort to make sure all the files that should be shown is first. Because of this we can break out of the
    // * render loop as soon as we hit the first show=false
    this.fileWrappers = this.fileWrappers.sort(
      (a: FileWrapper, b: FileWrapper) => Number(b.show) - Number(a.show)
    );

    this.fileWrappers = [...this.fileWrappers];
  }

  private async _fileDisplayFromFile(file: File): Promise<FileWrapper> {
    const thumbnail = await this._getThumbnail(file);

    return {
      name: file.name.split('.')[0],
      extension: file.name.split('.')[1],
      isDirectory: false,
      show: true,
      size: file.size,
      file: file,
      source: this._isFileAnImage(file) ? thumbnail : undefined,
    };
  }

  private async _fileDisplayFromFileSystemFileEntry(
    fileEntry: FileSystemFileEntry
  ): Promise<FileWrapper> {
    const index = fileEntry.fullPath.split('/').length - 2;

    const fileDisplay: FileWrapper = {
      name: fileEntry.name.split('.')[0],
      extension: fileEntry.name.split('.')[1],
      isDirectory: fileEntry.isDirectory,
      show: index === 0 ? true : false,
    };

    if (fileEntry.isFile) {
      const file = await this._getFile(fileEntry);
      fileDisplay.file = file;
      fileDisplay.size = file.size;
      fileDisplay.source = this._isFileAnImage(file)
        ? await this._getThumbnail(file)
        : undefined;
    }

    return fileDisplay;
  }

  private _isFileAnImage(file: File) {
    return file ? file['type'].split('/')[0] === 'image' : false;
  }

  private async _getFile(fileEntry: FileSystemFileEntry): Promise<File> {
    return await new Promise<File>((resolve, reject) =>
      fileEntry.file(resolve, reject)
    );
  }

  private async _getThumbnail(file: File): Promise<any> {
    return await new Promise<any>(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result);
      };
    });
  }

  private _removeFile(index: number) {
    this.fileWrappers.splice(index, 1);
    this.fileWrappers = [...this.fileWrappers]; // Updates the UI
  }

  private _setShowDropzone(show: boolean) {
    if (show) {
      this._dropZone!.style.display = 'flex';
      this.classList.add('dropzone-active');
    } else {
      this._dropZone!.style.display = 'none';
      this.classList.remove('dropzone-active');
    }
  }

  private _renderFileItem(file: FileWrapper, index: number) {
    return html`<uui-file-preview
      .name=${file.name}
      .extension=${file.extension}
      .url=${file.source}
      .size=${file.size}
      .isDirectory=${file.isDirectory}
      .src="${file.source}">
      <uui-action-bar slot="actions">
        <uui-button
          @click=${() => this._removeFile(index)}
          look="danger"
          compact>
          <uui-icon name="delete"></uui-icon>
        </uui-button>
      </uui-action-bar>
    </uui-file-preview>`;
  }

  private _renderFiles() {
    const result = [];

    for (let index = 0; index < this.fileWrappers.length; index++) {
      const file = this.fileWrappers[index];

      if (file.show) {
        result.push(file);
      } else {
        // * Because we sorted the fileDisplays by 'show' we can safely break on the first false value
        break;
      }
    }

    return html`${result.map((file: FileWrapper, index: number) =>
      file.show ? this._renderFileItem(file, index) : ''
    )}`;
  }

  render() {
    //TODO fix icon registry style
    return html`
      <uui-icon-registry-essential style="width: 100%">
        <uui-file-dropzone
          id="dropzone"
          ?multiple=${this.multiple}
          .accept=${this.accept}
          @file-drop=${this._handleFileDrop}>
          <div id="dropzone-content">
            <uui-icon name="download"></uui-icon>
            <span> Drop to add files </span>
          </div>
        </uui-file-dropzone>
        <div id="files">
          ${this._renderFiles()}
          <uui-file-dropzone
            ?multiple=${this.multiple}
            .accept=${this.accept}
            id="add-zone"
            @file-drop=${this._handleFileDrop}>
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
