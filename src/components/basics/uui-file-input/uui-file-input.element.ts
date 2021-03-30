import {
  LitElement,
  html,
  css,
  property,
  internalProperty,
  query,
  queryAll,
} from 'lit-element';
import { nothing } from 'lit-html';
import { UUIFilePreviewElement } from '../uui-file-preview/uui-file-preview.element';
import { UUIFileUploaderElement } from '../uui-file-uploader/uui-file-uploader.element';
import { UUIFileUploaderEvent } from '../uui-file-uploader/UUIFileUploaderEvents';

/**
 *  @element uui-file-input
 */

//todo auto upload
export class UUIFileInputElement extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        align-items: stretch;
        justify-content: center;
        border: 1px var(--uui-look-placeholder-border-style)
          var(--uui-look-placeholder-border);

        min-width: 600px;
        min-height: 300px;
      }

      img {
        width: 50px;
      }
    `,
  ];

  private handleFiles() {
    this.files = this.uploader.files;
    if (this.files)
      Array.from(this.files).forEach(file => this.previewFile(file));
  }

  private previewFile(file: File) {
    const filePreviewElement = document.createElement('uui-file-preview', {
      is: 'uui-file-preview',
    }) as UUIFilePreviewElement;
    filePreviewElement.file = file;
    filePreviewElement.name = file.name;

    this.fileContainer.appendChild(filePreviewElement);
  }

  @property({ attribute: false })
  files: FileList | null = null;

  @query('#files')
  fileContainer!: HTMLElement;

  @query('#uploader')
  uploader!: UUIFileUploaderElement;

  @queryAll('uui-file-preview')
  previews!: HTMLElement[];

  private removeFile() {
    this.files = null;
    while (this.fileContainer.firstChild) {
      this.fileContainer.removeChild(this.fileContainer.firstChild);
    }
  }

  render() {
    return html`
      ${this.files === null
        ? html`<uui-file-uploader
            id="uploader"
            @file-drop=${this.handleFiles}
          ></uui-file-uploader>`
        : html` <button @click=${this.removeFile}>
            Remove
            ${this.files !== null && this.files.length > 1 ? 'files' : 'file'}
          </button>`}

      <div id="files"></div>
    `;
  }
}
