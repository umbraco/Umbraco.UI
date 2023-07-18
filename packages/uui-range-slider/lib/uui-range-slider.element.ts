import { UUIHorizontalPulseKeyframes } from '@umbraco-ui/uui-base/lib/animations';

import { FormControlMixin } from '@umbraco-ui/uui-base/lib/mixins';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement, nothing, svg } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { UUIRangeSliderEvent } from './UUIRangeSliderEvent';

const TRACK_PADDING = 12;
const STEP_MIN_WIDTH = 24;

/**
 * @element uui-range-slider
 * @description - Range slider with two handles. Use uui-slider for a single handle.
 * @fires UUIRangeSliderEvent#input on input
 * @fires UUIRangeSliderEvent#change on change
 */
@defineElement('uui-range-slider')
export class UUIRangeSliderElement extends FormControlMixin(LitElement) {
  static styles = [
    UUIHorizontalPulseKeyframes,
    css`
      :host {
        display: block;
        min-height: 50px;
        width: 100%;
        place-items: center;
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE10+/Edge */
        user-select: none;
        cursor: pointer;
      }

      :host([disabled]) {
        cursor: default;
      }

      /** NATIVE INPUT STYLING */

      input {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        position: absolute;
        top: 0;
        background-color: transparent;
        pointer-events: none;
        left: 0;
        right: 0;
        border-radius: 20px;
      }

      input::-webkit-slider-thumb {
        pointer-events: all;
        position: relative;
        z-index: 1;
        outline: 0;
      }

      input::-moz-range-thumb {
        pointer-events: all;
        position: relative;
        z-index: 10;
        -moz-appearance: none;
        background: linear-gradient(to bottom, #ededed 0%, #dedede 100%);
        width: 11px;
      }

      input::-moz-range-track {
        position: relative;
        z-index: -1;
        background-color: rgba(0, 0, 0, 0.15);
        border: 0;
      }

      input:last-of-type::-moz-range-track {
        -moz-appearance: none;
        background: none transparent;
        border: 0;
      }

      /** TRACK */

      #inner-track .color-target {
        position: absolute;
        z-index: 2;
        left: 0;
        right: 0;
        height: 25px;
        transform: translateY(-50%);
      }

      #inner-track .color {
        height: 3px;
        position: absolute;
        transition: background-color 320ms ease-out;
      }

      :host(:not([disabled]))
        #range-slider
        #inner-track
        .color:has(.color-target:hover),
      :host(:not([disabled]))
        #range-slider
        #inner-track
        .color:has(.color-target:active) {
        background-color: var(--uui-color-focus);
      }

      :host(:not([disabled])) #range-slider .color {
        background-color: var(--uui-color-selected);
      }

      :host([disabled]) #range-slider .color {
        background-color: #555;
      }

      #range-slider {
        transform: translateY(50%);
        position: relative;
        height: 18px;
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      #inner-track {
        border-radius: 10px;
        position: absolute;
        height: 3px;
        background-color: var(--uui-color-border-standalone);
        left: ${TRACK_PADDING}px; /* Match TRACK_MARGIN */
        right: ${TRACK_PADDING}px; /* Match TRACK_MARGIN */
      }

      #range-slider:hover #inner-track,
      #range-slider:active #inner-track {
        background-color: #a1a1a1;
      }

      /** STEP VALUES */

      .track-step {
        fill: var(--uui-color-border);
      }

      :host .track-step.filled {
        fill: var(--uui-color-selected) !important;
      }

      :host .track-step.filled-disabled {
        fill: var(--uui-palette-mine-grey) !important;
      }

      #range-slider:hover .track-step,
      #range-slider:active .track-step {
        fill: #a1a1a1;
      }

      #step-values {
        margin: 0 ${TRACK_PADDING}px; /* Match TRACK_MARGIN */
        padding-top: ${TRACK_PADDING + 3}px;
        display: flex;
        align-items: flex-end;
        box-sizing: border-box;
      }

      #step-values > span {
        flex-basis: 0;
        flex-grow: 1;
        color: var(--uui-color-disabled-contrast);
      }

      #step-values > span > span {
        transform: translateX(-50%);
        display: inline-block;
        text-align: center;
        font-size: var(--uui-type-small-size);
      }

      #step-values > span:last-child {
        width: 0;
        flex-grow: 0;
      }

      .svg-wrapper {
        margin: 0 ${-1 * TRACK_PADDING}px;
        height: 18px;
        transform: translateY(-75%);
      }

      .svg-wrapper svg {
        margin-top: ${TRACK_PADDING / 2}px;
      }

      /** FOCUS */

      input[type='range'] {
        position: absolute;
        left: 0;
        right: 0;
        top: -50%;
      }

      input[type='range']:focus-visible {
        outline: none;
      }

      #low-input:focus-visible ~ #inner-track #low-thumb,
      #high-input:focus-visible ~ #inner-track #high-thumb,
      #low-input:focus ~ #inner-track #low.thumb,
      #high-input:focus ~ #inner-track #high-thumb,
      #low-input:active ~ #inner-track #low.thumb,
      #high-input:active ~ #inner-track #high-thumb {
        outline: calc(2px * var(--uui-show-focus-outline, 1)) solid
          var(--uui-color-focus);
      }

      input[type='range']:focus + .thumb {
        outline: calc(2px * var(--uui-show-focus-outline, 1)) solid
          var(--uui-color-focus);
      }

      :host(:not([disabled]))
        #range-slider
        #inner-track
        .color:has(.color-target:hover)
        ~ #low-thumb,
      :host(:not([disabled]))
        #range-slider
        #inner-track
        .color:has(.color-target:active)
        ~ #low-thumb,
      :host(:not([disabled]))
        #range-slider
        #inner-track
        .color:has(.color-target:hover)
        ~ #high-thumb,
      :host(:not([disabled]))
        #range-slider
        #inner-track
        .color:has(.color-target:active)
        ~ #high-thumb {
        outline: calc(2px * var(--uui-show-focus-outline, 1)) solid
          var(--uui-color-focus);
      }

      /** THUMBS  */

      .thumb {
        z-index: 3;
        transform: translateY(-50%);
        position: absolute;
        top: 2px;
        bottom: 0px;
        left: 0px;
        height: 17px;
        width: 17px;
        margin-left: -8px;
        margin-right: -8px;
        border-radius: 50%;
        box-sizing: border-box;
        background-color: var(--uui-color-surface, #fff);
        border: 2px solid var(--uui-color-selected, #3544b1);
        transition: left 120ms ease 0s;
      }

      .thumb:after {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        height: 9px;
        width: 9px;
        border-radius: 50%;
        background-color: var(--uui-color-selected);
      }

      :host([disabled]) .thumb {
        background-color: var(--uui-color-disabled);
        border-color: var(--uui-palette-mine-grey);
      }
      :host([disabled]) .thumb:after {
        background-color: var(--uui-palette-mine-grey);
      }

      .thumb .value {
        position: absolute;
        box-sizing: border-box;
        font-weight: 700;
        bottom: 15px;
        left: 50%;
        width: 40px;
        margin-left: -20px;
        text-align: center;
        opacity: 1;
        transition: 120ms opacity;
        color: var(--uui-color-selected);
        visibility: hidden;
        opacity: 0;
      }

      :host([disabled]) .thumb .value {
        color: var(--uui-palette-mine-grey);
      }

      #range-slider:active .thumb .value,
      #range-slider:focus .thumb .value,
      #range-slider:hover .thumb .value {
        visibility: visible;
        opacity: 1;
      }

      /** NATIVE THUMB STYLING */

      input[type='range']::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 17px;
        height: 17px;
        background-color: transparent;
        display: block;
        border-radius: 100%;
        pointer-events: auto;
        cursor: pointer;
      }
      input[type='range']:disabled::-webkit-slider-thumb {
        cursor: default;
      }

      input[type='range']::-moz-range-thumb {
        -moz-appearance: none;
        appearance: none;
        width: 17px;
        height: 17px;
        background-color: transparent;
        display: block;
        border-radius: 100%;
        pointer-events: auto;
        cursor: pointer;
      }
      input[type='range']:disabled::-moz-range-thumb {
        cursor: default;
      }

      input[type='range']::-ms-thumb {
        appearance: none;
        width: 17px;
        height: 17px;
        background-color: transparent;
        display: block;
        border-radius: 100%;
        pointer-events: auto;
        cursor: pointer;
      }
      input[type='range']:disabled::-ms-thumb {
        cursor: default;
      }
    `,
  ];

