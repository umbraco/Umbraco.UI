import { LitElement, html, css, property } from 'lit-element';

/**
 *  @element uui-file-symbol
 */

export class UUIImageSymbolElement extends LitElement {
  static styles = [
    css`
      :host {
        display: grid;
        place-items: center;
        box-sizing: border-box;
        position: relative;
        width: 100%;
        font-size: 12px;
      }

      #clip-path-wrapper {
        display: grid;
        place-items: center;
        box-sizing: border-box;
        position: relative;
        width: 100%;
        font-size: 12px;
        background-color: var(--uui-interface-border, lightgray);
        clip-path: url(#outside-path);
      }

      #file-type {
        display: inline-block;
        position: absolute;
        bottom: 10%;
        left: 10%;

        padding: 0 1em;
        font-weight: 800;
        background-color: pink;
      }

      #image-prev {
        width: 100%;
        height: 100%;
        clip-path: url(#inside-path);
        transform: scale(0.95);
        object-fit: cover;
      }

      /* #corner-container {
        position: absolute;
        top: 0%;
        right: 0%;
        transform-origin: top right;
        transform: scale(0.38); }*/

      /* #corner {
        fill: var(--uui-interface-border, lightgray);

        width: 100%;
      } */
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
      <svg id="corner" width="0" height="0">
        <defs>
          <clipPath id="inside-path" clipPathUnits="objectBoundingBox">
            <path
              d="M0.76,0.351 C0.759,0.35,0.759,0.35,0.759,0.35 L0.759,0.35 L0.759,0.35 L0.759,0.35 C0.759,0.35,0.759,0.349,0.759,0.349 C0.759,0.349,0.759,0.348,0.759,0.346 C0.76,0.344,0.76,0.34,0.761,0.335 C0.762,0.326,0.764,0.312,0.766,0.296 C0.77,0.263,0.774,0.22,0.774,0.176 C0.774,0.132,0.771,0.089,0.762,0.056 C0.757,0.039,0.75,0.026,0.742,0.016 C0.733,0.006,0.723,0.001,0.709,0 L0,0 V1 L1,1 V0.429 C1,0.41,0.996,0.395,0.99,0.383 C0.984,0.371,0.974,0.362,0.963,0.355 C0.941,0.341,0.911,0.336,0.881,0.335 C0.851,0.335,0.821,0.339,0.798,0.344 C0.787,0.346,0.777,0.348,0.771,0.35 C0.767,0.351,0.765,0.351,0.763,0.352 C0.762,0.352,0.762,0.352,0.761,0.352 C0.761,0.352,0.761,0.353,0.761,0.353 L0.761,0.353 L0.76,0.353 L0.76,0.353 C0.76,0.353,0.76,0.353,0.76,0.351 M0.76,0.351 L0.759,0.35 L0.758,0.353 L0.76,0.353 L0.76,0.351"
            ></path>
          </clipPath>
          <clipPath id="outside-path" clipPathUnits="objectBoundingBox">
            <path
              d="M0.983,0.307 L0.781,0.024 L0.763,0 L0,0 V1 L1,1 V0.331 L0.983,0.307 L0.984,0.306 L0.983,0.307"
            ></path>
          </clipPath>
        </defs>
      </svg>
      <div id="clip-path-wrapper">
        <img id="image-prev" .src=${this.source} />
        <span id="file-type">${this.detectType().toUpperCase()}</span>
      </div>
    `;
  }
}
