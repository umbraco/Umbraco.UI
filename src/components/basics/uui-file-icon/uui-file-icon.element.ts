import {
  LitElement,
  html,
  css,
  property,
  internalProperty,
  query,
  queryAll,
} from 'lit-element';
import { nothing } from 'lit-html';
import { UUIFilePreviewElement } from '../uui-file-preview/uui-file-preview.element';
import { UUIFileUploaderElement } from '../uui-file-uploader/uui-file-uploader.element';
import { UUIFileUploaderEvent } from '../uui-file-uploader/UUIFileUploaderEvents';

/**
 *  @element uui-file-icon
 */

export class UUIFileIconElement extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        position: relative;
        max-width: 100px;
      }

      #file-type {
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 10%;
        font-size: 12px;
        padding: 0 1em;
        font-weight: 800;
        background-color: pink;
      }

      #icon {
        fill: var(--uui-interface-border, lightgray);
      }
    `,
  ];

  @property({})
  type = '';

  render() {
    return html`<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="100%"
        id="icon"
      >
        <path
          d="M396.441 138.878l-83.997-83.993-7.331-7.333H105.702v416.701h298.071V146.214l-7.332-7.336zM130.74 439.217V72.591h141.613c37.201 0 19.274 88.18 19.274 88.18s86-20.901 87.104 18.534v259.912H130.74z"
        />
      </svg>
      <span id="file-type">${this.type.toUpperCase()}</span> `;
  }
}
