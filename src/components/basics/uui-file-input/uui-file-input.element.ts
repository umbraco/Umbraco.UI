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
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        place-items: stretch;
        grid-gap: var(--uui-size-layout-0);
      }
    `,
  ];

  private handleFiles() {
    this.files = this.uploader.files;
    if (this.files) {
      this.filesArray = Array.from(this.files);
    } else this.filesArray = [];
  }

  @state()
  filesArray: File[] = [];

  @property({ attribute: false })
  files: File[] = [];

  @query('#files')
  fileContainer!: HTMLElement;

  @query('#uploader')
  uploader!: UUIFileDropzoneElement;

  @queryAll('uui-file-preview')
  previews!: UUIFilePreviewElement[];

  @property({ type: Boolean, reflect: true })
  multiple = false;

  @property({})
  label = '';

  private removeFiles() {
    this.files = [];
    this.filesArray = [];
  }

  protected removeFile(e: UUIFilePreviewEvent) {
    const file = e.target.file;
    const removeIndex = this.files.findIndex(el => {
      el === file;
    });
    this.files.splice(removeIndex, 1);
    this.filesArray.splice(removeIndex, 1);
    this.requestUpdate();
    console.log('hello!');
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
    return html`<uui-button @click=${this.removeFiles} look="outline"
      ><uui-icon id="button-icon" name="delete"></uui-icon>
      Remove ${this.files !== null && this.files.length > 1 ? 'files' : 'file'}
    </uui-button>`;
  }

  render() {
    return html`
      ${this.files.length === 0
        ? this.fileDropzoneTemplate()
        : html` <div id="files">
              ${this.filesArray.map(
                file =>
                  html`<uui-file-preview
                    .file=${file}
                    .name=${file.name}
                    @remove-file=${this.removeFile}
                  ></uui-file-preview>`
              )}<uui-file-dropzone-button></uui-file-dropzone-button>
            </div>
            ${this.removeButtonTemplate()}`}
    `;
  }
}
