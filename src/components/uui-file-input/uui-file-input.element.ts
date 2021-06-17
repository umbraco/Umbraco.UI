import { LitElement, html, css } from 'lit';
import { property, query, queryAll, state } from 'lit/decorators';
import { UUIFileDropzoneElement } from '../uui-file-dropzone/uui-file-dropzone.element';
import { UUIFilePreviewElement } from '../uui-file-preview/uui-file-preview.element';
import { UUIFilePreviewEvent } from '../uui-file-preview/UUIFilePreviewEvents';

/**
 *  @element uui-file-input
 */

//todo auto upload
//todo prevent folder
//todo in a form
export class UUIFileInputElement extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: center;
        position: relative;
        /* min-height: 240px;
        min-width: 600px; */
      }

      #button-icon {
        margin: 0;
        color: var(--uui-color-maroon-flush, #d42054);
      }

      #files {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        place-items: start stretch;
        grid-gap: var(--uui-size-layout-0);
        position: relative;
      }

      #uploader {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        padding: 0;
        width: 100%;
        min-height: 200px;
        z-index: 3;
      }
    `,
  ];

  private handleFiles() {
    this.uploader.hidden = true;
    this.files = [...this.uploader.files, ...this.files];
    // if (this.files) {
    //   this.filesArray = Array.from(this.files);
    // } else this.filesArray = [];
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('dragover', this.showDropzone);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('dragover', this.showDropzone);
  }

  protected showDropzone = () => {
    if (this.files.length === 0) return;
    console.log('drag over window');
    this.dropzone.hidden = false;
  };

  @property({ attribute: false })
  files: File[] = [];

  @query('#files')
  fileContainer!: HTMLElement;

  @query('#uploader')
  uploader!: UUIFileDropzoneElement;

  @query('#uploader')
  dropzone!: UUIFileDropzoneElement;

  @queryAll('uui-file-preview')
  previews!: UUIFilePreviewElement[];

  @property({ type: Boolean, reflect: true })
  multiple = false;

  @property({})
  label = '';

  private removeFiles() {
    this.files = [];
    this.uploader.hidden = false;
  }

  protected removeFile(e: UUIFilePreviewEvent) {
    const file = e.target.file;
    // const removeIndex = this.files.findIndex(el => {
    //   el === file;
    // });
    console.log(file);
    this.files = this.files.filter(el => el !== file);
    // this.files.splice(removeIndex, 1);
    console.log(this.files);
    this.requestUpdate();
  }

  fileDropzoneTemplate() {
    return html`<uui-file-dropzone
      id="uploader"
      @file-drop=${this.handleFiles}
      .multiple=${this.multiple}
      .label=${this.label}
    ></uui-file-dropzone>`;
  }

  removeButtonTemplate() {
    if (this.files.length > 0)
      return html`<uui-button @click=${this.removeFiles} look="outline"
        ><uui-icon id="button-icon" name="delete"></uui-icon>
        Remove
        ${this.files !== null && this.files.length > 1 ? 'files' : 'file'}
      </uui-button>`;
  }

  render() {
    return html`${this.fileDropzoneTemplate()}
      <div id="files">
        ${this.files.map(
          file =>
            html`<uui-file-preview
              .file=${file}
              .name=${file.name}
              @remove-file=${this.removeFile}
            ></uui-file-preview>`
        )}
      </div>
      ${this.removeButtonTemplate()}`;
  }
}

// <uui-file-dropzone-button
//           @file-drop=${this.handleFiles}
//           id="dropzone"
//         ></uui-file-dropzone-button>
