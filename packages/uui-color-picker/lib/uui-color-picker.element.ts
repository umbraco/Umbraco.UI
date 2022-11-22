import { LitElement, html, css } from 'lit';
import { Colord, colord, extend } from 'colord';
import namesPlugin from 'colord/plugins/names';

extend([namesPlugin]);

import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';

import { clamp } from '@umbraco-ui/uui-base/lib/utils';

import { styleMap } from 'lit/directives/style-map.js';

import {
  UUIColorAreaElement,
  UUIColorAreaEvent
} from '@umbraco-ui/uui-color-area/lib';

import {
  UUIColorSliderElement,
  UUIColorSliderEvent
} from '@umbraco-ui/uui-color-slider/lib';

import {
  UUIColorSwatchesEvent,
} from '@umbraco-ui/uui-color-swatches/lib';

import {
  UUIColorSwatchElement,
} from '@umbraco-ui/uui-color-swatch/lib';

import {
  UUIPopoverElement
} from '@umbraco-ui/uui-popover/lib';

import {
  UUIInputElement
} from '@umbraco-ui/uui-input/lib';

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
        --uui-color-picker-width: 280px;
        --slider-height: 15px;
        --slider-handle-size: 17px;
        --swatch-size: 25px;
        --uui-look-outline-border: #ddd;
        --uui-look-outline-border-hover: #aaa;
        display: block;
        width: var(--uui-color-picker-width);
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
      .color-picker__preview,
      .color-picker__trigger {
        --uui-button-padding-top-factor: 5;
        flex: 0 0 auto;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 2.25rem;
        height: 2.25rem;
        border: none;
        border-radius: 50%;
        background: none;
      }
      .color-picker__preview {
        --uui-button-border-radius: 50%;

        cursor: copy;
        margin-left: 0.75rem;
        border-radius: 50%;
      }
      .color-picker__preview::before,
      .color-picker__trigger::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
        /* We use a custom property in lieu of currentColor because of https://bugs.webkit.org/show_bug.cgi?id=216780 */
        background-color: var(--preview-color);
      }
      
      .color-dropdown__trigger--empty::before {
        background-color: transparent;
      }

      .color-picker__transparent-bg {
        background-image: linear-gradient(45deg, var(--uui-palette-grey) 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, var(--uui-palette-grey) 75%),
          linear-gradient(45deg, transparent 75%, var(--uui-palette-grey) 75%),
          linear-gradient(45deg, var(--uui-palette-grey) 25%, transparent 25%);
        background-size: 10px 10px;
        background-position: 0 0, 0 0, -5px -5px, 5px 5px;
      }

      .color-picker__preview-color--copied {
        animation: pulse 0.75s;
      }

      @keyframes pulse {
        0% {
          box-shadow: 0 0 0 0 var(--uui-palette-space-cadet-light);
        }
        70% {
          box-shadow: 0 0 0 0.5rem transparent;
        }
        100% {
          box-shadow: 0 0 0 0 transparent;
        }
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
        --slider-bg: linear-gradient(45deg, var(--uui-palette-grey) 25%, transparent 25%), 
                    linear-gradient(45deg, transparent 75%, var(--uui-palette-grey) 75%), 
                    linear-gradient(45deg, transparent 75%, var(--uui-palette-grey) 75%), 
                    linear-gradient(45deg, var(--uui-palette-grey) 25%, transparent 25%);

        --slider-bg-size: 10px 10px;
        --slider-bg-position: 0 0, 0 0, -5px -5px, 5px 5px;
      }
      .color-picker__toggle-format {
        border-radius: 100%;
        text-transform: uppercase;
        min-width: 64px;
      }
      uui-color-swatches {
        border-top: solid 1px #d4d4d8;
      }

      uui-button[slot=trigger] {
        --uui-button-border-radius: 50%;
        --uui-button-contrast: #ddd;
        --uui-button-padding-left-factor: 2;
        --uui-button-padding-right-factor: 2;
        width: 36px;
        height: 36px;
      }
      
      uui-popover {
        display: block;
        width: 100%;
        margin: 5px 0;
      }
    `,
  ];

  @query('[part="input"]') _input!: UUIInputElement;
  @query('.color-picker__preview') _previewButton!: HTMLButtonElement;
  @query('.color-picker__swatches') _colorSwatchesContainer!: HTMLElement;

  @state() private isEmpty = false;
  @state() private inputValue = '';
  @state() private hue = 0;
  @state() private saturation = 100;
  @state() private lightness = 100;
  @state() private brightness = 100;
  @state() private alpha = 100;

  /** The current color. */
  @property() value = '';

  /**
   * The format to use for the display value. If opacity is enabled, these will translate to HEXA, RGBA, and HSLA
   * respectively. The color picker will always accept user input in any format (including CSS color names) and convert
   * it to the desired format.
   */
  @property() format: 'hex' | 'rgb' | 'hsl' = 'hex';

  /** The input's name attribute. */
  @property() name = '';

  /** Determines the size of the color picker's trigger. This has no effect on inline color pickers. */
  @property() size: 'small' | 'medium' | 'large' = 'medium';

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

  connectedCallback(): void {
    super.connectedCallback();
    
    if (this.value) {
      this.setColor(this.value);
      this.inputValue = this.value;
      this.syncValues();
    } else {
      this.isEmpty = true;
      this.inputValue = '';
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  /*protected async firstUpdated() {

    if (this._colorSwatchesContainer) {
      this._colorSwatchesContainer.addEventListener(
        UUIColorSwatchesEvent.CHANGE,
        this.handleColorSwatchChange
      );
    }
  }*/

  /** Returns the current value as a string in the specified format. */
  getFormattedValue(format: 'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla' = 'hex') {
    const currentColor = this.parseColor(
      `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha / 100})`
    );

    if (currentColor === null) {
      return '';
    }

    switch (format) {
      case 'hex':
        return currentColor.hex;
      case 'hexa':
        return currentColor.hexa;
      case 'rgb':
        return currentColor.rgb.string;
      case 'rgba':
        return currentColor.rgba.string;
      case 'hsl':
        return currentColor.hsl.string;
      case 'hsla':
        return currentColor.hsla.string;
      default:
        return '';
    }
  }

  getBrightness(lightness: number) {
    return clamp(-1 * ((200 * lightness) / (this.saturation - 200)), 0, 100);
  }

  getLightness(brightness: number) {
    return clamp(((((200 - this.saturation) * brightness) / 100) * 5) / 10, 0, 100);
  }

  /*private _onChange() {
    this.dispatchEvent(new UUIColorPickerEvent(UUIColorPickerEvent.CHANGE));
  }*/

  handleFormatToggle() {
    const formats = ['hex', 'rgb', 'hsl'];
    const nextIndex = (formats.indexOf(this.format) + 1) % formats.length;
    this.format = formats[nextIndex] as 'hex' | 'rgb' | 'hsl';
    this.syncValues();
  }

  handleAlphaDrag(event: UUIColorSliderEvent) {
    console.log("handleAlphaDrag", event);

    const element = event.target as UUIColorSliderElement;
    console.log("handleAlphaDrag element", element);
    console.log("alpha value", element.value);
    
    if (element.value !== null) {
      this.alpha = clamp(element.value, 0, 100);
    }

    this.syncValues();

    event.stopPropagation();
  }

  handleHueDrag(event: UUIColorSliderEvent) {
    console.log("handleHueDrag", event);

    const element = event.target as UUIColorSliderElement;
    console.log("handleHueDrag element", element);
    console.log("hue value", element.value);
    if (element.value !== null) {
      this.hue = clamp(element.value, 0, 360);
    }

    this.syncValues();

    event.stopPropagation();
  }

  handleGridDrag(event: UUIColorAreaEvent) {
     console.log("handleGridDrag change", event);
     const element = event.target as UUIColorAreaElement;
     console.log("handleGridDrag element", element);
     console.log("value", element.value);

     if (element.value) {

        // TODO: Better way to get color, while not changing current alpha.
        const color = this.parseColor(element.value);

        if (color) {
          this.saturation = color.hsl.s;
          this.lightness =  color.hsl.l;
          this.brightness = this.getBrightness(this.lightness);
          this.syncValues();
        }
     }
     
     //this.setColor(element.value);

     event.stopPropagation();
  }

  handleAlphaKeyDown(event: KeyboardEvent) {
    const increment = event.shiftKey ? 10 : 1;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.alpha = clamp(this.alpha - increment, 0, 100);
      this.syncValues();
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.alpha = clamp(this.alpha + increment, 0, 100);
      this.syncValues();
    }

    if (event.key === 'Home') {
      event.preventDefault();
      this.alpha = 0;
      this.syncValues();
    }

    if (event.key === 'End') {
      event.preventDefault();
      this.alpha = 100;
      this.syncValues();
    }
  }

  handleHueKeyDown(event: KeyboardEvent) {
    const increment = event.shiftKey ? 10 : 1;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.hue = clamp(this.hue - increment, 0, 360);
      this.syncValues();
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.hue = clamp(this.hue + increment, 0, 360);
      this.syncValues();
    }

    if (event.key === 'Home') {
      event.preventDefault();
      this.hue = 0;
      this.syncValues();
    }

    if (event.key === 'End') {
      event.preventDefault();
      this.hue = 360;
      this.syncValues();
    }
  }

  handleGridKeyDown(event: KeyboardEvent) {
    const increment = event.shiftKey ? 10 : 1;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.saturation = clamp(this.saturation - increment, 0, 100);
      this.lightness = this.getLightness(this.brightness);
      this.syncValues();
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.saturation = clamp(this.saturation + increment, 0, 100);
      this.lightness = this.getLightness(this.brightness);
      this.syncValues();
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.brightness = clamp(this.brightness + increment, 0, 100);
      this.lightness = this.getLightness(this.brightness);
      this.syncValues();
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.brightness = clamp(this.brightness - increment, 0, 100);
      this.lightness = this.getLightness(this.brightness);
      this.syncValues();
    }
  }

  handleInputChange(event: CustomEvent) {
    const target = event.target as HTMLInputElement;

    if (target.value) {
      this.setColor(target.value);
      target.value = this.value;
    } else {
      this.value = '';
    }

    event.stopPropagation();
  }

  handleInputKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (this.inputValue) {
        this.setColor(this.inputValue);
        this.inputValue = this.value;
        setTimeout(() => this._input.select());
      } else {
        this.hue = 0;
      }
    }
  }

  handleColorSwatchChange(event: UUIColorSwatchesEvent) {
    event.stopImmediatePropagation();

    console.log("handleColorSwatchChange", event);
    const target = event.target as UUIColorSwatchElement;
    console.log("target", target);

    console.log("value", target.value);

    if (target.value) {
      this.setColor(target.value);
      target.value = this.value;
    } else {
      this.value = '';
    }
  }

  handleCopy() {
    this._input.select();
    document.execCommand('copy');
    this._previewButton.focus();

    // Show copied animation
    this._previewButton.classList.add('color-picker__preview-color--copied');
    this._previewButton.addEventListener('animationend', () => {
      this._previewButton.classList.remove('color-picker__preview-color--copied');
    });
  }

  openColorPicker(event: Event) {
    event.stopImmediatePropagation();

    const target = event.target as HTMLElement;
    const popover = target.nextElementSibling as UUIPopoverElement;

    popover.open = !popover?.open;
    
    target.setAttribute("aria-expanded", popover.open.toString());
  }

  closeColorPicker(event: Event) {
    const target = event.target as UUIPopoverElement;
    const trigger = target.previousElementSibling;
    
    if (trigger) {
      trigger.setAttribute("aria-expanded", "false");
    }
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
    let parsed: Colord;

    try {
      parsed = colord(colorString);
    } catch {
      return null;
    }

    console.log("colorString", colorString);
    console.log("parseColor", parsed);

    const hslColor = parsed.toHsl();
    console.log("hslColor", hslColor);

    const hsl = {
      h: hslColor.h, // hue
      s: hslColor.s, // saturation
      l: hslColor.l, // lightness
      a: hslColor.a // alpha
    };

    const rgbColor = parsed.toRgb();
    console.log("rgbColor", rgbColor);

    const rgb = {
      r: rgbColor.r, // red
      g: rgbColor.g, // green
      b: rgbColor.b, // blue
      a: rgbColor.a // alpha
    };

    console.log("rgb", rgb);

    const hex = {
      r: toHex(rgb.r),
      g: toHex(rgb.g),
      b: toHex(rgb.b),
      a: toHex(rgb.a * 255)
    };

    console.log("hex", hex);

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
    this.brightness = this.getBrightness(newColor.hsla.l);
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

    console.log("sync values", `hue:${this.hue}`, `saturation: ${this.saturation}`, `lightness: ${this.lightness}`, `alpha: ${this.alpha}`)

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
    this.isEmpty = false;

    await this.updateComplete;
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
          .hue=${this.hue}
          .value=${this.value}
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
              @change=${this.handleHueDrag}
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
                    @change=${this.handleAlphaDrag}
                  >
                  <div slot="detail" style=${styleMap({
                      backgroundImage: `linear-gradient(
                        to right,
                        hsl(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, 0%) 0%,
                        hsl(${this.hue}deg, ${this.saturation}%, ${this.lightness}%) 100%
                      )`
                    })}>
                  </div>
                  </uui-color-slider>
                `
              : ''}
          </div>
          <button
            type="button"
            part="preview"
            class="color-picker__preview color-picker__transparent-bg"
            aria-label="Copy"
            style=${styleMap({
              '--preview-color': `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, ${this.alpha / 100})`
            })}
            @click=${this.handleCopy}
          >
          </button>
        </div>
        <div class="color-picker__user-input" aria-live="polite">
          <uui-input 
            label="label"
            type="text"
            part="input"
            name=${this.name}
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            .value=${live(this.isEmpty ? '' : this.inputValue)}
            ?disabled=${this.disabled}
            @keydown=${this.handleInputKeyDown}
            @change=${this.handleInputChange}>
          </uui-input>
          <uui-button-group>
          ${!this.noFormatToggle
            ? html`
                <uui-button
                  label="Toggle color format"
                  look="outline"
                  @click=${this.handleFormatToggle}
                  class="color-picker__toggle-format"
                >
                  ${this.setLetterCase(this.format)}
                </uui-button>
              `
            : ''}
            ${hasEyeDropper
              ? html`
                  <uui-button
                    label="Select a color"
                    look="outline"
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
          class="color-picker__swatches"
          .swatches="${this.swatches}"
          @change=${this.handleColorSwatchChange}
        >
        </uui-color-swatches>
      </div>
    `;
    
    if (this.inline) {
      return colorPicker;
    }

    return html`<uui-button
        slot="trigger"
        look="outline"
        label="Open color picker"
        class=${classMap({
          'color-picker__trigger': true,
          'color-dropdown__trigger--disabled': this.disabled,
          'color-dropdown__trigger--small': this.size === 'small',
          'color-dropdown__trigger--medium': this.size === 'medium',
          'color-dropdown__trigger--large': this.size === 'large',
          'color-dropdown__trigger--empty': this.isEmpty,
          'color-picker__transparent-bg': true
        })}
        style=${styleMap({
          '--preview-color': `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, ${this.alpha / 100})`
        })}
        @click=${this.openColorPicker}
        aria-haspopup="true"
        aria-expanded="false">
      </uui-button>
      <uui-popover placement="bottom-start" @close=${this.closeColorPicker}>
        <div slot="popover">
          ${colorPicker}
        </div>
      </uui-popover>`;
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