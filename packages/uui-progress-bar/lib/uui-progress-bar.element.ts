import { LitElement, html, css } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

/**
 * @element uui-progress-bar
 */
@defineElement('uui-progress-bar')
export class UUIProgressBarElement extends LitElement {
  static styles = [
    css`
      :host {
        width: 100%;
        height: 4px;
        position: relative;
        overflow: hidden;
        background: var(--uui-interface-surface-alt);
        border-radius: 100px;
        display: inline-block;
      }

      #bar {
        transition: width 250ms ease;
        background: var(--uui-look-positive-surface);
        height: 100%;
        width: 0%;
      }
    `,
  ];

  private _progress = 0;
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
    this._progress = clamp(newVal, 0, 100);
    this.requestUpdate('progress', oldVal);
  }

  private _getProgressStyle() {
    return { width: `${this._progress}%` };
  }

  render() {
    return html`
      <div id="bar" style=${styleMap(this._getProgressStyle())}></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-progress-bar': UUIProgressBarElement;
  }
}