  static readonly formAssociated = true;

  /**
   * Disables the input.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Label to be used for aria-label and eventually as visual label. Adds " low value" and " high value" endings for the two values.
   * @type {string}
   * @attr
   */
  @property({ type: String })
  label!: String;

  /**
   * This reflects the behavior of a native input step attribute.
   * @type {number}
   * @attr
   * @default 1
   */
  @property({ type: Number })
  step = 1;

  /**
   * Hides the numbers representing the value of each steps. Dots will still be visible
   * @type {boolean}
   * @attr 'hide-step-values'
   * @default false
   */
  @property({ type: Boolean, attribute: 'hide-step-values' })
  hideStepValues = false;

  /**
   * Sets the minimum allowed value.
   * @type {number}
   * @attr min
   * @default 0
   */
  @property({ type: Number })
  min = 0;

  /**
   * Sets the maximum allowed value.
   * @type {number}
   * @attr max
   * @default 100
   */
  @property({ type: Number })
  max = 100;

  /**
   * Minimum value gap between the the two picked values. Cannot be lower than the step value and cannot be higher than the maximum gap
   * @type {number}
   * @attr min-gap
   * @default undefined
   */
  @property({ type: Number, attribute: 'min-gap' })
  minGap?: number;

  /**
   * Maximum value gap between the the two picked values. Cannot be lower than the minimum gap.
   * @type {number}
   * @attr max-gap
   * @default undefined
   */
  @property({ type: Number, attribute: 'max-gap' })
  maxGap?: number;

