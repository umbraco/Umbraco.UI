import { LitElement, html, css } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property } from 'lit/decorators.js';
import { ActiveMixin } from '@umbraco-ui/uui-base/lib/mixins';

/**
 *  @element uui-symbol-sort
 *  @description A symbol indicating weather related composition is sorting(active) and weather the sorting is ascending or descending.
 *  Please define aria-sort on the header for the composition.
 *  @property active - Set this boolean to true for then the related composition is sorted.
 *  @property descending - Set this boolean to true for displaying descending sort is active.
 */
@defineElement('uui-symbol-sort')
export class UUISymbolSortElement extends ActiveMixin(LitElement) {
  static styles = [
    css`
      :host {
        position: relative;
        display: inline-block;
        width: 0.8em;
        height: 1em;
        vertical-align: middle;
        pointer-events: none;
      }

      svg {
        position: absolute;
        left: 0;
        top: 50%;
        width: 0.8em;
        fill: currentColor;
        transform-origin: 50% 50%;
        transition: transform 120ms ease-in-out, opacity 120ms, margin-top 240ms;
        opacity: 0;
        margin-top: -0.5em;
      }

      #up {
        transform: rotate(180deg);
        margin-top: -0.7em;
      }
      #down {
        margin-top: -0.3em;
      }
      :host([active]) #up {
        margin-top: calc(-0.5em - (0.2em * var(--uui-symbol-sort-hover, 0)));
      }
      :host([active]) #down {
        margin-top: calc(-0.5em + (0.2em * var(--uui-symbol-sort-hover, 0)));
      }

      :host(:hover) {
        --uui-symbol-sort-hover: 1;
      }
      :host(:not([active])) #up,
      :host(:not([active])) #down {
        opacity: calc(0.25 * var(--uui-symbol-sort-hover, 0));
      }

      :host([active]:not([descending])) #down {
        opacity: 1;
      }
      :host([active]:not([descending])) #up {
        opacity: calc(0.25 * var(--uui-symbol-sort-hover, 0));
      }

      :host([active][descending]) #up {
        opacity: 1;
      }
      :host([active][descending]) #down {
        opacity: calc(0.25 * var(--uui-symbol-sort-hover, 0));
      }
    `,
  ];

  /**
   * Turns the arrow around.
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public descending = false;

  render() {
    return html`<svg id="up" viewBox="0 0 512 512">
        <path d="M 255.125 400.35 L 88.193 188.765 H 422.055 Z"></path>
      </svg>
      <svg id="down" viewBox="0 0 512 512">
        <path d="M 255.125 400.35 L 88.193 188.765 H 422.055 Z"></path>
      </svg>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-symbol-sort': UUISymbolSortElement;
  }
}
