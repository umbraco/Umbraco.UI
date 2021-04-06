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

      :host([error]) #upload-icon {
        fill: var(--uui-color-maroon-flush, #d42054);
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

  @property({ type: Boolean, reflect: true })
  error = false;

  @query('#input')
  input!: HTMLInputElement;

  @property({ attribute: false })
  files: FileList | null = null;

  @property({ type: Boolean, reflect: true })
  multiple = true;

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
      console.log(dt.items[0].webkitGetAsEntry().isDirectory);
      if (!this.multiple && dt.files.length > 1) {
        this.error = false;
        return;
      }

      this.files = dt.files;
      console.log(dt.files);
      this.dispatchEvent(
        new UUIFileUploaderEvent(UUIFileUploaderEvent.FILE_DROP)
      );
    }
  }
  onDragOver(e: DragEvent) {
    this.active = true;
    this.preventDefaults(e);
  }
  onDragEnter(e: DragEvent) {
    this.active = true;
    this.preventDefaults(e);

    const dt = e.dataTransfer;

    if (dt?.items) {
      if (!this.multiple && dt.items.length > 1) this.error = true;
    }
  }
  onDragLeave(e: DragEvent) {
    this.active = false;
    this.error = false;
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
          d=${!this.error
            ? 'M206.491 364.184h99.013V223.676h92.922L255.997 51.111 113.575 223.676h92.916zM85.043 398.311h341.912v62.578H85.043z'
            : 'M254.501 38.16c-120.308 0-217.838 97.53-217.838 217.838 0 120.31 97.53 217.838 217.838 217.838 120.31 0 217.838-97.528 217.838-217.838 0-120.308-97.528-217.838-217.838-217.838zm151.667 217.838c0 29.861-8.711 57.708-23.671 81.209L173.293 128.002c23.499-14.961 51.345-23.67 81.208-23.67 83.629.001 151.667 68.037 151.667 151.666zm-303.332 0c0-29.859 8.71-57.707 23.67-81.204l209.201 209.201c-23.498 14.96-51.346 23.671-81.206 23.671-83.632 0-151.665-68.04-151.665-151.668z'}
        />
      </svg>
      ${!this.error
        ? html`<span
            >Click or drag & drop ${this.multiple ? 'files' : 'file'} here</span
          >`
        : html`<span>Only single file is allowed</span>`}

      <input
        id="input"
        type="file"
        ?multiple=${this.multiple}
        @change=${this._onFileInputChange}
      />`;
  }
}
