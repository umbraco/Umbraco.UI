import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
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
        justify-content: center;
        align-items: center;
        position: relative;
        font-size: 12px;
        text-align: center;
      }

      slot[name='action'] {
        --uui-button-height: 28px;
      }

      slot[name='action']::slotted(*) {
        position: absolute;
        top: 5px;
        right: 5px;
        z-index: 1;
      }
    `,
  ];

  @property({ attribute: false })
  source = '';

  @property({ attribute: false })
  sourceFileExt = '';

  @property({ attribute: false })
  name = '';

  @property({ attribute: false })
  type = '';

  @state({})
  isDirectory = false;

  private _file: File | null = null;
  @property({ attribute: false })
  get file() {
    return this._file;
  }

  set file(newValue) {
    const oldValue = this._file;
    this._file = newValue;
    if (newValue) {
      this._readFile(newValue);
      this.name = newValue.name;
    }

    this.requestUpdate('file', oldValue);
  }

  private _readFile(file: File) {
    this.type = file.type;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (reader.result) {
        this.source = reader.result as string;
        this.sourceFileExt = this.source.slice(
          this.source.indexOf('/') + 1,
          this.source.indexOf(';')
        );
      }
      if (reader.error && reader.error.name === 'NotFoundError')
        this.isDirectory = true;
    };
  }

  private _dispatchRemoveEvent() {
    console.log('dispatchmethodFired');
    this.dispatchEvent(
      new UUIFilePreviewEvent(UUIFilePreviewEvent.REMOVE_FILE)
    );
  }

  fileTypeTemplate(type: string) {
    if (type.startsWith('image'))
      return html`<uui-image-file-symbol
        .type=${this.sourceFileExt}
        .source=${this.source}></uui-image-file-symbol>`;

    if (this.isDirectory) return html`<uui-folder-symbol></uui-folder-symbol>`;

    return html`<uui-file-symbol
      .type=${this.sourceFileExt}></uui-file-symbol>`;
  }

  render() {
    // TODO: FIX
    // eslint-disable-next-line lit-a11y/click-events-have-key-events
    return html`<slot
        name="action"
        @click=${this._dispatchRemoveEvent}
        id="delete-button">
      </slot>
      ${this.fileTypeTemplate(this.type)}
      <span id="file-name">
        ${this.name}
        ${this.file?.size && !this.isDirectory
          ? html`<br />
              ${UUIFileSize.humanFileSize(this.file?.size, true)}`
          : ''}
      </span> `;
  }
}
