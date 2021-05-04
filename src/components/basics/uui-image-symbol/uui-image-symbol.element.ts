import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators';

/**
 *  @element uui-file-symbol
 */

export class UUIImageSymbolElement extends LitElement {
  static styles = [
    css`
      :host {
        display: block;

        box-sizing: border-box;
        position: relative;
        width: 100%;
        aspect-ratio: 1;
        font-size: 12px;
      }

      #clip-path-wrapper {
        display: grid;
        place-items: center;
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        font-size: 12px;
        clip-path: polygon(60% 0, 100% 25%, 100% 100%, 0 100%, 0 0);
      }

      #svg-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
      }

      #file-frame {
        fill: var(--uui-interface-border, lightgray);
        width: 100%;
        height: 100%;
      }

      #file-type {
        display: inline-block;
        position: absolute;
        bottom: 10%;
        left: 10%;
        padding: 0 1em;
        font-weight: 800;
        color: var(--uui-color-gunmetal, #162335);
        background-color: var(--uui-color-spanish-pink, #f5c1bc);
      }

      #image-prev {
        width: 100%;
        object-fit: contain;
      }
    `,
  ];

  @property({ attribute: false })
  source = '';

  detectType() {
    const first = this.source.indexOf('/');
    const last = this.source.indexOf(';');
    return this.source.slice(first + 1, last);
  }

  render() {
    return html`
      <div id="svg-wrapper">
        <svg id="file-frame" viewBox="0 0 1 1">
          <path
            d="M0,1 L1,1 V0.25 L0.65,0 L0,0 V1ZM.0372.9672V.0372H.5952C.7347.0372.6696.2697.6696.2697S.9579.2046.9672.3069V.9672H.0372z"
          ></path>
        </svg>
      </div>
      <div id="clip-path-wrapper">
        <img id="image-prev" .src=${this.source} />
        <span id="file-type">${this.detectType().toUpperCase()}</span>
      </div>
    `;
  }
}
//M.02.98V.02H.596C.74.02.6728.26.6728.26S.9704.1928.98.2984V.98H.02 - thinner
//M.0372.9672V.0372H.5952C.7347.0372.6696.2697.6696.2697S.9579.2046.9672.3069V.9672H.0372 - medium
//M.05.95V.05H.59C.725.05.662.275.662.275S.941.212.95.311V.95H.05

// <svg id="corner" width="0" height="0">
// <defs>
//   <clipPath id="inside-path" clipPathUnits="objectBoundingBox">
//     <path
//       d="M0,1 V0 H0.569 C0.722,0,0.649,0.26,0.65,0.25 S0.996,0.183,1,0.29 V1 H0"
//     ></path>
//   </clipPath>
//   <clipPath id="outside-path" clipPathUnits="objectBoundingBox">
//     <path d="M0,1 L1,1 V0.25 L0.65,0 L0,0 V1"></path>
//   </clipPath>
// </defs>
// </svg>
