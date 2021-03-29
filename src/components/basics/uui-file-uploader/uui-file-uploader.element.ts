import { LitElement, html, css, property } from 'lit-element';
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
    `,
  ];

  constructor() {
    super();
    this.addEventListener('dragenter', this.onDragEnter, false);
    this.addEventListener('dragleave', this.onDragLeave, false);
    this.addEventListener('dragover', this.onDragOver, false);
    //this.addEventListener('drop', this.onDrop, false);
  }
  // onDrop(e: DragEvent) {
  //   console.log('drop');
  //   this.preventDefaults(e);

  //   this.dispatchEvent(
  //     new UUIFileUploaderEvent(UUIFileUploaderEvent.FILE_DROP)
  //   );
  // }
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

  private preventDefaults(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  @property({ type: Boolean, reflect: true })
  active = false;

  render() {
    return html`<span>Drop files here</span>`;
  }
}
