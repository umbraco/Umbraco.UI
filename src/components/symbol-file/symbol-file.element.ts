import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { UUITextStyles } from '../../styles/index.js';

/**
 *  @element uui-file-symbol
 */

export class UUISymbolFileElement extends LitElement {
  /**
   * The text that will appear on the file icon
   * @type {string}
   */
  @property({ type: String })
  type = '';

  render() {
    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="0.6"
        stroke-linecap="round"
        stroke-linejoin="round"
        id="icon">
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      </svg>

      ${this.type
        ? html`<small id="file-type" class="uui-small"
            >${this.type.toUpperCase()}</small
          >`
        : ''}
    `;
  }

  static override readonly styles = [
    UUITextStyles,
    css`
      :host {
        position: relative;
        display: block;
        box-sizing: border-box;
      }

      #file-type {
        position: absolute;
        bottom: 20%;
        left: 12%;
        margin-left: calc(var(--uui-size-3) * -1);
        padding: 0px var(--uui-size-3);
        font-weight: 700;
        background-color: var(--uui-color-surface-alt);
        max-width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        border-radius: var(--uui-border-radius);
      }

      #icon {
        width: 100%;
        color: var(--uui-color-border-standalone);
      }
    `,
  ];
}
