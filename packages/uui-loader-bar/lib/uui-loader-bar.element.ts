import { css, html, LitElement } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property } from 'lit/decorators.js';

const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

/**
 *  @element uui-loader-bar
 * @description - Linear loader for indicating loading.
 */
@defineElement('uui-loader-bar')
export class UUILoaderBarElement extends LitElement {
  static styles = [
    css`
      :host {
        position: relative;
        display: block;
        width: 100%;
        height: 4px;
        overflow: hidden;
      }

      #bar,
      #bar-anim,
      #bar-background {
        position: absolute;
        inset: 0; /* top, left, bottom and right = 0*/
        height: 100%;
      }

      #bar-background,
      #bar {
        background: currentColor;
      }

      #bar {
        transition: max-width 120ms ease;
      }

      #bar-background {
        opacity: 0.3;
      }

      #bar-anim {
        transform: scaleX(0.4);
        animation: bar-loading 1s infinite linear;
        background: linear-gradient(
          -90deg,
          white 0%,
          white 25%,
          transparent 100%
        );
      }

      #bar-anim.animate {
        background: linear-gradient(
          -90deg,
          currentColor 0%,
          currentColor 25%,
          transparent 100%
        );
      }

      @keyframes bar-loading {
        0% {
          transform-origin: -175% 0%;
        }
        100% {
          transform-origin: 175% 0%;
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

  render() {
    return html`
      ${this.progress
        ? html`<div
            id="bar"
            style="max-width: ${this.progress.toString()}%;"></div>`
        : ''}
      <div
        id="bar-anim"
        class=${this.progress ? '' : 'animate'}
        style="animation-duration: ${this.animationDuration}s"></div>
      <div id="bar-background"></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-loader-bar': UUILoaderBarElement;
  }
}
