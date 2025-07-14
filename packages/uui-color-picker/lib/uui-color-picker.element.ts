import { LitElement, html, css, nothing } from 'lit';
import { Colord, colord, extend, HslaColor } from 'colord';
import namesPlugin from 'colord/plugins/names';

extend([namesPlugin]);

import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';

import { clamp, demandCustomElement } from '@umbraco-ui/uui-base/lib/utils';

import { styleMap } from 'lit/directives/style-map.js';

import type {
  UUIColorAreaElement,
  UUIColorAreaEvent,
} from '@umbraco-ui/uui-color-area/lib';

import type {
  UUIColorSliderElement,
  UUIColorSliderEvent,
} from '@umbraco-ui/uui-color-slider/lib';

import type {
  UUIColorSwatchesElement,
  UUIColorSwatchesEvent,
} from '@umbraco-ui/uui-color-swatches/lib';

import type { UUIColorSwatchElement } from '@umbraco-ui/uui-color-swatch/lib';

import type { UUIInputElement } from '@umbraco-ui/uui-input/lib';
import { UUIColorPickerChangeEvent } from './UUIColorPickerEvent';
import { LabelMixin } from '@umbraco-ui/uui-base/lib/mixins';

const hasEyeDropper = 'EyeDropper' in window;

interface EyeDropperConstructor {
  new (): EyeDropperInterface;
}

interface EyeDropperInterface {
  open: () => Promise<{ sRGBHex: string }>;
}

export type UUIColorPickerFormat = 'hex' | 'rgb' | 'hsl' | 'hsv';
export type UUIColorPickerFormatWithAlpha =
  | UUIColorPickerFormat
  | 'hexa'
  | 'rgba'
  | 'hsla'
  | 'hsva';

declare const EyeDropper: EyeDropperConstructor;

type UUIColorPickerSize = 'small' | 'medium' | 'large';

/**
 * @element uui-color-picker
 * @cssprop --uui-color-picker-width - The width of the color picker
 * @description
 * @fires {UUIColorPickerChangeEvent} change - Fired when the color changes
 */
@defineElement('uui-color-picker')
export class UUIColorPickerElement extends LabelMixin('label', LitElement) {
  @query('[part="input"]') private _input!: UUIInputElement;
  @query('.color-picker__preview') private _previewButton!: HTMLButtonElement;
  @query('#swatches') private _swatches!: UUIColorSwatchesElement;

  private _value: string = '';

  @state() private inputValue = '';
  @state() private hue = 0;
  @state() private saturation = 0;
  @state() private lightness = 0;
  @state() private alpha = 100;
  @state() private _colord: Colord = colord('hsl(0, 0%, 0%)');

  /**
   * The current color.
   * @attr
   * @type {string}
   * @default ''
   **/
  @property()
  set value(value: string) {
    if (this.value !== value) {
      this.setColor(value);
    }
    this._value = value;
  }
  get value(): string {
    return this._value;
  }

  /**
   * The format to use for the display value. If opacity is enabled, these will translate to HEXA, RGBA, HSLA, and HSVA
   * respectively. The color picker will always accept user input in any format (including CSS color names) and convert
   * it to the desired format.
   * @attr
   * @type {UUIColorPickerFormat}
   * @default 'hex'
   */
  @property() format: UUIColorPickerFormat = 'hex';

  /**
   * The input's name attribute.
   * @attr
   * @type {string}
   * @default ''
   **/
  @property() name = '';

  /**
   * Determines the size of the color picker's trigger. This has no effect on inline color pickers.
   * @attr
   * @type {UUIColorPickerSize}
   * @default 'medium'
   **/
  @property() size: UUIColorPickerSize = 'medium';

  /**
   * Removes the format toggle.
   * @attr
   * @type {boolean}
   * @default false
   **/
  @property({ attribute: 'no-format-toggle', type: Boolean }) noFormatToggle =
    false;

  /**
   * Renders the color picker inline rather than inside a dropdown.
   * @attr
   * @type {boolean}
   * @default false
   **/
  @property({ type: Boolean, reflect: true }) inline = false;

  /**
   * Sets the color picker to disabled.
   * @attr
   * @type {boolean}
   * @default false
   **/
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Whether to show the opacity slider.
   * @attr
   * @type {boolean}
   * @default false
   **/
  @property({ type: Boolean }) opacity = false;

  /**
   * Sets the color picker to readonly mode.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true }) readonly = false;

  /**
   * By default, the value will be set in lowercase. Set this to true to set it in uppercase instead.
   * @attr
   * @type {boolean}
   * @default false
   **/
  @property({ type: Boolean }) uppercase = false;

