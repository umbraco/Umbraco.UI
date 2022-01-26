import { LitElement, html, css } from 'lit';

import { styleMap } from 'lit/directives/style-map.js';

/**
 * @element uui-color-swatches
 */
export class UUIColorSwatchesElement extends LitElement {
      static styles = [
    css`
      :host {
        /* Styles goes here */
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