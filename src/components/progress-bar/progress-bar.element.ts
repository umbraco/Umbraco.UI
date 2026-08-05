import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';
import { LabelMixin } from '../../internal/mixins/index.js';
import { clamp } from '../../internal/utils/index.js';

export type UUIProgressBarStatus = 'in-progress' | 'finished' | 'error';

/**
 * @element uui-progress-bar
 */
export class UUIProgressBarElement extends LabelMixin('label', LitElement) {
  private _progress = 0;
  private _hasProgressValue = false;
  private _max = 100;

  /**
   * Status of the tracked operation.
   * @type {UUIProgressBarStatus}
   * @attr
   * @default 'in-progress'
   */
  @property({ type: String, reflect: true })
  status: UUIProgressBarStatus = 'in-progress';

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
    const next = Number.isFinite(newVal) ? newVal : 1;
    this._max = Math.max(next, 1);
    if (this._hasProgressValue) {
      this._progress = clamp(this._progress, 0, this._max);
    }
    this.requestUpdate('max', oldVal);
  }

  /**
   * Set this to a number between 0 and `max` to reflect the progress of some operation.
   * Invalid or omitted values are treated as indeterminate progress.
   * @type {number}
   * @attr
   * @default 0
   */
  @property({ type: Number })
  get progress() {
    return this._progress;
  }

  set progress(newVal: number | undefined) {
    const oldVal = this._progress;
    if (typeof newVal === 'number' && Number.isFinite(newVal)) {
      this._hasProgressValue = true;
      this._progress = clamp(newVal, 0, this._max);
    } else {
      this._hasProgressValue = false;
      this._progress = 0;
    }
    this.requestUpdate('progress', oldVal);
  }

  private _getProgressStyle() {
    return { width: `${(this._progress / this._max) * 100}%` };
  }

  render() {
    const isFinished = this.status === 'finished';
    const isError = this.status === 'error';
    const indeterminate = !isFinished && !isError && !this._hasProgressValue;

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
        aria-busy=${!isFinished}
        aria-invalid=${isError}
        aria-valuemin=${ifDefined(indeterminate ? undefined : '0')}
        aria-valuemax=${ifDefined(indeterminate ? undefined : `${this._max}`)}
        aria-valuenow=${ifDefined(
          indeterminate ? undefined : `${this._progress}`,
        )}
        style=${styleMap(this._getProgressStyle())}></div>
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
        background: var(--uui-color-default);
        height: 100%;
        border-radius: 2px;
        width: 0%;
      }

      :host([status='finished']) #bar {
        background: var(--uui-color-positive);
      }

      :host([status='error']) #bar {
        background: var(--uui-color-invalid);
      }
    `,
  ];
}
