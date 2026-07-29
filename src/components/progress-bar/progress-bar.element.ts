import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';

const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

/**
 * @element uui-progress-bar
 */
export class UUIProgressBarElement extends LitElement {
  private _progress = 0;
  private _max = 100;

  /**
   * Accessible label for the progress bar.
   * @type {string}
   * @attr label
   * @default undefined
   */
  @property({ type: String })
  label?: string;

  /**
   * Maximum value of the progress bar.
   * @type {number}
   * @attr max
   * @default 100
   */
  @property({ type: Number })
  get max() {
    return this._max;
  }

  set max(newVal) {
    const oldVal = this._max;
    this._max = Math.max(newVal, 1);
    this._progress = clamp(this._progress, 0, this._max);
    this.requestUpdate('max', oldVal);
  }

  /**
   * Set this to a number between 0 and 100 to reflect the progress of some operation.
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
    this._progress = clamp(newVal, 0, this._max);
    this.requestUpdate('progress', oldVal);
  }

  private _getProgressStyle() {
    return { width: `${(this._progress / this._max) * 100}%` };
  }

  render() {
    return html`
      <progress
        id="bar"
        aria-label=${ifDefined(
          this.getAttribute('aria-label') || this.label || undefined,
        )}
        aria-labelledby=${ifDefined(
          this.getAttribute('aria-labelledby') || undefined,
        )}
        aria-valuemin="0"
        aria-valuemax=${this._max}
        aria-valuenow=${this._progress}
        value=${this._progress}
        max=${this._max}
        style=${styleMap(this._getProgressStyle())}></progress>
    `;
  }

  static override readonly styles = [
    css`
      :host {
        position: relative;
        display: inline-block;
        width: 100%;
        height: 3px;
        overflow: clip;
        background: var(--uui-color-surface-alt);
        border-radius: 2px;
      }

      #bar {
        transition: width 250ms ease;
        background: var(--uui-color-positive);
        height: 100%;
        border-radius: 2px;
        width: 0%;
      }
    `,
  ];
}
