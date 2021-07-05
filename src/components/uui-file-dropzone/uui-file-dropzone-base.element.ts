import { LitElement, html, css, TemplateResult } from 'lit';
import { query, property } from 'lit/decorators';
import { UUIFileUploaderEvent } from './UUIFileDropzoneEvents';
import { LabelMixin } from './../../mixins/LabelMixin';

export abstract class UUIFileDropzoneBaseElement extends LabelMixin(
  '',
  LitElement
) {
  static styles = [
    css`
      #input,
      #input-label {
        position: absolute;
        width: 0px;
        height: 0px;
        opacity: 0;
        display: none;
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  active = false;

  @property({ type: Boolean, reflect: true })
  error = false;

  @property({ type: Boolean })
  directory = false;

  @query('#input')
  input!: HTMLInputElement;

  @property({ attribute: false })
  files: File[] = [];

  @property({ type: Boolean, reflect: true })
  multiple = false;

  constructor() {
    super();

    this.addEventListener('dragenter', this.onDragEnter, false);
    this.addEventListener('dragleave', this.onDragLeave, false);
    this.addEventListener('dragover', this.onDragOver, false);
    this.addEventListener('drop', this.onDrop, false);
    this.addEventListener('click', this.handleClick);
  }

  private handleClick(e: Event) {
    e.stopImmediatePropagation();
    this.openNativeInput();
  }

  protected checkIsItDirectory(dtItem: DataTransferItem): boolean {
    return !dtItem.type ? dtItem.webkitGetAsEntry().isDirectory : false;
  }

  onDrop(e: DragEvent) {
    this.preventDefaults(e);
    const dt = e.dataTransfer;

    if (dt?.files) {
      if (!this.multiple && dt.files.length > 1) {
        this.error = false;
        return;
      }

      let files: File[] = [];

      if (this.directory) {
        files = Array.from(dt.files);
        console.log('directory upload is not yet implemented');
      } else {
        for (let i = 0; i < dt.items.length; i++) {
          if (this.checkIsItDirectory(dt.items[i])) continue;
          if (dt.items[i].getAsFile()) {
            files.push(dt.items[i].getAsFile() as File);
          }
        }
      }

      this.files = files;
      this.dispatchEvent(
        new UUIFileUploaderEvent(UUIFileUploaderEvent.FILE_DROP)
      );
    }
  }
  onDragOver(e: DragEvent) {
    this.preventDefaults(e);
    this.active = true;
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

  protected openNativeInput() {
    this.input.click();
  }

  private _onFileInputChange() {
    this.files = this.input.files ? Array.from(this.input.files) : [];
    this.dispatchEvent(
      new UUIFileUploaderEvent(UUIFileUploaderEvent.FILE_DROP)
    );
  }

  protected abstract renderFileDropzone(): TemplateResult;

  render() {
    return html`${this.renderFileDropzone()}<input
        @click=${(e: Event) => e.stopImmediatePropagation()}
        id="input"
        type="file"
        ?multiple=${this.multiple}
        @change=${this._onFileInputChange}
      /><label id="input-label" for="input">${this.renderLabel()}</label>`;
  }
}