  /**
   * This is a value property of the uui-range-slider. Split the two values with comma, forexample 10,50 sets the values to 10 and 50.
   * @type {string}
   * @attr
   * @default 0,100
   */
  @property({ type: String })
  get value() {
    return this._value;
  }
  set value(newVal) {
    if (newVal instanceof String) {
      super.value = newVal;
      const values = newVal.split(',');
      this.valueLow = parseInt(values[0]);
      this.valueHigh = parseInt(values[1]);
    }
  }

  private _valueLow = 0;
  /**
   * The lower picked value.
   * @type {number}
   * @attr value-low
   * @default 0
   */
  @property({ type: Number, attribute: 'value-low' })
  set valueLow(newLow) {
    const old = this._valueHigh;
    if (newLow <= this.min) {
      this._valueLow = this.min;
      super.value = `${this.min},${this.valueHigh}`;
      this.requestUpdate('valueLow', old);
      return;
    }
    if (newLow >= this.valueHigh - this.step) {
      this._valueLow = this.valueHigh - this.step;
      super.value = `${this.valueHigh - this.step},${this.valueHigh}`;
      this.requestUpdate('valueLow', old);
      return;
    }
    this._valueLow = newLow;
    super.value = `${newLow},${this.valueHigh}`;
    this.requestUpdate('valueLow', old);
  }
  get valueLow() {
    return this._valueLow;
  }

