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
    console.log(this.files);
    if (this.files)
      Array.from(this.files).forEach(file => this.previewFile(file));
  }

  private previewFile(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const filePreviewElement = document.createElement('uui-file-preview', {
        is: 'uui-file-preview',
      }) as UUIFilePreviewElement;
      filePreviewElement.source = reader.result as string;
      filePreviewElement.name = file.name;
      filePreviewElement.addEventListener('remove-file', (e: Event) =>
        this.removeFile(e)
      );
      this.fileContainer.appendChild(filePreviewElement);
    };
  }

  @internalProperty()
  source = '';

  @property({ attribute: false })
  files: FileList | null = null;

  @query('#files')
  fileContainer!: HTMLElement;

  @query('#uploader')
  uploader!: UUIFileUploaderElement;

  @queryAll('uui-file-preview')
  previews!: HTMLElement[];

  private removeFile(e: Event) {
    this.files = null;
    while (this.fileContainer.firstChild) {
      this.fileContainer.removeChild(this.fileContainer.firstChild);
    }
    // const target = e.target as ChildNode;
    // const element = e.target as UUIFilePreviewElement;
    // const fileName = element.name;
    // const files = this.files.filter(el => el.name !== fileName);
    // this.files = files;
    // if (target) {
    //   target.removeEventListener('remove-file', (e: Event) =>
    //     this.removeFile(e)
    //   );
    //   target.remove();
    // }
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
