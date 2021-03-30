import { LitElement, html, css, property, query, queryAll } from 'lit-element';
import { UUIFilePreviewElement } from '../uui-file-preview/uui-file-preview.element';
import { UUIFileUploaderElement } from '../uui-file-uploader/uui-file-uploader.element';

/**
 *  @element uui-file-input
 */

//todo auto upload
export class UUIFileInputElement extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: center;

        min-width: 600px;
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
    return html`<div id="files"></div>
      ${this.files === null
        ? html`<uui-file-uploader
            id="uploader"
            @file-drop=${this.handleFiles}
          ></uui-file-uploader>`
        : html` <uui-button @click=${
            this.removeFile
          }><uui-icon name="delete"></uui-buttonicon>
            Remove
            ${this.files !== null && this.files.length > 1 ? 'files' : 'file'}
          </uui-button>`} `;
  }
}
