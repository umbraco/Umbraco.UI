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

  render() {
    return html`<img id="image-prev" src=${this.source} />
      <span id="file-name">${this.name}</span> `;
  }
  // onButtonClick(): void {
  //   this.dispatchEvent(
  //     new UUIFilePreviewEvent(UUIFilePreviewEvent.REMOVE_FILE)
  //   );
  // }
}
