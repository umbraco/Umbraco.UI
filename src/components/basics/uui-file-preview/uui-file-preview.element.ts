import { LitElement, html, css, property, internalProperty } from 'lit-element';

/**
 *  @element uui-file-preview
 */

//todo auto upload
export class UUIFilePreviewElement extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }

      #image-prev {
        width: 200px;
      }
    `,
  ];

  @property({ attribute: false })
  source = '';

  @property({ attribute: false })
  name = '';

  render() {
    return html`<img id="image-prev" src=${this.source} />
      <span id="file-name">${this.name}</span>`;
  }
}
