import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import {
  InterfaceLookCSSCreator,
  InterfaceLookType,
} from '../../type/InterfaceLook';

/**
 *  @element uui-loader-circle
 * @description - Circular loader for indicating loading. You can put in in a button ;)
 */

export class UUILoaderCircleElement extends LitElement {
  static styles = [
    css`
      :host {
        --uui-loader-circle-size: var(--uui-size-small, 12px);
        --uui-loader-circle-thickness: 0.6;
      }

      #svg-container {
        vertical-align: middle;
        overflow: hidden;
        display: inline-block;
        width: 100%;
      }

      svg {
        width: 100%;
        animation: 2s linear infinite svg-animation;
      }

      circle {
        animation: 1.4s ease-in-out infinite both circle-animation;
        display: block;
        fill: transparent;
        stroke: #2f3d4c;
        stroke-linecap: round;
        stroke-dasharray: 283;
        stroke-dashoffset: 280;
        stroke-width: 15px;
        transform-origin: 50% 50%;
      }

      @keyframes svg-animation {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      @keyframes circle-animation {
        0%,
        25% {
          stroke-dashoffset: 280;
          transform: rotate(0);
        }

        50%,
        75% {
          stroke-dashoffset: 75;
          transform: rotate(45deg);
        }

        100% {
          stroke-dashoffset: 280;
          transform: rotate(360deg);
        }
      }
    `,
  ];

  render() {
    return html`<div id="svg-container">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="40" />
      </svg>
    </div>`;
  }
}