  private _valueHigh = 100;
  /**
   * The higher picked value.
   * @type {number}
   * @attr value-high
   * @default 100
   */
  @property({ type: Number, attribute: 'value-high' })
  set valueHigh(newHigh) {
    const old = this._valueHigh;
    if (newHigh >= this.max) {
      this._valueHigh = this.max;
      super.value = `${this.valueLow},${this.max}`;
      this.requestUpdate('valueHigh', old);
      return;
    }
    if (newHigh <= this.valueLow + this.step) {
      this._valueHigh = this.valueLow + this.step;
      super.value = `${this.valueLow},${this.valueLow + this.step}`;
      this.requestUpdate('valueHigh', old);
      return;
    }
    this._valueHigh = newHigh;
    super.value = `${this.valueLow},${newHigh}`;
    this.requestUpdate('valueHigh', old);
  }
  get valueHigh() {
    return this._valueHigh;
  }

  @state()
  private _trackWidth = 0;

  @state()
  private _currentInputFocus?: HTMLInputElement;

  @state()
  private _currentThumbFocus: 'high' | 'low' = 'low';

  @state()
  private _grabbingBoth?: boolean;

  @state()
  private _startPos = 0;

  @state()
  private _startLow = 0;

  @state()
  private _startHigh = 0;

  @query('#low-input')
  private _inputLow!: HTMLInputElement;

  @query('#high-input')
  private _inputHigh!: HTMLInputElement;

  @query('#range-slider')
  private _outerTrack!: HTMLElement;

  @query('#inner-track')
  private _innerTrack!: HTMLElement;

  @query('#low-thumb')
  private _thumbLow!: HTMLElement;

  @query('#high-thumb')
  private _thumbHigh!: HTMLElement;

  @query('.color')
  private _innerColor!: HTMLElement;

  @query('.color-target')
  private _bothThumbsTarget!: HTMLElement;

