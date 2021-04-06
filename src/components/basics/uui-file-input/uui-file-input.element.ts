import {
  LitElement,
  html,
  css,
  property,
  query,
  queryAll,
  internalProperty,
} from 'lit-element';
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

      #button-icon {
        margin: 0;
        color: var(--uui-color-maroon-flush, #d42054);
      }

      #files {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-items: flex-start;
      }
    `,
  ];

  private handleFiles() {
    this.files = this.uploader.files;
    if (this.files) {
      this.filesArray = Array.from(this.files);
    } else this.filesArray = [];
  }

  @internalProperty()
  filesArray: File[] = [];

  @property({ attribute: false })
  files: FileList | null = null;

  @query('#files')
  fileContainer!: HTMLElement;

  @query('#uploader')
  uploader!: UUIFileUploaderElement;

  @queryAll('uui-file-preview')
  previews!: HTMLElement[];

  @property({ type: Boolean, reflect: true })
  multiple = false;

  @property({})
  label = '';

  private removeFile() {
    this.files = null;
    this.filesArray = [];
  }

  render() {
    return html`
      ${this.files === null
        ? html`<uui-file-uploader
            id="uploader"
            @file-drop=${this.handleFiles}
            .multiple=${this.multiple}
            .label=${this.label}
          ></uui-file-uploader>`
        : html` <div id="files">
              ${this.filesArray.map(
                file =>
                  html`<uui-file-preview
                    .file=${file}
                    .name=${file.name}
                  ></uui-file-preview>`
              )}
            </div>
            <uui-button @click=${this.removeFile} look="outline"
              ><uui-icon id="button-icon" name="delete"></uui-icon>
              Remove
              ${this.files !== null && this.files.length > 1 ? 'files' : 'file'}
            </uui-button>`}
    `;
  }
}
