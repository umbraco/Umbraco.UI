import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';
import { LabelMixin } from '../../internal/mixins/index.js';
import { clamp } from '../../internal/utils/index.js';

export type UUIProgressBarStatus = 'in-progress' | 'finished' | 'error';

/**
 * @element uui-progress-bar
 * @property {string} label - accessible name of the progress bar, used as its aria-label. Not rendered visually.
 * @attribute label - accessible name of the progress bar, used as its aria-label. Not rendered visually.
 */
export class UUIProgressBarElement extends LabelMixin('label', LitElement) {
  private _progress = 0;
  private _max = 100;

  /**
   * Puts the progress bar into indeterminate mode.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  /**
   * Status of the tracked operation. Only changes the colour of the bar,
   * so pair `finished` and `error` with a visible message for assistive technologies.
   * @type {UUIProgressBarStatus}
   * @attr
   * @default 'in-progress'
   */
  @property({ type: String, reflect: true })
  status: UUIProgressBarStatus = 'in-progress';

  /**
   * Maximum value of the progress bar. Must be greater than `0`.
   * Invalid or omitted values fall back to `100`.
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
    this._max = Number.isFinite(newVal) && newVal > 0 ? newVal : 100;
    this.requestUpdate('max', oldVal);
  }

  /**
   * Set this to a number between 0 and `max` to reflect the progress of some operation.
   * Invalid or omitted values are treated as `0`.
   * @type {number}
   * @attr
   * @default 0
   */
  @property({ type: Number })
  get progress(): number {
    // Clamp on read so the result doesn't depend on whether `max` is set before or after `progress`.
    return clamp(this._progress, 0, this._max);
  }

  set progress(newVal: number | undefined) {
    const oldVal = this.progress;
    this._progress =
      typeof newVal === 'number' && Number.isFinite(newVal) ? newVal : 0;
    this.requestUpdate('progress', oldVal);
  }

  private _getProgressStyle(indeterminate: boolean) {
    return {
      width: indeterminate ? '100%' : `${(this.progress / this._max) * 100}%`,
    };
  }

  render() {
    const indeterminate = this.indeterminate;

    return html`
      <div
        id="bar"
        role="progressbar"
        aria-label=${ifDefined(
          this.getAttribute('aria-label') || this.label || undefined,
        )}
        aria-labelledby=${ifDefined(
          this.getAttribute('aria-labelledby') || undefined,
        )}
        aria-valuemin=${ifDefined(indeterminate ? undefined : '0')}
        aria-valuemax=${ifDefined(indeterminate ? undefined : `${this._max}`)}
        aria-valuenow=${ifDefined(
          indeterminate ? undefined : `${this.progress}`,
        )}
        style=${styleMap(this._getProgressStyle(indeterminate))}></div>
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
        position: relative;
        transition: width 250ms ease;
        background: var(--uui-color-default);
        height: 100%;
        border-radius: 2px;
        width: 0%;
      }

      :host([indeterminate]) #bar {
        width: 100%;
        background: transparent;
      }

      :host([indeterminate]) #bar::before {
        content: '';
        position: absolute;
        display: block;
        inset: 0;
        background: linear-gradient(
          -90deg,
          var(--uui-color-default) 0%,
          var(--uui-color-default) 25%,
          transparent 100%
        );
        transform: scaleX(0.4);
        animation: progress-bar-loading 1s infinite linear;
      }

      :host([status='finished']:not([indeterminate])) #bar {
        background: var(--uui-color-positive);
      }

      :host([status='error']:not([indeterminate])) #bar {
        background: var(--uui-color-invalid);
      }

      @media (prefers-reduced-motion) {
        :host([indeterminate]) #bar::before {
          animation: none;
          transform: none;
        }
      }

      @keyframes progress-bar-loading {
        0% {
          transform-origin: -175% 0%;
        }
        100% {
          transform-origin: 175% 0%;
        }
      }
    `,
  ];
}
