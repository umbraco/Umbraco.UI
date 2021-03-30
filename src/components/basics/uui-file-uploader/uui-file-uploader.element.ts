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
        display: block;
        width: 100%;

        background: lightblue;
      }

      :host([active]) {
        background: lightcoral;
      }

      #input {
        width: 0px;
        height: 0px;
        opacity: 0;
      }
    `,
  ];

  constructor() {
    super();
    this.addEventListener('dragenter', this.onDragEnter, false);
    this.addEventListener('dragleave', this.onDragLeave, false);
    this.addEventListener('dragover', this.onDragOver, false);
    this.addEventListener('drop', this.onDrop, false);
  }
  onDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    const dt = e.dataTransfer;

    if (dt?.files) {
      this.files = dt.files;
    }

    this.dispatchEvent(
      new UUIFileUploaderEvent(UUIFileUploaderEvent.FILE_DROP)
    );
  }
  onDragOver(e: DragEvent) {
    console.log('over');
    this.active = true;
    this.preventDefaults(e);
  }
  onDragEnter(e: DragEvent) {
    console.log('enter');
    this.active = true;
    this.preventDefaults(e);
  }
  onDragLeave(e: DragEvent) {
    console.log('leave');
    this.active = false;
    this.preventDefaults(e);
  }

  // private _handleDrop(e: DragEvent) {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   const dt = e.dataTransfer;

  //   if (dt?.files) {
  //     const files = Array.from(dt.files);
  //     this.files = [...this.files, ...files];
  //   }
  // }

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

  @property({ type: Boolean, reflect: true })
  active = false;

  @query('#input')
  input!: HTMLInputElement;

  @property({ attribute: false })
  files: FileList | null = null;

  render() {
    return html`<span>Drop files here or click on </span>
      <button
        @click=${() => {
          this.input.click();
        }}
      >
        this button
      </button>
      <input
        id="input"
        type="file"
        multiple
        @change=${this._onFileInputChange}
      />`;
  }
}
