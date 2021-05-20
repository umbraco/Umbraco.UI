import { property } from '@lit/reactive-element/decorators/property';
import { css, html, LitElement } from 'lit';
import { Size } from '../../type/Size';

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

      :host([size='m']) {
        --uui-loader-circle-size: var(--uui-size-medium, 24px);
      }

      :host([size='l']) {
        --uui-loader-circle-size: var(--uui-size-large, 30px);
      }

      :host([size='xl']) {
        --uui-loader-circle-size: var(--uui-size-xlarge, 42px);
      }

      :host([size='xxl']) {
        --uui-loader-circle-size: var(--uui-size-xlarge, 66px);
      }

      #svg-container {
        vertical-align: middle;
        overflow: hidden;
        display: inline-block;
        width: var(--uui-loader-circle-size);
      }

      #spinner {
        width: 100%;
        animation: 3s linear infinite svg-animation;
      }

      #circle {
        animation: 1.4s ease-in infinite circle-animation;
        display: block;
        fill: transparent;
        stroke: var(--uui-interface-chosen);
        stroke-linecap: round;
        stroke-dasharray: 283;
        stroke-dashoffset: 283;
        stroke-width: 12px;
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
          stroke-dashoffset: 283;
          transform: rotate(0);
        }

        50%,
        75% {
          stroke-dashoffset: 75;
          transform: rotate(45deg);
        }

        100% {
          stroke-dashoffset: 283;
          transform: rotate(360deg);
        }
      }
    `,
  ];

  @property({ reflect: true })
  size: Size = 's';

  render() {
    return html`<div id="svg-container">
      <svg id="circle" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle id="circle" cx="50" cy="50" r="40" />
      </svg>
    </div>`;
  }
}
