import { LitElement, html, css } from 'lit';
import { query, property, queryAssignedNodes } from 'lit/decorators';
import { UUIFileUploaderEvent } from './UUIFileDropzoneEvents';
import { LabelMixin } from '../../mixins/LabelMixin';
import { UUIFileDropzoneSymbolElement } from './uui-file-dropzone-symbol.element';

export class UUIFileDropzoneElement extends LabelMixin('', LitElement) {
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

  @property({ type: Boolean })
  directory = false;

  @query('#input')
  input!: HTMLInputElement;

  @property({ attribute: false })
  files: File[] = [];

  @property({ type: Boolean })
  multiple = false;

  // @property({ type: Boolean })
  // active = false;

  // @property({ type: Boolean })
  // error = false;

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
      // if (this.multiple === false && dt.files.length > 1) {
      //   this.error = false;
      //   return;
      // }

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
    //this.active = true;
    const dt = e.dataTransfer;
    // if (dt?.items) {
    //   this._checkForError(dt);
    // }
  }

  @queryAssignedNodes()
  private _slottedElements!: Node[];

  private _dropzoneSymbol: UUIFileDropzoneSymbolElement[] = [];

  private _findSymbol() {
    this._dropzoneSymbol = Array.from(this._slottedElements).filter(
      el => el instanceof UUIFileDropzoneSymbolElement
    ) as UUIFileDropzoneSymbolElement[];
  }

  onDragEnter(e: DragEvent) {
    //this.active = true;
    this.preventDefaults(e);
  }
  onDragLeave(e: DragEvent) {
    // this.active = false;
    // this.error = false;
    this.preventDefaults(e);
  }

  // private _checkForError(dt: DataTransfer) {
  //   if (this.multiple) return;
  //   if (dt.items.length > 1) this.error = true;
  // }

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

  // willUpdate(changedProperties: Map<string | number | symbol, unknown>) {
  //   if (changedProperties.has('error') && this._dropzoneSymbol.length > 0) {
  //     this._dropzoneSymbol.forEach(el => (el.error = this.error));
  //   }
  // }

  //protected abstract renderFileDropzone(): TemplateResult; ${this.renderFileDropzone()}

  render() {
    return html`<slot @slotchange=${this._findSymbol}></slot
      ><input
        @click=${(e: Event) => e.stopImmediatePropagation()}
        id="input"
        type="file"
        ?multiple=${this.multiple}
        @change=${this._onFileInputChange}
      /><label id="input-label" for="input">${this.renderLabel()}</label>`;
  }
}
