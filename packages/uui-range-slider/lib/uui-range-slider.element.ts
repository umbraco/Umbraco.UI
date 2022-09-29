import { UUIHorizontalPulseKeyframes } from '@umbraco-ui/uui-base/lib/animations';

import { FormControlMixin } from '@umbraco-ui/uui-base/lib/mixins';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement, svg } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { UUIRangeSliderEvent } from './UUIRangeSliderEvent';

const TRACK_PADDING = 12;
const STEP_MIN_WIDTH = 24;

/**
 * @element uui-range-slider
 * @description - Range slider with two handles. Use uui-slider for a single handle.
 */
@defineElement('uui-range-slider')
export class UUIRangeSliderElement extends FormControlMixin(LitElement) {
  static styles = [
    UUIHorizontalPulseKeyframes,
    css`
      :host {
        position: relative;
        width: 100%;
        min-height: 30px;
        padding: 0;
        margin: 0;
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

      #wrapper {
        position: relative;
        border-radius: 20px;
        min-height: 40px;
      }

      #wrapper:focus-visible {
        outline: none;
      }

      #wrapper:focus-visible .slider-track {
        outline: calc(2px * var(--uui-show-focus-outline, 1)) solid
          var(--uui-color-focus);
      }

      .slider-track {
        left: 0;
        right: 0;
        height: 0;
        position: absolute;
        height: 18px;
        border-radius: 10px;
      }

      .inner-track {
        position: absolute;
        border-radius: 10px;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        right: 0;
        height: 3px;
        margin: -23px 0;
        z-index: -1;
        background-color: #a1a1a1;
      }

      .inner-track:focus {
        background-color: var(--uui-color-border-standalone);
      }

      .inner-track .color {
        height: 3px;
        position: absolute;
        transition: left 120ms ease, right 120ms ease;
      }

      input[type='range']:not([disabled]) ~ .inner-track .color {
        background-color: var(--uui-color-selected);
      }

      input[type='range']:disabled ~ .inner-track .color {
        background-color: #555;
      }

      #thumb-wrapper {
        position: relative;
        margin: 0 ${TRACK_PADDING}px;
      }

      .thumb {
        width: 17px;
        height: 17px;
        position: absolute;
        top: -31px;
        bottom: 0;
        left: 0;
        margin-left: -8px;
        margin-right: -8px;
        border-radius: 50%;
        box-sizing: border-box;
        background-color: var(--uui-color-surface);
        border: 2px solid var(--uui-color-selected);
        transition: 120ms left ease;
        z-index: 10;
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

      #wrapper:active .thumb .value,
      #wrapper:focus .thumb .value,
      #wrapper:hover .thumb .value {
        visibility: visible;
        opacity: 1;
      }

      .svg-wrapper svg {
        margin-top: -6px;
        height: 30px;
        width: 100%;
      }

      #wrapper:hover .track-step,
      #wrapper:active .track-step {
        fill: #a1a1a1;
      }

      .track-step {
        fill: var(--uui-color-border);
      }

      #wrapper .track-step.filled {
        fill: var(--uui-color-selected) !important;
      }

      #wrapper .track-step.filled-disabled {
        fill: var(--uui-palette-mine-grey) !important;
      }

      #step-values {
        margin: 0 ${TRACK_PADDING}px; /* Match TRACK_MARGIN */
        padding-top: 24px;
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

      #input-wrapper {
        position: relative;
        margin: -45px ${TRACK_PADDING / 2}px 45px;
      }

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
        margin: -30px -8px;
        z-index: 12;
        border-radius: 20px;
      }

      input[type='range']:focus-visible {
        outline: none;
      }

      input[type='range']:focus + .thumb {
        outline: calc(2px * var(--uui-show-focus-outline, 1)) solid
          var(--uui-color-focus);
      }

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

  private _min = 0;
  private _max = 100;
  private _valueLow = 0;
  private _valueHigh = 100;
  private _minGap = 1;
  private _maxGap?: number;

  /**
   * Sets the minimum allowed value.
   * @type {number}
   * @attr min
   * @default 0
   */
  @property({ type: Number })
  set min(newVal) {
    const old = this._min;
    if (newVal < this.max) {
      this._min = newVal;
      this.requestUpdate('min', old);
      if (this.valueLow < newVal) {
        const move = newVal - old;
        this.valueHigh = this.valueHigh + move;
        this.valueLow = this.valueLow + move;
      }
    }
  }
  get min() {
    return this._min;
  }

  /**
   * Sets the maximum allowed value.
   * @type {number}
   * @attr max
   * @default 100
   */
  @property({ type: Number })
  set max(newVal) {
    const old = this._max;
    if (newVal > this.min) {
      this._max = newVal;
      this.requestUpdate('max', old);
      if (this.valueHigh > newVal) {
        const move = newVal - old;
        this.valueLow = this.valueLow + move;
        this.valueHigh = this.valueHigh + move;
      }
    }
  }
  get max() {
    return this._max;
  }

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
      this._valueLow = parseInt(values[0]);
      this._valueHigh = parseInt(values[1]);
    }
  }

  /**
   * The lower picked value.
   * @type {number}
   * @attr value-low
   * @default 0
   */
  @property({ type: Number, attribute: 'value-low' })
  set valueLow(newVal) {
    const old = this._valueLow;
    if (
      newVal <= this.valueHigh - this.minGap &&
      newVal >= this.min &&
      (!this.maxGap || this.maxGap >= this.valueHigh - newVal)
    ) {
      this._valueLow = newVal;
      super.value = `${newVal},${this.valueHigh}`;
      this.requestUpdate('valueLow', old);
    } else if (newVal < this.min) {
      this._valueLow = this.min;
      super.value = `${newVal},${this.min}`;
      this.requestUpdate('valueLow', old);
    }
  }
  get valueLow() {
    return this._valueLow;
  }

  /**
   * The higher picked value.
   * @type {number}
   * @attr value-high
   * @default 100
   */
  @property({ type: Number, attribute: 'value-high' })
  set valueHigh(newVal) {
    const old = this._valueHigh;
    if (
      newVal >= this.valueLow + this.minGap &&
      newVal <= this.max &&
      (!this.maxGap || this.maxGap >= newVal - this.valueLow)
    ) {
      this._valueHigh = newVal;
      super.value = `${this.valueLow},${newVal}`;
      this.requestUpdate('valueHigh', old);
    } else if (newVal > this.max) {
      this.valueHigh = this.max;
      super.value = `${this.valueLow},${this.max}`;
      this.requestUpdate('valueHigh', old);
    }
  }
  get valueHigh() {
    return this._valueHigh;
  }

  /**
   * Minimum value gap between the the two picked values. Cannot be lower than the step value and cannot be higher than the maximum gap
   * @type {number}
   * @attr min-gap
   * @default 1
   */
  @property({ type: Number, attribute: 'min-gap' })
  set minGap(newVal) {
    const old = this._minGap;
    if (newVal > this.step && newVal > 0) {
      this._minGap = newVal;
    } else {
      this._minGap = this.step;
    }
    this.requestUpdate('minGap', old);
  }
  get minGap() {
    return this._minGap;
  }

  /**
   * Maximum value gap between the the two picked values. Cannot be lower than the minimum gap.
   * @type {number}
   * @attr max-gap
   * @default undefined
   */
  @property({ type: Number, attribute: 'max-gap' })
  set maxGap(newVal) {
    const old = this._maxGap;
    if (newVal && newVal > this.minGap && newVal > this.step) {
      this._maxGap = newVal;
    } else {
      this._maxGap = undefined;
    }
    this.requestUpdate('maxGap', old);
  }
  get maxGap() {
    return this._maxGap;
  }

  @property({ type: Number })
  private _trackWidth = 0;

  @state()
  private _handle = {
    low: false,
    high: false,
    both: false,
    startPosition: 0,
    lowStart: 0,
    highStart: 0,
  };

  @query('#min-slider')
  private _inputLow!: HTMLInputElement;

  @query('#max-slider')
  private _inputHigh!: HTMLInputElement;

  @query('.slider-track')
  private _sliderTrack!: HTMLElement;

  @query('.inner-track')
  private _innerSliderTrack!: HTMLElement;

  @query('.color')
  private _innerColor!: HTMLElement;

  public focus() {
    this._inputLow.focus();
  }

  protected getFormElement(): HTMLElement {
    return this._inputLow;
  }

  private _onMinInput(e: Event) {
    e.stopPropagation();
    const low = parseInt(this._inputLow.value);
    const high = parseInt(this._inputHigh.value) - this.minGap;
    if (low >= high && (!this.maxGap || this.maxGap >= high - low)) {
      this._inputLow.value = String(high);
      this.valueLow = high;
    } else {
      this.valueLow = parseInt(this._inputLow.value);
    }
    this.dispatchEvent(new UUIRangeSliderEvent(UUIRangeSliderEvent.INPUT));
  }

  private _onMaxInput(e: Event) {
    e.stopPropagation();
    const high = parseInt(this._inputHigh.value);
    const low = parseInt(this._inputLow.value) + this.minGap;
    if (high <= low && (!this.maxGap || this.maxGap >= high - low)) {
      this._inputHigh.value = String(low);
      this.valueHigh = low;
    } else {
      this.valueHigh = parseInt(this._inputHigh.value);
    }
    this.dispatchEvent(new UUIRangeSliderEvent(UUIRangeSliderEvent.INPUT));
  }

  private _onChange(e: Event) {
    e.stopPropagation();
    this.pristine = false;
    this.dispatchEvent(new UUIRangeSliderEvent(UUIRangeSliderEvent.CHANGE));
  }

  private _fillColor() {
    const percentStart =
      ((this.valueLow - this.min) / (this.max - this.min)) * 100;
    const percentEnd =
      ((this.valueHigh - this.min) / (this.max - this.min)) * 100;

    this._innerColor.style.left = `${percentStart}%`;
    this._innerColor.style.right = `${100 - percentEnd}%`;
  }

  //Keyboards

  private _onKeypress(e: KeyboardEvent): void {
    if (e.key == 'Enter') {
      this.submit();
    }
  }

  // Touch events

  private _onTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    if (!this.disabled) {
      const target = e.composedPath()[0];
      if (target == this._inputLow) {
        this._handle.low = true;
      } else if (target == this._inputHigh) {
        this._handle.high = true;
      } else {
        const thumb = this._getHandles(e.touches[0].pageX);
        if (thumb?.type == 'low' && this._handle.low == true) {
          this.valueLow = thumb.value;
        } else if (thumb?.type == 'high' && this._handle.high == true) {
          this.valueHigh = thumb.value;
        }
      }
      window.addEventListener('touchend', this._onTouchEnd);
      window.addEventListener('touchmove', this._onTouchMove);
    }
  };

  private _onTouchMove = (e: TouchEvent) => {
    if (this._innerSliderTrack) {
      const offsetX =
        e.touches[0].pageX -
        this._innerSliderTrack.getBoundingClientRect().left;
      if (this._handle.both == true) {
        this._updateBothValues(offsetX);
      } else if (this._handle.low == true) {
        this.valueLow = this._getValue(offsetX);
      } else if (this._handle.high == true) {
        this.valueHigh = this._getValue(offsetX);
      }
    }
  };

  private _onTouchEnd = () => {
    this.stopMoving();
  };

  // Mouse events

  private _onMouseDown = (e: MouseEvent) => {
    if (!this.disabled) {
      const target = e.composedPath()[0];

      if (target == this._inputLow) {
        this._handle.low = true;
      } else if (target == this._inputHigh) {
        this._handle.high = true;
      } else {
        const thumb = this._getHandles(e.pageX);
        if (thumb?.type == 'low' && this._handle.low == true) {
          this.valueLow = thumb.value;
        } else if (thumb?.type == 'high' && this._handle.high == true) {
          this.valueHigh = thumb.value;
        }
      }
      window.addEventListener('mouseup', this._onMouseUp);
      window.addEventListener('mousemove', this._onMouseMove);
    }
  };

  private _onMouseMove = (e: MouseEvent) => {
    if (this._handle.both == true) {
      e.preventDefault();
      this._updateBothValues(e.offsetX);
    } else if (this._handle.low == true) {
      const newVal = this._getValue(e.offsetX);
      if (newVal != this.valueLow) {
        this.valueLow = newVal;
        this.dispatchEvent(new UUIRangeSliderEvent(UUIRangeSliderEvent.INPUT));
      }
    } else if (this._handle.high == true) {
      const newVal = this._getValue(e.offsetX);
      if (newVal != this.valueHigh) {
        this.valueHigh = newVal;
        this.dispatchEvent(new UUIRangeSliderEvent(UUIRangeSliderEvent.INPUT));
      }
    }
  };

  private _onMouseUp = () => {
    this.stopMoving();
    window.removeEventListener('mouseup', this._onMouseUp);
    window.removeEventListener('mousemove', this._onMouseMove);
  };

  // Event logic

  private stopMoving = () => {
    this._handle.both = false;
    this._handle.high = false;
    this._handle.low = false;
    this._handle.startPosition = 0;
    this.pristine = false;
    this.dispatchEvent(new UUIRangeSliderEvent(UUIRangeSliderEvent.CHANGE));
  };

  private _getValue(offsetX: number) {
    const p = offsetX / (this._trackWidth + TRACK_PADDING * 2);
    const trackDiff = this.max - this.min;
    const positionValue = p * trackDiff + this.min;
    const value = Math.round(positionValue / this.step) * this.step;
    return value;
  }

  private _getHandles(pageX: number) {
    const mouseXPosition =
      pageX - this._innerSliderTrack.getBoundingClientRect().left;
    const clickPercent =
      mouseXPosition / (this._trackWidth - TRACK_PADDING * 2);

    const clickedValue = clickPercent * (this.max - this.min) + this.min;
    const newValue = Math.round(clickedValue / this.step) * this.step;

    if (clickedValue < this.valueLow) {
      this._handle.low = true;
      return { type: 'low', value: newValue };
    } else if (clickedValue > this.valueHigh) {
      this._handle.high = true;
      return { type: 'high', value: newValue };
    } else if (clickedValue > this.valueLow && clickedValue < this.valueHigh) {
      this._handle.both = true;
      this._handle.lowStart = this.valueLow;
      this._handle.highStart = this.valueHigh;
      this._handle.startPosition = mouseXPosition;
      return { type: 'both', value: newValue };
    }
    return;
  }

  private _updateBothValues(mousePosition: number) {
    const drag = mousePosition - this._handle.startPosition;
    const trackDiff = this.max - this.min;

    const dragPercent = drag / (this._trackWidth + TRACK_PADDING * 2);
    const dragValue =
      Math.round((dragPercent * trackDiff) / this.step) * this.step;

    const newLow = this._handle.lowStart + dragValue;
    const newHigh = this._handle.highStart + dragValue;

    if (
      this.valueLow !== newLow &&
      newLow >= this.min &&
      newHigh <= this.max &&
      dragValue != 0
    ) {
      this.valueLow = newLow;
      this.valueHigh = newHigh;
      this.dispatchEvent(new UUIRangeSliderEvent(UUIRangeSliderEvent.INPUT));
    }
  }

  constructor() {
    super();
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
      () => !!this.maxGap && this.maxGap <= this.minGap
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

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    this._trackWidth = this._sliderTrack.offsetWidth;
    this._fillColor();
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', () => {
      this._trackWidth = this._sliderTrack.offsetWidth;
    });
  }

  //Render stuff

  private _sliderLowThumbPosition() {
    const ratio =
      (parseFloat((this.valueLow || '0') as string) - this.min) /
      (this.max - this.min);
    const valueLowPercent = `${Math.floor(ratio * 100000) / 1000}%`;
    return valueLowPercent;
  }

  private _sliderHighThumbPosition() {
    const ratio =
      (parseFloat((this.valueHigh || '0') as string) - this.min) /
      (this.max - this.min);
    const valueHighPercent = `${Math.floor(ratio * 100000) / 1000}%`;
    return valueHighPercent;
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

  renderStepValues(hide: boolean) {
    const stepAmount = (this.max - this.min) / this.step;
    const stepWidth = (this._trackWidth - TRACK_PADDING * 2) / stepAmount;

    if (stepWidth >= STEP_MIN_WIDTH && stepAmount <= 20 && !hide) {
      let i = 0;
      const stepValues = [];
      for (i; i <= stepAmount; i++) {
        stepValues.push(i * this.step + this.min);
      }
      return html` ${stepValues.map(stepValue => {
        return html`<span><span>${stepValue}</span></span>`;
      })}`;
    } else {
      return html``;
    }
  }

  private _onInputMouseDown = (e: MouseEvent) => {
    e.stopPropagation();
  };

  render() {
    return html`
      <div id="wrapper">
        <div class="slider-track">
          <div class="svg-wrapper">
            <svg height="100%" width="100%">
              <rect x="9" y="9" height="3" rx="2" />
              ${this.renderSteps()}
            </svg>
          </div>
          <div id="thumb-wrapper">
            <input
              type="range"
              id="min-slider"
              min="${this.min}"
              max="${this.max}"
              step="${this.step}"
              ?disabled="${this.disabled}"
              .value="${String(this.valueLow)}"
              aria-label="${this.label} low value"
              @mousedown="${this._onInputMouseDown}"
              @input="${this._onMinInput}"
              @change="${this._onChange}" />
            <div
              class="thumb thumb-min"
              style="left: ${this._sliderLowThumbPosition()}">
              <div class="value value-min">${this.valueLow}</div>
            </div>
            <input
              type="range"
              id="max-slider"
              min="${this.min}"
              max="${this.max}"
              step="${this.step}"
              ?disabled="${this.disabled}"
              .value="${String(this.valueHigh)}"
              aria-label="${this.label} high value"
              @mousedown="${this._onInputMouseDown}"
              @input="${this._onMaxInput}"
              @change="${this._onChange}" />
            <div
              class="thumb thumb-max"
              style="left: ${this._sliderHighThumbPosition()}">
              <div class="value value-max">${this.valueHigh}</div>
            </div>
            <div class="inner-track"><span class="color"></span></div>
          </div>
        </div>
        <div id="step-values">
          ${this.renderStepValues(this.hideStepValues)}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-range-slider': UUIRangeSliderElement;
  }
}
