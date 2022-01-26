import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';

import { styleMap } from 'lit/directives/style-map.js';
import { UUIColorPickerEvent } from './UUIColorPickerEvents';

/**
 * @element uui-color-picker
 */
export class UUIColorPickerElement extends LitElement {
      static styles = [
    css`
      :host {
        /* Styles goes here */
      }
    `,
  ];

  @state() private inputValue = '';
  @state() private hue = 0;
  @state() private saturation = 100;
  @state() private lightness = 100;
  @state() private alpha = 100;

  private _value = '';
  /**
   * This is a value property of the uui-color-picker.
   * @type {string}
   * @attr
   * @default ''
   */
  @property({ type: String })
  get value() {
    return this._value;
  }

  /**
   * The format to use for the display value. If opacity is enabled, these will translate to HEXA, RGBA, and HSLA
   * respectively. The color picker will always accept user input in any format (including CSS color names) and convert
   * it to the desired format.
   */
  @property() format: 'hex' | 'rgb' | 'hsl' = 'hex';

  /** The input's name attribute. */
  @property() name = '';

  /** Disables the color picker. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Whether to show the opacity slider. */
  @property({ type: Boolean }) opacity = false;


  /**
  * An array of predefined color swatches to display. Can include any format the color picker can parse, including
  * HEX(A), RGB(A), HSL(A), and CSS color names.
  */
    @property({ attribute: false }) swatches: string[] = [
    '#d0021b',
    '#f5a623',
    '#f8e71c',
    '#8b572a',
    '#7ed321',
    '#417505',
    '#bd10e0',
    '#9013fe',
    '#4a90e2',
    '#50e3c2',
    '#b8e986',
    '#000',
    '#444',
    '#888',
    '#ccc',
    '#fff'
  ];


  constructor() {
    super();
    
  }

  private _onChange() {
    this.dispatchEvent(new UUIColorPickerEvent(UUIColorPickerEvent.CHANGE));
  }

  render(){
    const x = this.saturation;
    const y = 100 - this.lightness;

    const colorPicker = html`
      <div
        class=${classMap({
          'color-picker': true,
          'color-picker--inline': this.inline,
          'color-picker--disabled': this.disabled
        })}
        aria-disabled=${this.disabled ? 'true' : 'false'}
      >
        <div
          part="grid"
          class="color-picker__grid"
          style=${styleMap({ backgroundColor: `hsl(${this.hue}deg, 100%, 50%)` })}
          @mousedown=${this._onChange}
          @touchstart=${this._onChange}
        >
          <span
            part="grid-handle"
            class="color-picker__grid-handle"
            style=${styleMap({
              top: `${y}%`,
              left: `${x}%`,
              backgroundColor: `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%)`
            })}
            role="application"
            aria-label="HSL"
            tabindex=${ifDefined(this.disabled ? undefined : '0')}
            @keydown=${this.handleGridKeyDown}
          ></span>
        </div>
        <div class="color-picker__controls">
          <div class="color-picker__sliders">
            <uui-color-picker-slider
              label="hue"
              min="0"
              max="360"
              value=${Math.round(this.hue)}
            >
            </uui-color-picker-slider>

            <div
              part="slider hue-slider"
              class="color-picker__hue color-picker__slider"
              @mousedown=${this.handleHueDrag}
              @touchstart=${this.handleHueDrag}
            >
              <span
                part="slider-handle"
                class="color-picker__slider-handle"
                style=${styleMap({
                  left: `${this.hue === 0 ? 0 : 100 / (360 / this.hue)}%`
                })}
                role="slider"
                aria-label="hue"
                aria-orientation="horizontal"
                aria-valuemin="0"
                aria-valuemax="360"
                aria-valuenow=${Math.round(this.hue)}
                tabindex=${ifDefined(this.disabled ? undefined : '0')}
                @keydown=${this.handleHueKeyDown}
              ></span>
            </div>
            ${this.opacity
              ? html`
                  <uui-color-picker-slider
                    label="alpha"
                    min="0"
                    max="100"
                    value=${Math.round(this.alpha)}
                  >
                  </uui-color-picker-slider>

                  <div
                    part="slider opacity-slider"
                    class="color-picker__alpha color-picker__slider color-picker__transparent-bg"
                    @mousedown="${this.handleAlphaDrag}"
                    @touchstart="${this.handleAlphaDrag}"
                  >
                    <div
                      class="color-picker__alpha-gradient"
                      style=${styleMap({
                        backgroundImage: `linear-gradient(
                          to right,
                          hsl(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, 0%) 0%,
                          hsl(${this.hue}deg, ${this.saturation}%, ${this.lightness}%) 100%
                        )`
                      })}
                    ></div>
                    <span
                      part="slider-handle"
                      class="color-picker__slider-handle"
                      style=${styleMap({
                        left: `${this.alpha}%`
                      })}
                      role="slider"
                      aria-label="alpha"
                      aria-orientation="horizontal"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow=${Math.round(this.alpha)}
                      tabindex=${ifDefined(this.disabled ? undefined : '0')}
                      @keydown=${this.handleAlphaKeyDown}
                    ></span>
                  </div>
                `
              : ''}
          </div>
          <uui-button
            type="button"
            class="color-picker__preview color-picker__transparent-bg"
            aria-label=${this.localize.term('copy')}
            style=${styleMap({
              '--preview-color': `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, ${this.alpha / 100})`
            })}
            @click=${this.handleCopy}
          ></uui-button>
        </div>
        <div class="color-picker__user-input" aria-live="polite">
          <uui-input 
            label="label"
            type="text"
            name=${this.name}
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            .value=${live(this.inputValue)}
            ?disabled=${this.disabled}
            @keydown=${this.handleInputKeyDown}
            @sl-change=${this.handleInputChange}>
          </uui-input>
          <uui-button-group>
            
          </uui-button-group>
        </div>
        ${this.swatches.length > 0
          ? html`
              <div part="swatches" class="color-picker__swatches">
                ${this.swatches.map(swatch => {
                  return html`
                    <div
                      part="swatch"
                      class="color-picker__swatch color-picker__transparent-bg"
                      tabindex=${ifDefined(this.disabled ? undefined : '0')}
                      role="button"
                      aria-label=${swatch}
                      @click=${() => !this.disabled && this.setColor(swatch)}
                      @keydown=${(event: KeyboardEvent) =>
                        !this.disabled && event.key === 'Enter' && this.setColor(swatch)}
                    >
                      <div class="color-picker__swatch-color" style=${styleMap({ backgroundColor: swatch })}></div>
                    </div>
                  `;
                })}
              </div>
            `
          : ''}
      </div>
    `;

    return colorPicker;
  }
}

function toHex(value: number) {
  const hex = Math.round(value).toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}