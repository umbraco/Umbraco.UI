import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

/**
 *  @element uui-loader-bar
 * @description - Linear loader for indicating loading.
 */
export class UUILoaderBarElement extends LitElement {
  static styles = [
    css`
      #bar-anim {
        animation: bar-loading 1s infinite linear;
        background: linear-gradient(
          -90deg,
          #ffffff45 0%,
          white 25%,
          transparent 100%
        );
      }

      .animate #bar-anim {
        background: linear-gradient(
          -90deg,
          currentColor 0%,
          currentColor 25%,
          transparent 100%
        );
      }

      .animate #bar {
        display: none;
      }

      #bar-container {
        width: 100%;
        height: 4px;
        position: relative;
        overflow: hidden;
      }

      #bar {
        transition: max-width 250ms ease;
      }

      #bar-background,
      #bar {
        background: currentColor;
      }

      #bar,
      #bar-anim,
      #bar-background {
        position: absolute;
        inset: 0; /* top, left, bottom and right = 0*/
        height: 100%;
      }

      #bar-background {
        opacity: 0.3;
      }

      @keyframes bar-loading {
        0% {
          transform: scaleX(0.4);
          transform-origin: -175% 0%;
        }

        100% {
          transform-origin: 175% 0%;
          transform: scaleX(0.4);
        }
      }
    `,
  ];

  private _progress = 0;
  /**
   * Set this to a number between 0 and 100 to reflect the progress of some operation. When the value is left at 0 loader will looped animation
   * @type {number}
   * @attr
   * @default 0
   */
  @property({ type: Number })
  get progress() {
    return this._progress;
  }

  set progress(newVal) {
    const oldVal = this._progress;
    this._progress = clamp(newVal, 0, 100);
    this.requestUpdate('progress', oldVal);
  }

  private _animationDuration = 1;
  /**
   * Set this to a number greater then 0 to define the length of loader animation in seconds. Passing 0 or a negative number as a value will set it to 1 second. This is because negative values are illegal in the `animation-duration` css property, and value of 0 just stops the animation.
   * @type {number}
   * @attr
   * @default 1
   */
  @property({ type: Number })
  get animationDuration() {
    return this._animationDuration;
  }

  set animationDuration(newVal) {
    const oldVal = this._animationDuration;
    this._animationDuration = newVal >= 0 ? newVal : 1;
    this.requestUpdate('animationDuration', oldVal);
  }

  private getProgressStyle() {
    return { maxWidth: `${this.progress}%` };
  }

  render() {
    return html`
      <div id="bar-container" class=${this.progress ? '' : 'animate'}>
        <div
          id="bar"
          style=${this.progress ? styleMap(this.getProgressStyle()) : ''}></div>
        <div
          id="bar-anim"
          style="animation-duration: ${this.animationDuration}s"></div>
        <div id="bar-background"></div>
      </div>
    `;
  }
}
