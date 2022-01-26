import { LitElement, html, css } from 'lit';

import { styleMap } from 'lit/directives/style-map.js';

/**
 * @element uui-color-picker-slider
 */
export class UUIColorPickerSliderElement extends LitElement {
      static styles = [
    css`
      :host {
        /* Styles goes here */
      }
    `,
  ];

 /**
 * This is a minimum value of the slider.
 * @type {number}
 * @attr
 * @default 0
 */
  @property({ type: Number })
  min = 0;

  /**
   * This is a maximum value of the slider.
   * @type {number}
   * @attr
   * @default 100
   */
  @property({ type: Number })
  max = 100;

  /**
  * The orientation of the slider.
  * @type {string}
  * @attr
  * @default 'horizontal'
  */
  @property({ type: String })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  /**
  * Label to be used for aria-label and eventually as visual label
  * @type {string}
  * @attr
  */
   @property({ type: String })
   public label!: string;

  @property() value = '';

  /** Disables the color picker slider. */
  @property({ type: Boolean, reflect: true }) disabled = false;

    render(){
        return html`
          <div
          part="slider hue-slider"
          class="color-picker__hue color-picker__slider"
          >
          <span
            class="color-picker__slider-handle"
            style=${styleMap({
              left: `${this.hue === 0 ? 0 : 100 / (360 / this.hue)}%`
            })}
            role="slider"
            aria-label="${this.label}"
            aria-orientation="${this.orientation}"
            aria-valuemin="${Math.round(this.min)}"
            aria-valuemax="${Math.round(this.max)}"
            aria-valuenow=${Math.round(this.value)}
            tabindex=${ifDefined(this.disabled ? undefined : '0')}
          ></span>
        </div>
        `;
    }
}