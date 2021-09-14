import { LitElement, html, css } from 'lit';
import { property, query, queryAll } from 'lit/decorators.js';
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

      #file-container {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        place-items: start stretch;
        grid-gap: var(--uui-size-layout-0);
        position: relative;
      }

      #uploader {
        border: 1px var(--uui-look-placeholder-border-style)
          var(--uui-interface-border);
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        padding: 0;
        width: 100%;
        min-height: 200px;
        display: none;
        place-content: center;
      }

      :host([active]) #uploader {
        display: grid;
        border: 1px var(--uui-look-placeholder-border-style)
          var(--uui-interface-border-hover);
      }

      #uploader:before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        background-color: var(--uui-interface-surface);
        opacity: 0.6;
        z-index: 3;
      }

      :host([active]) #uploader::before {
        opacity: 0.8;
      }

      #dropzone-symbol {
        pointer-events: none;
      }

      .move-to-top {
        position: relative;
        z-index: 4;
      }
    `,
  ];

  private handleFiles() {
    if (this.error === true && this.files.length === 0) {
      this.active = true;
      this.error = false;
      return;
    }

    if (this.multiple === false && this.files.length > 0) {
      this.error = true;
      this.active = false;
      return;
    }

    this.active = false;
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
    this.error = false;
    if (this.files.length === 0) return;

    if (this.multiple === false && e.dataTransfer?.items) {
      if (e.dataTransfer.items.length > 1) {
        this.error = true;
      }
    }

    if (this.multiple === false && this.files.length > 0) {
      this.active = false;
      this.error = true;
    }
    e.preventDefault();
    this.active = true;
  };

  protected hideDropzone = (e: DragEvent) => {
    e.preventDefault();
    this.error = false;
    this.active = false;
  };

  @property({ type: Boolean, reflect: true })
  active = true;

  @property({ attribute: false })
  files: File[] = [];

  @query('#file-container')
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
    this.error = false;
    this.active = true;
  }

  protected removeFile(e: UUIFilePreviewEvent) {
    const file = e.target.file;
    this.files = this.files.filter(el => el !== file);
    this.requestUpdate();
    if (this.files.length === 0) {
      this.active = true;
      this.error = false;
    }
  }

  willUpdate(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('files')) {
      console.log('i trigger update');
    }
  }

  @property({ type: Boolean, reflect: true })
  error = false;

  fileDropzoneTemplate() {
    return html`<uui-file-dropzone
      id="uploader"
      @file-drop=${this.handleFiles}
      .multiple=${this.multiple}
      .label=${this.label}
      .error=${this.error}
      ><uui-file-dropzone-symbol
        id="dropzone-symbol"
        .error=${this.error}
        class="move-to-top"></uui-file-dropzone-symbol
      >${this.error === false
        ? html`<uui-button
            aria-controls="uploader"
            id="dropzone-button"
            class="move-to-top"
            >Click or drag & drop ${this.multiple ? 'files' : 'file'}
            here</uui-button
          >`
        : html`<span class="move-to-top"
            >Only one file is allowed</span
          >`}</uui-file-dropzone
    >`;
  }

  removeButtonTemplate() {
    if (this.files.length > 0) {
      return html`<uui-button @click=${this.removeFiles} look="outline"
        ><uui-icon id="button-icon" name="delete"></uui-icon>
        Remove
        ${this.files !== null && this.files.length > 1 ? 'files' : 'file'}
      </uui-button>`;
    }
    return html``;
  }

  render() {
    return html` <div id="file-container">
        ${this.fileDropzoneTemplate()}
        ${this.files.map(
          file =>
            html`<uui-file-preview
              .file=${file}
              .name=${file.name}
              @remove-file=${this.removeFile}>
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