  /**
   * An array of predefined color swatches to display. Can include any format the color picker can parse, including
   * HEX(A), RGB(A), HSL(A), HSV(A), and CSS color names.
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
    '#fff',
  ];

  connectedCallback(): void {
    super.connectedCallback();

    demandCustomElement(this, 'uui-icon');
    demandCustomElement(this, 'uui-icon-registry-essential');
    demandCustomElement(this, 'uui-input');
    demandCustomElement(this, 'uui-button');
    demandCustomElement(this, 'uui-button-group');
    demandCustomElement(this, 'uui-color-swatches');
    demandCustomElement(this, 'uui-color-swatch');
    demandCustomElement(this, 'uui-color-area');
    demandCustomElement(this, 'uui-color-slider');
    demandCustomElement(this, 'uui-popover-container');
  }

  /** Returns the current value as a string in the specified format. */
  getFormattedValue(format: UUIColorPickerFormat) {
    const formatToUse = this.opacity ? `${format}a` : format;
    const hexa = this._colord.toHex();
    const hex = hexa.length > 7 ? hexa.substring(0, hexa.length - 2) : hexa;

    const { r, g, b } = this._colord.toRgb();
    const { h, s, l } = this._colord.toHsl();
    const { v } = this._colord.toHsv();
    const a = this._colord.alpha();

    switch (formatToUse) {
      case 'hex':
        return this.setLetterCase(hex);
      case 'hexa':
        return this.setLetterCase(hexa);
      case 'rgb':
        return this.setLetterCase(`rgb(${r}, ${g}, ${b})`);
      case 'rgba':
        return this.setLetterCase(this._colord.toRgbString());
      case 'hsl':
        return this.setLetterCase(`hsl(${h}, ${s}%, ${l}%)`);
      case 'hsla':
        return this.setLetterCase(this._colord.toHslString());
      case 'hsv':
        return this.setLetterCase(`hsv(${h}, ${s}%, ${l}%)`);
      case 'hsva':
        return this.setLetterCase(`hsva(${h}, ${s}%, ${v}%, ${a})`); //this._colord.toHsvString();
      default:
        return '';
    }
  }

  getBrightness(lightness: number) {
    return clamp(-1 * ((200 * lightness) / (this.saturation - 200)), 0, 100);
  }

  getLightness(brightness: number) {
    return clamp(
      ((((200 - this.saturation) * brightness) / 100) * 5) / 10,
      0,
      100,
    );
  }

  handleFormatToggle() {
    const formats = ['hex', 'rgb', 'hsl', 'hsv'];
    const nextIndex = (formats.indexOf(this.format) + 1) % formats.length;
    this.format = formats[nextIndex] as 'hex' | 'rgb' | 'hsl' | 'hsv';
    this._syncValues();
  }

  handleAlphaChange(event: UUIColorSliderEvent) {
    event.stopPropagation();
    this._swatches?.resetSelection();

    const element = event.target as UUIColorSliderElement;

    const newColor: HslaColor = {
      h: this.hue,
      s: this.saturation,
      l: this.lightness,
      a: Math.round(element.value) / 100,
    };
    this.setColor(newColor);
  }

  handleHueChange(event: UUIColorSliderEvent) {
    event.stopPropagation();
    this._swatches?.resetSelection();
    const element = event.target as UUIColorSliderElement;

    const newColor: HslaColor = {
      h: element.value,
      s: this.saturation,
      l: this.lightness,
      a: this.alpha / 100,
    };
    this.setColor(newColor);
  }

  handleGridChange(event: UUIColorAreaEvent) {
    event.stopPropagation();
    this._swatches?.resetSelection();
    const element = event.target as UUIColorAreaElement;

    const newColor: HslaColor = {
      h: this.hue,
      s: element.saturation,
      l: element.lightness,
      a: this.alpha / 100,
    };

    this.setColor(newColor);
  }

  handleInputChange(event: CustomEvent) {
    event.stopImmediatePropagation();
    this._swatches?.resetSelection();

    this.inputValue = this._input.value as string;
    this.setColor(this.inputValue);
  }

  handleInputKeyDown(event: KeyboardEvent) {
    event.stopImmediatePropagation();
    if (event.key === 'Enter') {
      this._swatches?.resetSelection();

      this.inputValue = this._input.value as string;
      this.setColor(this.inputValue);

      setTimeout(() => this._input.select());
    }
  }

  handleColorSwatchChange(event: UUIColorSwatchesEvent) {
    event.stopImmediatePropagation();

    const target = event.target as UUIColorSwatchElement;
    this.setColor(target.value);
  }

