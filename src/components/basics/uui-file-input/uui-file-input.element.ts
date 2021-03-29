import {
  LitElement,
  html,
  css,
  property,
  internalProperty,
  query,
} from 'lit-element';
import { UUIFilePreviewElement } from '../uui-file-preview/uui-file-preview.element';
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

  private _handleDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    const dt = e.dataTransfer;
    const files = dt?.files;

    // this.handleFiles(files);
    if (files) {
      this.previewFile(files[0]);

      this.files = Array.from(files);
      console.log(this.files);
    }
  }

  //   private handleFiles(files: any) {
  //     files = [...files];
  //     files.forEach(this.previewFile);
  //   }

  private previewFile(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      const img = document.createElement('uui-file-preview', {
        is: 'uui-file-preview',
      }) as UUIFilePreviewElement;
      img.source = reader.result as string;
      img.name = file.name;
      this.fileContainer.appendChild(img);
    };
  }

  @internalProperty()
  source = '';

  @property({ type: Array, attribute: false })
  files: Array<File> = [];

  @query('#files')
  fileContainer!: HTMLElement;

  render() {
    return html`
      <uui-file-uploader @drop=${this._handleDrop}></uui-file-uploader>
      <div id="files"></div>
    `;
  }
}
