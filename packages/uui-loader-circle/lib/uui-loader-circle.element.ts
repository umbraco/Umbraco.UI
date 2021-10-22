import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { Size } from '@umbraco-ui/uui-base/lib/types';

/**
 *  @element uui-loader-circle
 * @description - Circular loader for indicating loading. You can put in in a button ;)
 */
export class UUILoaderCircleElement extends LitElement {
  static styles = [
    css`
      :host {
        /* currently this components color is defined through currentColor, if we like to use a different color, we need to implemenet a --uui-interface- color which will be set/overwritten when looks are set, aka. if this element is used within a button with the look danger, then this component would get an appropriate color. */
        --uui-loader-circle-size: var(--uui-size-small, 12px);
        display: inline-block;
        vertical-align: middle;
        line-height: 0;
      }

      :host([size='xs']) {
        --uui-loader-circle-size: var(--uui-size-xsmall, 9px);
      }

      :host([size='s']) {
        --uui-loader-circle-size: var(--uui-size-small, 12px);
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
        overflow: hidden;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: var(--uui-loader-circle-size);
        height: var(--uui-loader-circle-size);
      }

      .animate #spinner {
        animation: 3s linear infinite svg-animation;
      }

      .animate #circle {
        animation: 1.4s ease-in infinite circle-animation;
      }

      #spinner {
        width: 100%;
      }

      #circle {
        display: block;
        fill: transparent;
        stroke: currentColor;
        stroke-linecap: round;
        stroke-dasharray: 0 301.592894745;

        stroke-width: 6px;
        transform-origin: 50% 50%;
        transform: rotate(-90deg);
        transition: stroke-dasharray 500ms ease;
      }

      #circle2 {
        fill: transparent;
        stroke: currentColor;
        stroke-width: 6px;
        opacity: 0.5;
      }

      #progress-display {
        position: absolute;
        left: 0;
        top: 50%;
        right: 0;
        stroke: currentColor;
        transform: translateY(-50%);
        font-size: 10px;
        font-weight: 700;
        text-align: center;
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
          stroke-dashoffset: 100;
          transform: rotate(0);
        }

        50%,
        75% {
          stroke-dashoffset: 20;
          transform: rotate(45deg);
        }

        100% {
          stroke-dashoffset: 100;
          transform: rotate(360deg);
        }
      }
    `,
  ];

  private _strokeDashOffset() {
    if (this.progress) {
      return { strokeDasharray: `${this.progress}, 100` };
    } else {
      return { strokeDasharray: '100' };
    }
  }

  private _largeSizes = ['l', 'xl'];

  /**
   * Sets the size of the loader
   * @attr
   * @type {''|'xs' | 's' | 'm' | 'l' | 'xl'}
   * @default ''
   */
  @property({ reflect: true })
  size: Size = 's';

  /**
   * Sets the progress that loader shows
   * @type {number}
   * @attr
   * @default 0
   */
  @property({ type: Number })
  progress = 0;

  /**
   * If true then element displays progress number for sizes `l` and `xl`.
   * @type {boolean}
   * @attr show-progress
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-progress' })
  showProgress = false;

  render() {
    return html`<div id="svg-container" class=${this.progress ? '' : 'animate'}>
      <svg id="spinner" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <circle id="circle2" cx="50%" cy="50%" r="15.9155" />
        <circle
          id="circle"
          cx="50%"
          cy="50%"
          r="15.9155"
          style=${styleMap(this._strokeDashOffset())} />
      </svg>
      ${this._largeSizes.includes(this.size) &&
      this.progress &&
      this.showProgress
        ? html`<span id="progress-display">${this.progress}</span>`
        : ''}
    </div>`;
  }
}
