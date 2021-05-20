import { css, html } from 'lit';
import { UUIFileDropzoneBaseElement } from '../uui-file-dropzone/uui-file-dropzone-base.element';

/**
 *  @element uui-file-dropzone-button
 */

export class UUIFileDropzoneButtonElement extends UUIFileDropzoneBaseElement {
  static styles = [
    css`
      :host {
        display: flex;
        align-items: stretch;
        justify-content: center;
      }
    `,
    UUIFileDropzoneBaseElement.styles,
  ];

  constructor() {
    super();
    this.addEventListener('click', this.openNativeInput);
  }

  renderFileDropzone() {
    return html`<span>Drop your stuff here</span>`;
  }
}
