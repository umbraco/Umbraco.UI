import { LitElement, html, css, property, internalProperty } from 'lit-element';
import { UUIFilePreviewEvent } from './UUIFilePreviewEvents';

/**
 *  @element uui-file-preview
 */

//todo auto upload
export class UUIFilePreviewElement extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        position: relative;
      }

      #image-prev {
        width: 200px;
      }

      #remove-file {
        background-color: red;
      }
    `,
  ];

  @property({ attribute: false })
  source = '';

  @property({ attribute: false })
  name = '';

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
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (reader.result) this.source = reader.result as string;
    };
  }

  render() {
    return html`<img id="image-prev" src=${this.source} />
      <span id="file-name">${this.name}</span> `;
  }
}
