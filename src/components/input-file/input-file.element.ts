import { property, query, state } from 'lit/decorators.js';
import { css, html, LitElement, nothing } from 'lit';
import type { UUIFileDropzoneElement } from '../file-dropzone/file-dropzone.js';
import { UUIFormControlMixin } from '../../internal/mixins';
import { demandCustomElement } from '../../internal/utils';
import { iconDelete } from '../icon-registry-essential/svgs/index.js';
import { repeat } from 'lit/directives/repeat.js';

// TODO: Missing change event, when files are changed.
/**
 * @element uui-input-file
 * @description - A form associated file input that supports multiple files.
 * @extends UUIFormControlMixin
 */
export class UUIInputFileElement extends UUIFormControlMixin(LitElement) {
  @query('#dropzone')
  private _dropzone!: UUIFileDropzoneElement;

  @query('#dropzone')
  private _dropZone: UUIFileDropzoneElement | undefined;

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

  get value() {
    return super.value;
  }
  set value(newValue) {
    super.value = newValue;

    if (newValue instanceof FormData) {
      const data = (
        this.multiple ? newValue.getAll(this.name) : [newValue.get(this.name)]
      ) as Array<File>;
      this._updateFileWrappers(data);
      return;
    }

    if (newValue instanceof File) {
      this._updateFileWrappers([newValue]);
      return;
    }
  }

  @state()
  private _files: File[] = [];

  constructor() {
    super();
    this.addEventListener('dragenter', () => this._setShowDropzone(true));
    this.addEventListener('dragleave', () => this._setShowDropzone(false));
    this.addEventListener('drop', () => this._setShowDropzone(false));
  }

  connectedCallback(): void {
    super.connectedCallback();
    demandCustomElement(this, 'uui-icon');
    demandCustomElement(this, 'uui-file-dropzone');
    demandCustomElement(this, 'uui-button');
    demandCustomElement(this, 'uui-action-bar');
    demandCustomElement(this, 'uui-file-preview');
  }

  protected getFormElement(): HTMLElement {
    return this._dropZone! as HTMLElement;
  }

  /**
   * Removes focus from the input.
   */
  async blur() {
    await this.updateComplete;
    this._dropzone.blur();
  }

  /**
   * This method enables <label for="..."> to focus the input
   */
  async focus() {
    await this.updateComplete;
    this._dropzone.focus();
  }

  async click() {
    await this.updateComplete;
    this._dropzone.browse();
  }

  private _handleClick(e: Event) {
    e.stopImmediatePropagation();
    this._dropzone.browse();
  }

  private _updateFileWrappers = (data: Array<File>) => {
    let newFileWrappers: Array<File> = [];

    for (const file of data) {
      if (this.multiple) {
        newFileWrappers.push(file);
      } else {
        newFileWrappers = [file];
      }
    }

    this._files = newFileWrappers;
  };

  private async _handleFilesChange(event: CustomEvent) {
    const entries = event.detail.files as (File | FileSystemFileEntry)[];
    const files = entries.filter(
      entry => entry instanceof File || entry.isFile,
    );
    // TODO: implement folder preview + remove folder including children

    if (!this.multiple) {
      const entry = files[0];
      const isFile = entry instanceof File;
      const file = isFile ? entry : await this._getFile(entry);

      if (this.value instanceof File) {
        this.value = file;
        return;
      }

      if (this.value instanceof FormData) {
        this.value.delete(this.name);
        this.value.append(this.name, file);
        this._updateFileWrappers([file]);
        return;
      }
    }

    let newValue = this.value;

    if (files.length > 0 && !(this.value instanceof FormData)) {
      newValue = new FormData();
    }

    if (newValue instanceof FormData) {
      for (const entry of files) {
        const isFile = entry instanceof File;
        newValue.append(this.name, isFile ? entry : await this._getFile(entry));
      }
    }

    this.value = newValue;
  }

  private async _getFile(fileEntry: FileSystemFileEntry): Promise<File> {
    return await new Promise<File>((resolve, reject) =>
      fileEntry.file(resolve, reject),
    );
  }

  private _removeFile(index: number) {
    const fileToRemove = this._files[index];

    if (this.value instanceof FormData) {
      const files = this.value.getAll(this.name) as Array<File>;
      const filteredFiles = files.filter(file => file !== fileToRemove);

      if (filteredFiles.length === 0) {
        this.value = '';
      } else {
        this.value.delete(this.name);

        for (const file of filteredFiles) {
          this.value.append(this.name, file);
        }
      }

      this._updateFileWrappers(filteredFiles);
    }

    if (this.value instanceof File) {
      this.value = '';
      this._updateFileWrappers([]);
    }
  }

  private _setShowDropzone(show: boolean) {
    if (show) {
      this._dropZone!.style.display = 'flex';
    } else {
      this._dropZone!.style.display = 'none';
    }
  }

  private _renderFileItem(file: File, index: number) {
    return html`<uui-file-preview .file="${file}">
      <uui-action-bar slot="actions">
        <uui-button
          @click=${() => this._removeFile(index)}
          color="danger"
          label=${`Delete ${file.name}`}>
          <uui-icon name="delete" .fallback=${iconDelete.strings[0]}></uui-icon>
        </uui-button>
      </uui-action-bar>
    </uui-file-preview>`;
  }

  private _renderFiles() {
    return html`${repeat(
      this._files,
      (file: File) => file.name + file.size,
      (file: File, index: number) => this._renderFileItem(file, index),
    )}`;
  }

  render() {
    return html`
      <uui-file-dropzone
        id="dropzone"
        ?multiple=${this.multiple}
        .accept=${this.accept}
        @change=${this._handleFilesChange}
        label="Drop files here"></uui-file-dropzone>
      <div id="files">
        ${this._renderFiles()}
        ${this._files.length === 0 || this.multiple
          ? html`<uui-button
              @click=${this._handleClick}
              id="add-button"
              look="placeholder"
              label="Add"></uui-button>`
          : nothing}
      </div>
    `;
  }

  static override readonly styles = [
    css`
      :host {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        box-sizing: border-box;
        border: 1px solid var(--uui-color-border);
      }

      #input {
        position: absolute;
        width: 0px;
        height: 0px;
        opacity: 0;
        display: none;
      }

      #files {
        display: grid;
        box-sizing: border-box;
        justify-items: center;
        width: 100%;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        grid-auto-rows: min-content;
        gap: 16px;
        padding: 16px;
        overflow: auto;
        max-height: 100%;
      }

      #dropzone {
        display: none;
        position: absolute;
        inset: 0px;
        z-index: 10;
        justify-content: center;
        align-items: center;
      }

      #add-button {
        width: 150px;
        height: 150px;
        display: flex;
        padding: 16px;
        box-sizing: border-box;
        justify-content: center;
        align-items: stretch;
      }
    `,
  ];
}
