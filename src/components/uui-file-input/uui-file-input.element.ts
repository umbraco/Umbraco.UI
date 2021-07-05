import { LitElement, html, css } from 'lit';
import { property, query, queryAll } from 'lit/decorators';
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
      }

      #button-icon {
        margin: 0;
        color: var(--uui-color-maroon-flush, #d42054);
      }

      #files {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
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
    this.uploader.active = false;
    this.files = [...this.uploader.files, ...this.files];
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('dragover', this.showDropzone);
    window.addEventListener('drop', this.hideDropzone);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('dragover', this.showDropzone);
    window.removeEventListener('drop', this.hideDropzone);
  }

  protected showDropzone = (e: DragEvent) => {
    if (this.multiple === false) return;
    if (this.files.length === 0) return;
    e.preventDefault();
    this.uploader.hidden = false;
  };

  protected hideDropzone = (e: DragEvent) => {
    if (this.multiple === false) return;
    e.preventDefault();
    this.uploader.hidden = true;
  };

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
    this.uploader.hidden = false;
  }

  protected removeFile(e: UUIFilePreviewEvent) {
    const file = e.target.file;
    this.files = this.files.filter(el => el !== file);
    this.requestUpdate();
    if (this.files.length === 0) this.uploader.hidden = false;
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
    return html` <div id="files">
        ${this.fileDropzoneTemplate()}
        ${this.files.map(
          file =>
            html`<uui-file-preview
              .file=${file}
              .name=${file.name}
              @remove-file=${this.removeFile}
            >
              <uui-action-bar slot="action"
                ><uui-button look="danger"
                  ><uui-icon name="delete"></uui-icon
                ></uui-button> </uui-action-bar
            ></uui-file-preview>`
        )}
      </div>
      ${this.removeButtonTemplate()}`;
  }
}