  handleCopy() {
    navigator.clipboard.writeText(this._input.value as string).then(() => {
      // Show copied animation
      this._previewButton.classList.add('color-picker__preview-color--copied');
      this._previewButton.addEventListener('animationend', () => {
        this._previewButton.classList.remove(
          'color-picker__preview-color--copied',
        );
      });
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

  setColor(colorString: string | HslaColor) {
    if (colorString === this.value) return;

    if (!colorString) {
      this.alpha = 100;
      this.inputValue = '';
      this._value = colorString;

      this.dispatchEvent(
        new UUIColorPickerChangeEvent(UUIColorPickerChangeEvent.CHANGE),
      );

      return true;
    }

    const colord = new Colord(colorString);

    const { h, s, l, a } = colord.toHsl();

    this.hue = h;
    this.saturation = s;
    this.lightness = l;
    this.alpha = this.opacity ? a * 100 : 100; // Convert to 0-100 range, and set alpha to 100 if opacity is disabled

    const hslaColor = colorString as HslaColor;

    // Workaround as hue isn't correct after changing hue slider, but Colord parse hue value as zero when color is black.
    if (hslaColor && hslaColor.h) {
      this.hue = hslaColor.h;
    }

    this._colord = colord;

    this._syncValues();

    this.dispatchEvent(
      new UUIColorPickerChangeEvent(UUIColorPickerChangeEvent.CHANGE),
    );
    return true;
  }

  setLetterCase(string: string) {
    if (typeof string !== 'string') {
      return '';
    }
    return this.uppercase ? string.toUpperCase() : string.toLowerCase();
  }

  /** Generates a hex string from HSL values. Hue must be 0-360. All other arguments must be 0-100. */
  private getHexString(
    hue: number,
    saturation: number,
    lightness: number,
    alpha = 100,
  ) {
    const color = colord(
      `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha / 100})`,
    );
    if (!color.isValid()) {
      return '';
    }

    return color.toHex();
  }

  private _syncValues() {
    this.inputValue = this.getFormattedValue(this.format);
    this._value = this.inputValue;
  }

  private _renderColorPicker() {
    const previewColor = this.value
      ? `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, ${this.alpha / 100})`
      : 'transparent';
    return html`
      <div
        class=${classMap({
          'color-picker': true,
          'color-picker--inline': this.inline,
          'color-picker--disabled': this.disabled,
        })}
        aria-disabled=${this.disabled ? 'true' : 'false'}>
        <uui-color-area
          .value="${this.value}"
          .hue="${Math.round(this.hue)}"
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          @change=${this.handleGridChange}>
        </uui-color-area>
        <div class="color-picker__controls">
          <div class="color-picker__sliders">
            <uui-color-slider
              hide-value-label
              label="hue"
              class="hue-slider"
              .value=${Math.round(this.hue)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              @change=${this.handleHueChange}>
            </uui-color-slider>
            ${this.opacity
              ? html`
                  <uui-color-slider
                    label="alpha"
                    class="opacity-slider"
                    .value=${Math.round(this.alpha)}
                    type="opacity"
                    .color=${this.getHexString(
                      this.hue,
                      this.saturation,
                      this.lightness,
                    )}
                    ?disabled=${this.disabled}
                    ?readonly=${this.readonly}
                    @change=${this.handleAlphaChange}>
                  </uui-color-slider>
                `
              : ''}
          </div>
          <button
            type="button"
            part="preview"
            class="color-picker__preview color-picker__transparent-bg"
            title="Copy"
            aria-label="Copy"
            style=${styleMap({ '--preview-color': previewColor })}
            @click=${this.handleCopy}></button>
        </div>
        <div class="color-picker__user-input" aria-live="polite">
          <uui-input
            label="label"
            type="text"
            part="input"
            name=${this.name}
            autocomplete="off"
            autocapitalize="off"
            spellcheck="false"
            .value=${live(this.inputValue)}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            @keydown=${this.handleInputKeyDown}
            @change=${this.handleInputChange}>
          </uui-input>
          <uui-button-group>
            ${!this.noFormatToggle
              ? html`<uui-button
                  label="Toggle color format"
                  @click=${this.handleFormatToggle}
                  class="color-picker__toggle-format"
                  ?disabled=${this.disabled}
                  compact>
                  <span>${this.format}</span>
                </uui-button>`
              : ''}
            ${hasEyeDropper
              ? html`<uui-button
                  label="Select a color"
                  ?disabled=${this.disabled || this.readonly}
                  @click=${this.handleEyeDropper}
                  compact>
                  <uui-icon-registry-essential>
                    <uui-icon name="colorpicker"></uui-icon>
                  </uui-icon-registry-essential>
                </uui-button>`
              : ''}
          </uui-button-group>
        </div>
        ${this._renderSwatches()}
      </div>
    `;
  }

  private _renderSwatches() {
    if (!this.swatches?.length) return nothing;
    return html`<uui-color-swatches
      id="swatches"
      class="color-picker__swatches"
      label="Swatches"
      ?disabled=${this.disabled}
      ?readonly=${this.readonly}
      @change=${this.handleColorSwatchChange}>
      ${this.swatches.map(
        swatch =>
          html`<uui-color-swatch label="${swatch}" .value=${swatch}>
          </uui-color-swatch>`,
      )}
    </uui-color-swatches>`;
  }

  private _renderPreviewButton() {
    const previewColor = this.value
      ? `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, ${this.alpha / 100})`
      : 'transparent';
    return html`<button
        type="button"
        part="trigger"
        aria-label="${this.label || 'Open Color picker'}"
        class=${classMap({
          'color-picker__trigger': true,
          'color-dropdown__trigger--disabled': this.disabled,
          'color-dropdown__trigger--small': this.size === 'small',
          'color-dropdown__trigger--medium': this.size === 'medium',
          'color-dropdown__trigger--large': this.size === 'large',
          'color-picker__transparent-bg': true,
        })}
        style=${styleMap({ '--preview-color': previewColor })}
        ?disabled=${this.disabled}
        aria-haspopup="true"
        aria-expanded="false"
        popovertarget="color-picker-popover"></button>
      <uui-popover-container id="color-picker-popover">
        ${this._renderColorPicker()}
      </uui-popover-container>`;
  }

  render() {
    return this.inline
      ? this._renderColorPicker()
      : this._renderPreviewButton();
  }

  static styles = [
    css`
      :host {
        --uui-look-outline-border: #ddd;
        --uui-look-outline-border-hover: #aaa;
        font-size: 0.8rem;
        color: var(--uui-color-text);
        display: block;
        width: var(--uui-color-picker-width, 280px);
      }
      :host > button {
        cursor: pointer;
      }
      uui-popover-container {
        width: inherit;
      }
      .color-picker {
        width: 100%;
        background-color: var(--uui-color-surface);
        user-select: none;
        border: solid 1px var(--uui-color-border);
      }
      .color-picker__user-input {
        display: flex;
        padding: 0 0.75rem 0.75rem 0.75rem;
      }
      .color-picker__user-input uui-button {
        border: var(--uui-input-border-width, 1px) solid
          var(--uui-input-border-color, var(--uui-color-border));
        border-left: none;
      }
      .color-picker__preview,
      .color-picker__trigger {
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
        cursor: copy;
        margin-left: 0.75rem;
        border-radius: 50%;
      }
      .color-picker__trigger[disabled] {
        cursor: not-allowed;
        opacity: 0.5;
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
        /* We use a custom property in lieu of currentColor because of https://bugs.webkit.org/show_bug.cgi?id=216780 */
        background-color: var(--preview-color);
      }

      .color-dropdown__trigger--empty::before {
        background-color: transparent;
      }

      .color-picker__transparent-bg {
        border: 1px solid var(--uui-color-border);
        background-image: linear-gradient(
            45deg,
            var(--uui-palette-grey) 25%,
            transparent 25%
          ),
          linear-gradient(45deg, transparent 75%, var(--uui-palette-grey) 75%),
          linear-gradient(45deg, transparent 75%, var(--uui-palette-grey) 75%),
          linear-gradient(45deg, var(--uui-palette-grey) 25%, transparent 25%);
        background-size: 10px 10px;
        background-position:
          0 0,
          0 0,
          -5px -5px,
          5px 5px;
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

      uui-color-slider:not(:last-of-type) {
        margin-bottom: 1rem;
      }

      .color-picker__toggle-format {
        min-width: 45px;
        --uui-button-font-size: 0.8rem;
      }
      .color-picker__toggle-format > span {
        text-transform: uppercase;
      }

      uui-color-swatches {
        border-top: solid 1px var(--uui-color-border);
        padding: 0.75rem;
      }

      button[slot='trigger'] {
        border-radius: 50%;
        cursor: pointer;
        width: 36px;
        height: 36px;
      }

      uui-input {
        /*  lower the font size to avoid overflow with hlsa format */
        font-size: 0.85rem;
        box-sizing: content-box;
        flex: 1;
      }

      uui-color-area {
        width: 100%;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-color-picker': UUIColorPickerElement;
  }
}
