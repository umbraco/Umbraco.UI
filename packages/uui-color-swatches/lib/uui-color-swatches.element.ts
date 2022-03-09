import { LitElement, html, css } from 'lit';

import { styleMap } from 'lit/directives/style-map.js';

/**
 * @element uui-color-swatches
 */
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
        border-top: solid 1px var(--sl-color-neutral-200);
        padding: var(--sl-spacing-small);
      }
      .color-picker__swatch {
        position: relative;
        width: var(--swatch-size);
        height: var(--swatch-size);
        border-radius: var(--sl-border-radius-small);
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

    render(){
      ${this.swatches.length > 0
        ? html`
            <div class="swatches">
            ${this.swatches.map(swatch => {
              return html`
                <div
                  class="color-picker__swatch color-picker__transparent-bg"
                  tabindex=${ifDefined(this.disabled ? undefined : '0')}
                  role="button"
                  aria-label=${swatch}
                >
                <div class="color-picker__swatch-color" style=${styleMap({ backgroundColor: swatch })}></div>
              </div>
            `;
                })}
            </div>
        `: 
        ''}
    }
}