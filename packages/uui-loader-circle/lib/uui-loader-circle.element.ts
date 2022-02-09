import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

/**
 *  @element uui-loader-circle
 * @description - Circular loader for indicating loading. You can put in in a button ;)
 */
@defineElement('uui-loader-circle')
export class UUILoaderCircleElement extends LitElement {
  static styles = [
    css`
      :host {
        vertical-align: middle;
        line-height: 0;
        overflow: hidden;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 1em;
        height: 1em;
      }

      #spinner {
        width: 100%;
        height: 100%;
      }
      #spinner g {
        transform-origin: 50% 50%;
        animation: 18s linear infinite spinner-animation;
      }
      #spinner.animate g {
        animation: 800ms linear infinite spinner-animation;
      }

      @keyframes spinner-animation {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      #spinner.animate #circle {
        animation: 1400ms ease-in infinite circle-animation;
        /** ease-in */
      }

      @keyframes circle-animation {
        0% {
          stroke-dashoffset: -55;
        }
        38% {
          stroke-dashoffset: -88;
        }
        100% {
          stroke-dashoffset: -55;
        }
      }

      svg circle {
        fill: transparent;
        stroke: currentColor;
        stroke-width: 6px;
      }

      #bg {
        opacity: 0.5;
      }

      #circle {
        stroke-linecap: round;
        stroke-dasharray: 0 0;

        transform-origin: 50% 50%;
        transform: rotate(-90deg);
        transition: stroke-dasharray 120ms ease;
      }

      #progress-display {
        position: absolute;
        left: 0;
        top: 50%;
        right: 0;
        stroke: currentColor;
        transform: translateY(-50%);
        font-size: 0.3em;
        font-weight: 700;
        text-align: center;

        /* Center the text */
        padding-top: 0.09em;
      }
    `,
  ];

  private _circleStyle() {
    if (this.progress) {
      return { strokeDasharray: `${this.progress} 100` };
    } else {
      return { strokeDasharray: '100 100' };
    }
  }

  /**
   * Sets the progress that loader shows
   * @type {number}
   * @attr
   * @default 0
   */
  @property({ type: Number })
  progress = 0;

  /**
   * If true then element displays progress number at bigger sizes
   * @type {boolean}
   * @attr show-progress
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-progress' })
  showProgress = false;

  private _resizeObserver = new ResizeObserver(() => this.onResize());
  private _isLarge = false;

  firstUpdated() {
    this._resizeObserver.observe(this);
  }

  disconnectedCallback() {
    this._resizeObserver.disconnect();
  }

  onResize() {
    const newIsLarge = this.clientHeight >= 30;

    if (this._isLarge != newIsLarge) {
      this._isLarge = newIsLarge;
      this.requestUpdate();
    }
  }

  protected renderProgress() {
    return this._isLarge && this.progress && this.showProgress
      ? html`<span id="progress-display">${this.progress}</span>`
      : '';
  }

  render() {
    return html`
      <svg
        id="spinner"
        class=${this.progress ? '' : 'animate'}
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg">
        <circle id="bg" cx="50%" cy="50%" r="16" />
        <g>
          <circle
            id="circle"
            cx="50%"
            cy="50%"
            r="16"
            style=${styleMap(this._circleStyle())} />
        </g>
      </svg>
      ${this.renderProgress()}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-loader-circle': UUILoaderCircleElement;
  }
}
