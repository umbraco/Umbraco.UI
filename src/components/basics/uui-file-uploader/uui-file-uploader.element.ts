import { LitElement, html, css, property, query } from 'lit-element';
import { UUIFileUploaderEvent } from './UUIFileUploaderEvents';

/**
 *  @element uui-file-input
 */

//todo auto upload
export class UUIFileUploaderElement extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        align-items: center;
        justify-content: center;
        padding: var(--uui-size-medium, 24px);
        border: 1px var(--uui-look-placeholder-border-style)
          var(--uui-interface-border);
      }

      :host([active]) {
        border: 1px var(--uui-look-placeholder-border-style)
          var(--uui-interface-border-hover);
      }

      #upload-icon {
        width: 15%;
        fill: var(--uui-interface-border);
        opacity: 0.5;
        transition: opacity 0.3s ease;
      }

      :host([active]) #upload-icon {
        opacity: 1;
      }

      #input {
        position: absolute;
        width: 0px;
        height: 0px;
        opacity: 0;
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  active = false;

  @query('#input')
  input!: HTMLInputElement;

  @property({ attribute: false })
  files: FileList | null = null;

  constructor() {
    super();
    this.addEventListener('dragenter', this.onDragEnter, false);
    this.addEventListener('dragleave', this.onDragLeave, false);
    this.addEventListener('dragover', this.onDragOver, false);
    this.addEventListener('drop', this.onDrop, false);
    this.addEventListener('click', this.handleClick);
  }
  onDrop(e: DragEvent) {
    this.preventDefaults(e);
    const dt = e.dataTransfer;

    if (dt?.files) {
      this.files = dt.files;
    }

    this.dispatchEvent(
      new UUIFileUploaderEvent(UUIFileUploaderEvent.FILE_DROP)
    );
  }
  onDragOver(e: DragEvent) {
    this.active = true;
    this.preventDefaults(e);
  }
  onDragEnter(e: DragEvent) {
    this.active = true;
    this.preventDefaults(e);
  }
  onDragLeave(e: DragEvent) {
    this.active = false;
    this.preventDefaults(e);
  }

  private preventDefaults(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  private _onFileInputChange() {
    this.files = this.input.files;
    this.dispatchEvent(
      new UUIFileUploaderEvent(UUIFileUploaderEvent.FILE_DROP)
    );
  }

  private handleClick() {
    this.input.click();
  }

  render() {
    return html`<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        id="upload-icon"
      >
        <path
          d="M206.491 364.184h99.013V223.676h92.922L255.997 51.111 113.575 223.676h92.916zM85.043 398.311h341.912v62.578H85.043z"
        />
      </svg>
      <span>Click or drag and drop files here to upload them</span>

      <input
        id="input"
        type="file"
        multiple
        @change=${this._onFileInputChange}
      />`;
  }
}