  #setValue(val?: string) {
    this._value = val ? val : `${this.valueLow},${this.valueHigh}`;
  }

  protected getFormElement(): HTMLInputElement {
    return this._currentInputFocus ? this._currentInputFocus : this._inputLow;
  }

  public focus() {
    this._currentInputFocus
      ? this._currentInputFocus.focus()
      : this._inputLow.focus();
  }

  private _onKeypress(e: KeyboardEvent) {
    if (e.key == 'Enter') {
      this.submit();
    }
  }

  /** Thumb position */

  private _sliderLowThumbPosition() {
    const ratio = (this.valueLow - this.min) / (this.max - this.min);
    const valueLowPercent = `${Math.floor(ratio * 100000) / 1000}%`;
    return valueLowPercent;
  }

  private _sliderHighThumbPosition() {
    const ratio = (this.valueHigh - this.min) / (this.max - this.min);
    const valueHighPercent = `${Math.floor(ratio * 100000) / 1000}%`;
    return valueHighPercent;
  }

  /** Coloring of the line between thumbs */

  private _fillColor() {
    const percentStart =
      ((this.valueLow - this.min) / (this.max - this.min)) * 100;
    const percentEnd =
      ((this.valueHigh - this.min) / (this.max - this.min)) * 100;

    this._innerColor.style.left = `${percentStart}%`;
    this._innerColor.style.right = `${100 - percentEnd}%`;
  }

  /** Moving thumb */

  private _moveThumb(pageX: number) {
    const value = this._getValue(pageX);
    if (value >= this.valueHigh) this._setThumb(this._thumbHigh);
    if (value <= this.valueLow) this._setThumb(this._thumbLow);
    this._setValueBasedOnCurrentThumb(
      this._validateValueBasedOnCurrentThumb(value)
    );
  }

  /** Mouse events */

  private _onMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    if (this.disabled) return;
    window.addEventListener('mouseup', this._onMouseUp);
    window.addEventListener('mousemove', this._onMouseMove);

    const target = e.composedPath()[0];
    const pageX = e.pageX;

    target == this._bothThumbsTarget
      ? (this._grabbingBoth = true)
      : (this._grabbingBoth = false);

    if (this._grabbingBoth) {
      this._saveStartPoint(pageX, this.valueLow, this.valueHigh);
      return;
    }

    this._moveThumb(pageX);
  };

  private _onMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    const pageX = e.pageX;
    const val = this._getValue(pageX);
    if (!this._grabbingBoth)
      this._setValueBasedOnCurrentThumb(
        this._validateValueBasedOnCurrentThumb(val)
      );
    else this._moveBoth(pageX);

    this.dispatchEvent(new UUIRangeSliderEvent(UUIRangeSliderEvent.INPUT));
  };

  private _onMouseUp = () => {
    this._stop();
    window.removeEventListener('mouseup', this._onMouseUp);
    window.removeEventListener('mousemove', this._onMouseMove);
  };

  /** Touch / mobile events */

  private _onTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    if (this.disabled) return;

    window.addEventListener('touchend', this._onTouchEnd);
    window.addEventListener('touchmove', this._onTouchMove);

    const target = e.composedPath()[0];
    const pageX = e.touches[0].pageX;

    target == this._bothThumbsTarget
      ? (this._grabbingBoth = true)
      : (this._grabbingBoth = false);

    if (this._grabbingBoth) {
      this._saveStartPoint(pageX, this.valueLow, this.valueHigh);
      return;
    }
    this._moveThumb(pageX);
  };

  private _onTouchMove = (e: TouchEvent) => {
    const pageX = e.touches[0].pageX;
    const val = this._getValue(pageX);
    if (!this._grabbingBoth)
      this._setValueBasedOnCurrentThumb(
        this._validateValueBasedOnCurrentThumb(val)
      );
    else this._moveBoth(pageX);

    this.dispatchEvent(new UUIRangeSliderEvent(UUIRangeSliderEvent.INPUT));
  };

  private _onTouchEnd = () => {
    this._stop();
    window.removeEventListener('touchend', this._onTouchEnd);
    window.removeEventListener('touchmove', this._onTouchMove);
  };

  /** */

  private _stop() {
    this._grabbingBoth = false;
    this.pristine = false;
    this.dispatchEvent(new UUIRangeSliderEvent(UUIRangeSliderEvent.CHANGE));
  }

  /** The latest thumb in use */

  private _setThumb(target: EventTarget | HTMLElement) {
    this._currentThumbFocus = target === this._thumbLow ? 'low' : 'high';

    this._currentThumbFocus === 'low'
      ? (this._currentInputFocus = this._inputLow)
      : (this._currentInputFocus = this._inputHigh);

    this.focus();
  }

  private _setValueBasedOnCurrentThumb(val: number) {
    this._currentThumbFocus === 'low'
      ? (this.valueLow = val)
      : (this.valueHigh = val);
  }

  /** Get the value depends on where clicked/touched */

  private _getValue(pageX: number) {
    const mouseXPosition =
      pageX - this._innerTrack.getBoundingClientRect().left;
    const clickPercent =
      mouseXPosition / (this._trackWidth - TRACK_PADDING * 2);

    const clickedValue = clickPercent * (this.max - this.min) + this.min;
    const newValue = Math.round(clickedValue / this.step) * this.step;

    return newValue;
  }

  private _validateLowByMinGap(value: number) {
    if (!this.minGap || this.minGap <= this.step) return value;
    return value + this.minGap >= this.valueHigh
      ? this.valueHigh - this.minGap
      : value;
  }

  private _validateLowByMaxGap(value: number) {
    if (!this.maxGap) return value;
    return this.valueHigh - value >= this.maxGap
      ? this.valueHigh - this.maxGap
      : value;
  }

  private _validateHighByMinGap(value: number) {
    if (!this.minGap || this.minGap <= this.step) return value;
    return value <= this.valueLow + this.minGap
      ? this.valueLow + this.minGap
      : value;
  }

  private _validateHighByMaxGap(value: number) {
    if (!this.maxGap) return value;
    return value >= this.valueLow + this.maxGap
      ? this.valueLow + this.maxGap
      : value;
  }

  private _validateValueBasedOnCurrentThumb(newValue: number): number {
    if (this._currentThumbFocus == 'low') {
      let newLow: number;
      newLow =
        newValue < this.valueHigh - this.step
          ? newValue
          : this.valueHigh - this.step;
      newLow = newLow >= this.min ? newLow : this.min;

      newLow = this.minGap ? this._validateLowByMinGap(newLow) : newLow;
      newLow = this.maxGap ? this._validateLowByMaxGap(newLow) : newLow;

      return newLow;
    }

    let newHigh: number;
    newHigh =
      newValue > this.valueLow + this.step
        ? newValue
        : this.valueLow + this.step;
    newHigh = newHigh <= this.max ? newHigh : this.max;

    newHigh = this.minGap ? this._validateHighByMinGap(newHigh) : newHigh;
    newHigh = this.maxGap ? this._validateHighByMaxGap(newHigh) : newHigh;

    return newHigh;
  }

  /** Methods when moving both thumbs */

  private _saveStartPoint(pageX: number, lowVal: number, highVal: number) {
    this._startPos = pageX;
    this._startLow = lowVal;
    this._startHigh = highVal;
  }

  private _moveBoth(pageX: number) {
    const drag = pageX - this._startPos;
    const trackDiff = this.max - this.min;

    const dragPercent = drag / (this._trackWidth + TRACK_PADDING * 2);
    const dragValue =
      Math.round((dragPercent * trackDiff) / this.step) * this.step;

    const newValueLow = this._startLow + dragValue;
    const newValueHigh = this._startHigh + dragValue;

    const value = this._getValidatedValues(newValueLow, newValueHigh);

    if (newValueLow === value.low && newValueHigh === value.high) {
      this.valueLow = newValueLow;
      this.valueHigh = newValueHigh;
      this.dispatchEvent(new UUIRangeSliderEvent(UUIRangeSliderEvent.INPUT));
    }
  }

  private _getValidatedValues(low: number, high: number) {
    const validatedLow = low > this.min ? low : this.min;
    const validatedHigh = high < this.max ? high : this.max;
    return { low: validatedLow, high: validatedHigh };
  }

  /** CHANGE AND INPUT EVENT LISTENERS */

  private _onChange(e: Event) {
    e.stopPropagation();
    this.pristine = false;
    this.dispatchEvent(new UUIRangeSliderEvent(UUIRangeSliderEvent.CHANGE));
  }

  private _onLowInput(e: Event) {
    e.stopPropagation();
    let value = parseInt(this._inputLow.value);

    value = this._validateLowByMinGap(value);
    value = this._validateLowByMaxGap(value);

    this._inputLow.value = String(value);
    this.valueLow = value;

    this.dispatchEvent(new UUIRangeSliderEvent(UUIRangeSliderEvent.INPUT));
  }

  private _onHighInput(e: Event) {
    e.stopPropagation();
    let value = parseInt(this._inputHigh.value);

    value = this._validateHighByMinGap(value);
    value = this._validateHighByMaxGap(value);

    this._inputHigh.value = String(value);
    this.valueHigh = value;

    this.dispatchEvent(new UUIRangeSliderEvent(UUIRangeSliderEvent.INPUT));
  }

  /** Constructor */

  constructor() {
    super();
    // Keyboard
    this.addEventListener('keypress', this._onKeypress);
    // Mouse
    this.addEventListener('mousedown', this._onMouseDown);
    // Touch
    this.addEventListener('touchstart', this._onTouchStart);

    this.addValidator(
      'stepMismatch',
      () => `Step property needs to be higher than 0`,
      () => this.step <= 0
    );

    this.addValidator(
      'stepMismatch',
      () => `Maxmimum gap needs to be higher than minimum gap`,
      () => !!this.maxGap && !!this.minGap && this.maxGap <= this.minGap
    );

    this.addValidator(
      'rangeUnderflow',
      () =>
        `The lower end value (${this.valueLow}) cannot be below the the minimum value setting (${this.min})`,
      () => this.valueLow < this.min
    );
    this.addValidator(
      'rangeOverflow',
      () =>
        `The higher end value (${this.valueHigh}) cannot be above the the maximum value setting (${this.max})`,
      () => this.valueHigh > this.max
    );
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.#setValue();
    window.addEventListener('resize', () => {
      this._trackWidth = this._outerTrack.offsetWidth;
    });
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    this._trackWidth = this._outerTrack.offsetWidth;
    this._fillColor();
  }

  /** RENDER */

  render() {
    return html`
      <div id="range-slider">
        ${this.renderNativeInputs()}
        <div id="inner-track">
          <span class="color"><span class="color-target"></span></span>
          ${this.renderStepsOutput()} ${this.renderThumbs()}
        </div>
        <div id="step-values">${this.renderStepValues()}</div>
      </div>
    `;
  }

  renderNativeInputs() {
    return html`<input
        id="low-input"
        class="slider"
        type="range"
        .value="${String(this.valueLow)}"
        min="${this.min}"
        max="${this.max}"
        step="${this.step}"
        aria-label="${this.label} low value"
        ?disabled="${this.disabled}"
        @change="${this._onChange}"
        @input="${this._onLowInput}" />
      <input
        id="high-input"
        class="slider"
        type="range"
        .value="${String(this.valueHigh)}"
        min="${this.min}"
        max="${this.max}"
        step="${this.step}"
        aria-label="${this.label} high value"
        ?disabled="${this.disabled}"
        @change="${this._onChange}"
        @input="${this._onHighInput}" />`;
  }

  renderThumbs() {
    return html`<div
        id="low-thumb"
        class="thumb"
        style="left: ${this._sliderLowThumbPosition()}">
        <div class="value value-min">${this.valueLow}</div>
      </div>
      <div
        id="high-thumb"
        class="thumb"
        style="left: ${this._sliderHighThumbPosition()}">
        <div class="value value-max">${this.valueHigh}</div>
      </div>`;
  }

  /** RENDER STEPS & STEP VALUES */
  renderStepsOutput() {
    return html`<div class="svg-wrapper">
      <svg height="100%" width="100%">
        <rect x="9" y="9" height="3" rx="2" />
        ${this.renderSteps()}
      </svg>
    </div>`;
  }

  renderSteps() {
    const stepAmount = (this.max - this.min) / this.step;
    const stepWidth = (this._trackWidth - TRACK_PADDING * 2) / stepAmount;
    const trackValue = this._trackWidth / (this.max - this.min);

    if (stepWidth >= STEP_MIN_WIDTH) {
      let i = 0;
      const steps = [];
      for (i; i <= stepAmount; i++) {
        steps.push(i * stepWidth);
      }
      const colorClass = this.disabled == false ? `filled` : `filled-disabled`;
      return svg`
        ${steps.map(position => {
          const x = position + TRACK_PADDING;
          if (
            x / trackValue > this.valueLow - this.min &&
            x / trackValue < this.valueHigh - this.min
          ) {
            return svg`<circle class="track-step ${colorClass}" cx="${x}" cy="50%" r="4.5" />`;
          } else {
            return svg`<circle class="track-step" cx="${x}" cy="50%" r="4.5" />`;
          }
        })}`;
    } else {
      return svg``;
    }
  }

  renderStepValues() {
    if (this.hideStepValues) return nothing;
    const stepAmount = (this.max - this.min) / this.step;
    const stepWidth = (this._trackWidth - TRACK_PADDING * 2) / stepAmount;

    if (stepWidth >= STEP_MIN_WIDTH && stepAmount <= 20) {
      let i = 0;
      const stepValues = [];
      for (i; i <= stepAmount; i++) {
        stepValues.push(i * this.step + this.min);
      }
      return html` ${stepValues.map(stepValue => {
        return html`<span><span>${stepValue}</span></span>`;
      })}`;
    } else {
      return nothing;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-range-slider': UUIRangeSliderElement;
  }
}
