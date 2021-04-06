import { LitElement, html, css, property, internalProperty } from 'lit-element';
import { UUIFilePreviewEvent } from './UUIFilePreviewEvents';
import { UUIFileSize } from './UUIFileSize';

/**
 *  @element uui-file-preview
 */

//todo auto upload
export class UUIFilePreviewElement extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        position: relative;
        font-size: 0.8rem;
        margin: 16px;
        max-width: 200px;
        height: 100%;
      }

      #image-prev {
        width: 100%;
      }
    `,
  ];

  @property({ attribute: false })
  source = '';

  @property({ attribute: false })
  name = '';

  @property({ attribute: false })
  type = '';

  @internalProperty({})
  isDirectory = false;

  private _file: File | null = null;
  @property({ attribute: false })
  get file() {
    return this._file;
  }

  set file(newValue) {
    const oldValue = this._file;
    this._file = newValue;
    if (newValue) this._readFile(newValue);
    this.requestUpdate('file', oldValue);
  }

  private _readFile(file: File) {
    this.type = file.type;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (reader.result) this.source = reader.result as string;
      if (reader.error && reader.error.name === 'NotFoundError')
        this.isDirectory = true;
    };
  }

  fileTypeTemplate(type: string) {
    if (type.startsWith('image'))
      return html`<img id="image-prev" src=${this.source} />`;
    else
      return html`<uui-file-icon
        type=${this.isDirectory ? 'directory' : this.name.split('.')[1]}
        .isDirectory=${this.isDirectory}
      ></uui-file-icon>`;
  }

  render() {
    return html`${this.fileTypeTemplate(this.type)}
      <span id="file-name"
        >${this.name}${this.file?.size && !this.isDirectory
          ? `/ ${UUIFileSize.humanFileSize(this.file?.size)}`
          : ''}</span
      > `;
  }
}
