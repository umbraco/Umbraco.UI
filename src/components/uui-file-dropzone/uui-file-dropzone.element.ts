import { html, css } from 'lit';
import { UUIFileDropzoneBaseElement } from './uui-file-dropzone-base.element';

/**
 *  @element uui-file-input
 */

//todo auto upload
export class UUIFileDropzoneElement extends UUIFileDropzoneBaseElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: var(--uui-size-medium, 24px);
        border: 1px var(--uui-look-placeholder-border-style)
          var(--uui-interface-border);
      }

      :host(:focus-within) {
        outline: 1px solid #6ab4f0;

        box-shadow: inset 0px 0px 2px 0px #6ab4f0;
      }

      :host([active]) {
        border: 1px var(--uui-look-placeholder-border-style)
          var(--uui-interface-border-hover);
      }

      :host::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        background-color: var(--uui-interface-surface);
        opacity: 0.6;
        z-index: 1;
      }

      :host([active])::before {
        opacity: 0.8;
      }

      #upload-icon {
        fill: var(--uui-interface-border);
        width: 100px;
        transition: fill 0.3s ease;
        position: relative;
        z-index: 2;
      }

      #input-button {
        position: relative;
        z-index: 2;
      }

      :host([active]) #upload-icon {
        fill: var(--uui-interface-border-hover);
      }

      :host([hidden]) {
        display: none;
      }

      :host([error]) #upload-icon {
        fill: var(--uui-color-maroon-flush, #d42054);
      }
    `,
    UUIFileDropzoneBaseElement.styles,
  ];

  constructor() {
    super();
    this.addEventListener('click', this.handleClick);
  }

  private handleClick(e: Event) {
    console.log('click');
    e.stopImmediatePropagation();
    this.openNativeInput();
  }

  renderFileDropzone() {
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
        ? html`<uui-button aria-controls="input" id="input-button"
            >Click or drag & drop ${this.multiple ? 'files' : 'file'}
            here</uui-button
          >`
        : html`<span>Only one file is allowed</span>`}`;
  }
}
