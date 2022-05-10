import { LitElement, html, css } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property } from 'lit/decorators.js';

import { styleMap } from 'lit/directives/style-map.js';

/**
 *  @element uui-color-swatches
 *  @description 
 */
 @defineElement('uui-color-swatches')
export class UUIColorSwatchesElement extends LitElement {
  static styles = [
    css`
      :host {
        --swatch-size: 25px;
        
        display: inline-block;
      }

      .color-picker__swatches {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        grid-gap: 0.5rem;
        justify-items: center;
        border-top: solid 1px #ededef;
        padding: 0.75rem;
      }

      .color-picker__swatch {
        position: relative;
        width: var(--swatch-size);
        height: var(--swatch-size);
        border-radius: 3px;
      }
      
      .color-picker__swatch .color-picker__swatch-color {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: solid 1px rgba(0, 0, 0, 0.125);
        border-radius: inherit;
        cursor: pointer;
      }
    `,
  ];

  @property({ attribute: false }) swatches: string[] = [];

  constructor() {
    super();
  }

  render() {
    return html`
          <div class="swatches">
          ${this.swatches.map(swatch => {
            return html`
              <div
                class="color-picker__swatch color-picker__transparent-bg"
                role="button"
                aria-label=${swatch}
              >
              <div class="color-picker__swatch-color" style=${styleMap({ backgroundColor: swatch })}></div>
            </div>`;
          })}
          </div>
      `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-color-swatches': UUIColorSwatchesElement;
  }
}