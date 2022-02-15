import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { query, property } from 'lit/decorators.js';
import { UUIFileDropzoneEvent } from './UUIFileDropzoneEvents';
import { LabelMixin } from '@umbraco-ui/uui-base/lib/mixins';

/**
 * @element uui-file-dropzone
 *  @fires {UUIFileDropzoneEvent} file-drop - fires when the a file has been selected.
 *  @slot - For the content of the dropzone
 *  @description - Dropzone for file upload. Supports native browsing and drag n drop.
 */
@defineElement('uui-file-dropzone')
export class UUIFileDropzoneElement extends LabelMixin('', LitElement) {
  static styles = [
    css`
      #input,
      #input-label {
        position: absolute;
        width: 0px;
        height: 0px;
        opacity: 0;
        display: none;
      }
    `,
  ];

  /**
   * Allows for directories to be selected.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean })
  directory = false;

  @query('#input')
  input!: HTMLInputElement;

  /**
   * Allows for directories to be selected.
   * @type {File[]}
   * @attr
   * @default []
   */
  @property({ attribute: false })
  files: File[] = [];

  /**
   * Allows for multiple files to be selected.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean })
  multiple = false;

  constructor() {
    super();

    this.addEventListener('dragenter', this.onDragEnter, false);
    this.addEventListener('dragleave', this.onDragLeave, false);
    this.addEventListener('dragover', this.onDragOver, false);
    this.addEventListener('drop', this.onDrop, false);
    this.addEventListener('click', this.handleClick);
  }

  private handleClick(e: Event) {
    e.stopImmediatePropagation();
    this.openNativeInput();
  }

  protected checkIsItDirectory(dtItem: DataTransferItem): boolean {
    // @ts-ignore TODO: fix typescript error
    return !dtItem.type ? dtItem.webkitGetAsEntry().isDirectory : false;
  }

  onDrop(e: DragEvent) {
    this.preventDefaults(e);
    const dt = e.dataTransfer;

    if (dt?.files) {
      let files: File[] = [];

      if (this.directory) {
        files = Array.from(dt.files);
        console.warn('directory upload is not yet implemented');
      } else {
        for (let i = 0; i < dt.items.length; i++) {
          if (this.checkIsItDirectory(dt.items[i])) continue;
          if (dt.items[i].getAsFile()) {
            files.push(dt.items[i].getAsFile() as File);
          }
        }
      }

      this.files = files;
      this.dispatchEvent(
        new UUIFileDropzoneEvent(UUIFileDropzoneEvent.FILE_DROP)
      );
    }
  }
  onDragOver(e: DragEvent) {
    this.preventDefaults(e);
  }

  onDragEnter(e: DragEvent) {
    this.preventDefaults(e);
  }
  onDragLeave(e: DragEvent) {
    this.preventDefaults(e);
  }

  private preventDefaults(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  protected openNativeInput() {
    this.input.click();
  }

  private _onFileInputChange() {
    this.files = this.input.files ? Array.from(this.input.files) : [];
    this.dispatchEvent(
      new UUIFileDropzoneEvent(UUIFileDropzoneEvent.FILE_DROP)
    );
  }

  render() {
    return html`<slot></slot
      ><input
        @click=${(e: Event) => e.stopImmediatePropagation()}
        id="input"
        type="file"
        ?multiple=${this.multiple}
        @change=${this._onFileInputChange} /><label id="input-label" for="input"
        >${this.renderLabel()}</label
      >`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-file-dropzone': UUIFileDropzoneElement;
  }
}
