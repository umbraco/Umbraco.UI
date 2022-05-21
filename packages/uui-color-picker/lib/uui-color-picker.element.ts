import { LitElement, html, css } from 'lit';
import { TinyColor } from '@ctrl/tinycolor';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';

import { styleMap } from 'lit/directives/style-map.js';

import {
  UUIColorAreaElement,
  UUIColorAreaEvent,
} from '@umbraco-ui/uui-color-area/lib';

const hasEyeDropper = 'EyeDropper' in window;

interface EyeDropperConstructor {
  new (): EyeDropperInterface;
}

interface EyeDropperInterface {
  open: () => Promise<{ sRGBHex: string }>;
}

declare const EyeDropper: EyeDropperConstructor;

/**
 *  @element uui-color-picker
 *  @description 
 */
 @defineElement('uui-color-picker')
export class UUIColorPickerElement extends LitElement {
  static styles = [
    css`
      :host {
        --slider-height: 15px;
        --slider-handle-size: 17px;
        --swatch-size: 25px;

        display: inline-block;
      }

      .color-picker {
        width: var(--grid-width);
        background-color: #fff;
        user-select: none;
        border: solid 1px #e4e4e7;
      }

      .color-picker__user-input {
        display: flex;
        padding: 0 0.75rem 0.75rem 0.75rem;
      }

      .color-picker__preview {
        flex: 0 0 auto;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 3.25rem;
        height: 2.25rem;
        border: none;
        background: none;
        margin-left: 0.75rem;
        cursor: copy;
      }

      .color-picker__preview:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
      }

      .color-picker__controls {
        padding: 0.75rem;
        display: flex;
        align-items: center;
      }

      .color-picker__sliders {
        flex: 1 1 auto;
      }

      uui-color-slider.hue-slider {
        --slider-bg: linear-gradient(
          to right,
          rgb(255, 0, 0) 0%,
          rgb(255, 255, 0) 17%,
          rgb(0, 255, 0) 33%,
          rgb(0, 255, 255) 50%,
          rgb(0, 0, 255) 67%,
          rgb(255, 0, 255) 83%,
          rgb(255, 0, 0) 100%
        );
      }

      uui-color-slider.opacity-slider {
        --slider-bg: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%);
      }

      uui-color-swatches {
        border-top: solid 1px #d4d4d8;
      }
    `,
  ];

  @query('.color-picker__preview') previewButton: HTMLButtonElement;

  @state() private inputValue = '';
  @state() private hue = 0;
  @state() private saturation = 100;
  @state() private lightness = 100;
  @state() private alpha = 100;

  /** The current color. */
  @property() value = '#ffffff';

  /**
   * The format to use for the display value. If opacity is enabled, these will translate to HEXA, RGBA, and HSLA
   * respectively. The color picker will always accept user input in any format (including CSS color names) and convert
   * it to the desired format.
   */
  @property() format: 'hex' | 'rgb' | 'hsl' = 'hex';

  /** The input's name attribute. */
  @property() name = '';

  /** Removes the format toggle. */
  @property({ attribute: 'no-format-toggle', type: Boolean }) noFormatToggle = false;

  /** Renders the color picker inline rather than inside a dropdown. */
  @property({ type: Boolean, reflect: true }) inline = false;

  /** Disables the color picker. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Whether to show the opacity slider. */
  @property({ type: Boolean }) opacity = true; //false;

  /** By default, the value will be set in lowercase. Set this to true to set it in uppercase instead. */
  @property({ type: Boolean }) uppercase = false;

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

  connectedCallback() {
    super.connectedCallback();
    
    if (!this.setColor(this.value)) {
      this.setColor(`#ffff`);
    }

    this.inputValue = this.value;
    this.syncValues();
  }

  /*private _onChange() {
    this.dispatchEvent(new UUIColorPickerEvent(UUIColorPickerEvent.CHANGE));
  }*/

  handleFormatToggle() {
    const formats = ['hex', 'rgb', 'hsl'];
    const nextIndex = (formats.indexOf(this.format) + 1) % formats.length;
    this.format = formats[nextIndex] as 'hex' | 'rgb' | 'hsl';
  }

  handleAlphaDrag(event: Event) {
    
  }

  handleHueDrag(event: Event) {
    
  }

  handleGridDrag(event: UUIColorAreaEvent) {
     console.log("handleGridDrag change", event);
     const element = event.target as UUIColorAreaElement;
     console.log("handleGridDrag element", element);
     console.log("value", element.value);

     this.setColor(element.value);
     event.stopPropagation();
  }

  handleAlphaKeyDown(event: KeyboardEvent) {
    
  }

  handleHueKeyDown(event: KeyboardEvent) {
    
  }

  handleGridKeyDown(event: KeyboardEvent) {
    
  }

  handleInputChange(event: CustomEvent) {
    const element = event.target as HTMLInputElement;

    this.setColor(element.value);
    //element.value = this.value;
    event.stopPropagation();
  }

  handleInputKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.setColor(this.inputValue);
      this.inputValue = this.value;
    }
  }

  handleCopy() {
    //this.input.select();
    document.execCommand('copy');
    this.previewButton.focus();

    // Show copied animation
    this.previewButton.classList.add('color-picker__preview-color--copied');
    this.previewButton.addEventListener('animationend', () => {
      this.previewButton.classList.remove('color-picker__preview-color--copied');
    });
  }
  
  handleEyeDropper() {
    if (!hasEyeDropper) {
      return;
    }

    const eyeDropper = new EyeDropper();

    eyeDropper
      .open()
      .then(result => this.setColor(result.sRGBHex))
      .catch(() => {
        // The user canceled, do nothing
      });

  }

  parseColor(colorString: string) {
    let parsed: TinyColor;

    try {
      parsed = new TinyColor(colorString);
    } catch {
      return null;
    }

    const hslColor = parsed.toHsl();

    const hsl = {
      h: hslColor.h, // hue
      s: hslColor.s, // saturation
      l: hslColor.l,
      a: hslColor.a // alpha
    };

    const rgbColor = parsed.toRgb();

    const rgb = {
      r: rgbColor.r, // red
      g: rgbColor.g, // green
      b: rgbColor.b, // blue
      a: rgbColor.a // alpha
    };

    const hex = {
      r: toHex(rgb.r),
      g: toHex(rgb.g),
      b: toHex(rgb.b),
      a: toHex(rgb.a * 255)
    };

    return {
      hsl: {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        string: this.setLetterCase(`hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`)
      },
      hsla: {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        a: hsl.a,
        string: this.setLetterCase(
          `hsla(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%, ${hsl.a.toFixed(2).toString()})`
        )
      },
      rgb: {
        r: rgb.r,
        g: rgb.g,
        b: rgb.b,
        string: this.setLetterCase(`rgb(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)})`)
      },
      rgba: {
        r: rgb.r,
        g: rgb.g,
        b: rgb.b,
        a: rgb.a,
        string: this.setLetterCase(
          `rgba(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)}, ${rgb.a.toFixed(2).toString()})`
        )
      },
      hex: this.setLetterCase(`#${hex.r}${hex.g}${hex.b}`),
      hexa: this.setLetterCase(`#${hex.r}${hex.g}${hex.b}${hex.a}`)
    };

  }

  setColor(colorString: string) {
    console.log("colorString", colorString);
    const newColor = this.parseColor(colorString);
    console.log("newColor", newColor);

    if (newColor === null) {
      return false;
    }

    this.hue = newColor.hsla.h;
    this.saturation = newColor.hsla.s;
    this.lightness = newColor.hsla.l;
    this.alpha = this.opacity ? newColor.hsla.a * 100 : 100;

    this.syncValues();

    return true;
  }
  
  setLetterCase(string: string) {
    if (typeof string !== 'string') {
      return '';
    }
    return this.uppercase ? string.toUpperCase() : string.toLowerCase();
  }

  async syncValues() {

    const currentColor = this.parseColor(
      `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha / 100})`
    );

    if (currentColor === null) {
      return;
    }

    console.log("currentColor", currentColor);

    // Update the value
    if (this.format === 'hsl') {
      this.inputValue = this.opacity ? currentColor.hsla.string : currentColor.hsl.string;
    } else if (this.format === 'rgb') {
      this.inputValue = this.opacity ? currentColor.rgba.string : currentColor.rgb.string;
    } else {
      this.inputValue = this.opacity ? currentColor.hexa : currentColor.hex;
    }

    this.value = this.inputValue;
  }

  render(){
    //const x = this.saturation;
    //const y = 100 - this.lightness;

    const colorPicker = html`
      <div
        class=${classMap({
          'color-picker': true,
          'color-picker--inline': this.inline,
          'color-picker--disabled': this.disabled
        })}
        aria-disabled=${this.disabled ? 'true' : 'false'}
      >
        <uui-color-area
          @change=${this.handleGridDrag}
          >
        </uui-color-area>

        <div class="color-picker__controls">
          <div class="color-picker__sliders">
            <uui-color-slider
              label="hue"
              min="0"
              max="360"
              class="hue-slider"
              .value=${Math.round(this.hue)}
            >
            </uui-color-slider>
            ${this.opacity
              ? html`
                  <uui-color-slider
                    label="alpha"
                    min="0"
                    max="100"
                    class="opacity-slider"
                    .value=${Math.round(this.alpha)}
                  >
                  </uui-color-slider>
                `
              : ''}
          </div>
          <uui-button
            type="button"
            class="color-picker__preview color-picker__transparent-bg"
            label="Copy"
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
            @change=${this.handleInputChange}>
          </uui-input>
          <uui-button-group>
          ${!this.noFormatToggle
            ? html`
                <uui-button
                  label="Toggle color format"
                  @click=${this.handleFormatToggle}
                >
                  ${this.setLetterCase(this.format)}
                </uui-button>
              `
            : ''}
            ${hasEyeDropper
              ? html`
                  <uui-button
                    label="Select a color"
                    @click=${this.handleEyeDropper}
                  >
                    <uui-icon-registry-essential>
                      <uui-icon name="colorpicker"></uui-icon>
                    </uui-icon-registry-essential>
                  </uui-button>`
              : ''}
          </uui-button-group>
        </div>
        <uui-color-swatches
          .swatches="${this.swatches}"
        >
        </uui-color-swatches>
      </div>
    `;

    /*<div class="color-picker__swatches">
    ${this.swatches.map(swatch => {
      return html`
        <div
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
  </div>*/


    return colorPicker;
  }
}

function toHex(value: number) {
  const hex = Math.round(value).toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-color-picker': UUIColorPickerElement;
  }
}