import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement, svg } from 'lit';
import { UUIFormControlMixin } from '@umbraco-ui/uui-base/lib/mixins';
import { property, query, state } from 'lit/decorators.js';
import { UUIRangeSliderEvent } from './UUIRangeSliderEvent';
import { clamp } from '@umbraco-ui/uui-base/lib/utils';

const Z_INDEX = {
  TOP: 3,
  CENTER: 2,
  BACK: 1,
};

const THUMB_SIZE = 18;
const TRACK_HEIGHT = 3;
const TRACK_PADDING = 12;
const STEP_MIN_WIDTH = 24;

const CountDecimalPlaces = (num: number) => {
  const decimalIndex = num.toString().indexOf('.');
  return decimalIndex >= 0 ? num.toString().length - decimalIndex - 1 : 0;
};

// TODO: ability to focus on the range, to enable keyboard interaction to move the range.
// TODO: Ability to click outside a range, to move the range if the maxGap has been reached.
// TODO: .
/**
 * @element uui-range-slider
 * @description - Range slider with two handles. Use uui-slider for a single handle.
 * @fires UUIRangeSliderEvent#input on input
 * @fires UUIRangeSliderEvent#change on change
 * @extends UUIFormControlMixin
 */
@defineElement('uui-range-slider')
export class UUIRangeSliderElement extends UUIFormControlMixin(LitElement, '') {
  static readonly formAssociated = true;

  /**
   * Label to be used for aria-label and eventually as visual label. Adds "low-end value" and "high-end value" endings for the two values.
   * @type {string}
   * @attr
   */
  @property({ type: String })
  label!: String;

  /**
   * Disables the input.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Sets the input to readonly mode, meaning value cannot be changed but still able to read and select its content.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Sets the minimum allowed value.
   * @type {number}
   * @attr min
   * @default 0
   */
  @property({ type: Number })
  get min() {
    return this._min;
  }
  set min(newVal) {
    this._min = newVal;
    this.#transferValueToInternalValues();
  }
  _min = 0;

  /**
   * Sets the maximum allowed value.
   * @type {number}
   * @attr max
   * @default 100
   */
  @property({ type: Number })
  get max() {
    return this._max;
  }
  set max(newVal) {
    this._max = newVal;
    this.#transferValueToInternalValues();
  }
  _max = 0;

  /**
   * Hides the numbers representing the value of each steps. Dots will still be visible
   * @type {boolean}
   * @attr 'hide-step-values'
   * @default false
   */
  @property({ type: Boolean, attribute: 'hide-step-values' })
  hideStepValues = false;

  /**
   * This reflects the behavior of a native input step attribute.
   * @type {number}
   * @attr
   * @default 1
   */
  @property({ type: Number })
  get step() {
    return this._step;
  }
  set step(newVal) {
    this._step = newVal;
    this.#transferValueToInternalValues();
  }
  _step = 1;

  /**
   * Minimum value gap between the the two picked values. Cannot be lower than the step value and cannot be higher than the maximum gap
   * @type {number}
   * @attr min-gap
   * @default undefined
   */
  @property({ type: Number, attribute: 'min-gap' })
  get minGap() {
    return this._minGap;
  }
  set minGap(newVal) {
    this._minGap = newVal;
    this.#transferValueToInternalValues();
  }
  _minGap?: number;

  /**
   * Maximum value gap between the the two picked values. Cannot be lower than the minimum gap.
   * @type {number}
   * @attr max-gap
   * @default undefined
   */
  @property({ type: Number, attribute: 'max-gap' })
  get maxGap() {
    return this._maxGap;
  }
  set maxGap(newVal) {
    this._maxGap = newVal;
    this.#transferValueToInternalValues();
  }
  _maxGap?: number;

  /**
   * This is a value property of the uui-range-slider. Split the two values with comma, for example 10,50 sets the values to 10 and 50.
   * @type {string}
   * @attr
   * @default 0,0
   */
  @property({ type: String })
  get value() {
    return super.value;
  }
  set value(newVal) {
    super.value = newVal;
    this.#transferValueToInternalValues();
  }

  private _currentFocus?: HTMLInputElement;

  @state()
  private _movement = false;

  private startPoint = {
    mouse: 0,
    low: 0,
    high: 0,
  };

  @state()
  private _lowInputValue = 0;

  @state()
  private _highInputValue = 0;

  @state()
  private _trackWidth = 0;

  @state()
  _lowValuePercentStart = 0;
  @state()
  _highValuePercentEnd = 100;

  protected setValueLow(low: number) {
    // Clamp value to ensure it fits within its restrictions
    low = clamp(
      low,
      this.maxGap
        ? this._highInputValue - this.maxGap > this.min
          ? this._highInputValue - this.maxGap
          : this.min
        : this.min,
      this.minGap
        ? this._highInputValue - this.minGap
        : this._highInputValue - this.step,
    );
    this.setValue(low, this._highInputValue);
  }

  protected setValueHigh(high: number) {
    // Clamp value to ensure it fits within its restrictions
    high = clamp(
      high,
      this.minGap
        ? this._lowInputValue + this.minGap
        : this._lowInputValue + this.step,
      this.maxGap
        ? this.maxGap + this._lowInputValue < this.max
          ? this.maxGap + this._lowInputValue
          : this.max
        : this.max,
    );
    this.setValue(this._lowInputValue, high);
  }

  protected setValue(low: number, high: number, lockValueRange?: boolean) {
    if (lockValueRange) {
      // Get the length of the range
      const length = this.startPoint.high - this.startPoint.low;

      // Clamp values to make sure it keeps its length:
      low = clamp(low, this.min, this.max - length);
      high = clamp(high, this.min + length, this.max);
    }

    // Overwrite input value, to enforce the calculated value and avoid the native slider moving to a invalid position:
    this._inputLow.value = low.toString();
    this._inputHigh.value = high.toString();

    this.value = `${low},${high}`;
  }

  #transferValueToInternalValues() {
    const valueSplit = (this.value as string).split(',');
    let low = Number(valueSplit[0]) || 0;
    let high = Number(valueSplit[1]) || 0;

    // First secure that the high value are within range (low does not need as its being handled below)
    high = clamp(high, this._min, this._max);

    // Make sure it matches the steps:
    low = this._min + Math.round((low - this._min) / this._step) * this._step;
    high = this._min + Math.round((high - this._min) / this._step) * this._step;

    // Fit with gaps:
    this._lowInputValue = clamp(
      low,
      this._min,
      this._minGap ? high - this._minGap : high - this._step,
    );
    this._highInputValue = clamp(
      high,
      this._minGap
        ? this._lowInputValue + this._minGap
        : this._lowInputValue + this._step,
      Math.min(this._maxGap ? low + this._maxGap : this._max, this._max),
    );

    this._updateInnerColor();
    this.requestUpdate();
  }

  protected getFormElement(): HTMLInputElement {
    return this._currentFocus ? this._currentFocus : this._inputLow;
  }

  async focus() {
    await this.updateComplete;
    this.getFormElement().focus();
  }
  async blur() {
    await this.updateComplete;
    this.getFormElement().blur();
  }

  /** Elements */

  @query('#range-slider')
  private _outerTrack!: HTMLElement;

  @query('#inputLow')
  private _inputLow!: HTMLInputElement;

  @query('#inputHigh')
  private _inputHigh!: HTMLInputElement;

  @query('.color')
  private _innerColor!: HTMLElement;

  @query('#inner-color-thumb')
  private _innerColorThumb!: HTMLElement;

  /** Constructor and Validator */

  constructor() {
    super();
    // Keyboard
    this.addEventListener('keydown', this.#onKeyDown);
    // Mouse
    this.addEventListener('mousedown', this._onMouseDown);
    // Touch
    this.addEventListener('touchstart', this._onTouchStart);

    window.addEventListener('resize', () => {
      this._trackWidth = this._outerTrack?.offsetWidth;
    });
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (!this.value) {
      // Lack value. Defaulting to the min and max attributes
      this.value = `${this._min},${this._max}`;
    }
  }

  firstUpdated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    this._trackWidth = this._outerTrack.offsetWidth;
    this._runPropertiesChecks();
  }

  private _runPropertiesChecks() {
    // Note: We are checking if the attributes set makes any sense.

    const regex = new RegExp(/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/); // regex: Number Comma Number (optional: decimals and negatives)
    if (!regex.test(this.value as string))
      console.error(`Range slider (Value error occurred): Bad input`);

    if (this._highInputValue === this._lowInputValue) {
      console.error(
        `Range slider (Value error occurred): Low-end and high-end value should never be equal. Use <uui-slider></uui-slider> instead.`,
      );
    }

    if (this._lowInputValue > this._highInputValue) {
      console.error(
        `Range slider (Value error occurred): Low-end value should never be higher than high-end value.`,
      );
    }

    if (this._highInputValue > this._max || this._highInputValue < this._min) {
      this.setValueHigh(this._max);
      console.warn(
        `Conflict with the high-end value and max value. High-end value has been converted to the max value (${this._max})`,
      );
    }

    if (this._lowInputValue < this._min || this._lowInputValue > this._max) {
      this.setValueLow(this._min);
      console.warn(
        `Conflict with the low-end value and min value. Low-end value has been converted to the min value (${this._min})`,
      );
    }

    // Step vs value logic
    if (this._step <= 0) {
      this._step = 1;
      console.warn(
        `Property step needs a value higher than 0. Converted the step value to 1 (default)`,
      );
    }

    if (((this._max - this._min) / this._step) % 1 !== 0) {
      console.error(
        `Conflict with step value and the min and max values. May experience bad side effects`,
      );
    }

    if (this._minGap && this._minGap < this._step) {
      this._minGap = undefined;
      console.warn(
        `Conflict with min-gap and step value. The min-gap needs to be higher than the step value. Removed the min-gap property.`,
      );
    }

    // Gaps
    if (this._minGap && this._maxGap && this._minGap > this._maxGap) {
      this._minGap = undefined;
      this._maxGap = undefined;
      console.warn(
        `Conflict with min-gap and max-gap. Removed the min-gap and max-gap properties.`,
      );
    }

    if (this._minGap && this._max - this._min < this._minGap) {
      this._minGap = undefined;
      console.warn(
        `Conflict with the min-gap and the total range. Removed the min-gap.`,
      );
    }

    if (
      this._maxGap &&
      this._highInputValue - this._lowInputValue > this._maxGap
    ) {
      this.setValueHigh(this._lowInputValue + this._maxGap);
      console.warn(
        `Conflict with value and max-gap. High-end value has been converted to the highest possible value based on the low-end value and the max gap value (${this._highInputValue})`,
      );
    }

    if (
      this._minGap &&
      this._highInputValue - this._lowInputValue < this._minGap
    ) {
      const minGap = this._minGap;
      if (this._highInputValue - minGap < this._min) {
        this.setValueHigh(this._lowInputValue + minGap);
        console.warn(
          `Conflict with value and min gap. High-end value has been converted to the lowest possible value based on the low-end value and the min gap value (${this._highInputValue}).`,
        );
      } else {
        this.setValueLow(this._highInputValue - minGap);
        console.warn(
          `Conflict with value and min gap. Low-end value has been converted to the highest possible value based on the high-end value and the min gap value (${this._lowInputValue}).`,
        );
      }
    }
  }

  private _updateInnerColor() {
    const scopeLength = this._max - this._min;
    const scopedLow = this._lowInputValue - this._min;
    const scopedHigh = this._highInputValue - this._min;

    const leftPercent = (scopedLow / scopeLength) * 100;
    const rightPercent = 100 - (scopedHigh / scopeLength) * 100;

    this._lowValuePercentStart = clamp(leftPercent, 0, 100);
    this._highValuePercentEnd = clamp(rightPercent, 0, 100);
  }

  private _getClickedValue(pageX: number) {
    const outerTrackMargin = this._outerTrack.getBoundingClientRect().left;
    const mouseXPosition = pageX - outerTrackMargin - TRACK_PADDING;
    const clickPercent =
      mouseXPosition / (this._trackWidth - TRACK_PADDING * 2);

    const clickedValue = clickPercent * (this._max - this._min) + this._min;
    return Math.round(clickedValue / this._step) * this._step;
  }

  /** Events */

  #onKeyDown = (e: KeyboardEvent) => {
    if (e.key == 'Enter') {
      this.submit();
    }
  };

  /** Touch Event */
  private _onTouchStart = (e: TouchEvent) => {
    if (this.disabled) return;

    const target = e.composedPath()[0];
    if (target === this._outerTrack) return;
    //Clicked on the inner track.

    if (target === this._innerColor || target === this._innerColorThumb) {
      // If we clicked in the colored area

      window.addEventListener('touchend', this._onTouchEnd);
      window.addEventListener('touchcancel', this._onTouchEnd);
      window.addEventListener('touchmove', this._onTouchMove);

      this._movement = true;
      this._saveStartPoints(e.touches[0].pageX);
    } else {
      // Else move just 1 thumb
      const value = this._getClickedValue(e.touches[0].pageX);
      const diffLow = Math.abs(this._lowInputValue - value);
      const diffHigh = Math.abs(this._highInputValue - value);
      if (diffLow < diffHigh) {
        this.setValueLow(value);
      } else {
        this.setValueHigh(value);
      }
    }
  };

  private _onTouchMove = (e: TouchEvent) => {
    this._dragBothValuesByMousePos(e.touches[0].pageX);
  };

  private _onTouchEnd = () => {
    this._movement = false;
    this.onChanged();
    window.removeEventListener('touchend', this._onTouchEnd);
    window.removeEventListener('touchcancel', this._onTouchEnd);
    window.removeEventListener('touchmove', this._onTouchMove);
  };

  /** Mouse Event */
  private _onMouseDown = (e: MouseEvent) => {
    if (this.disabled) return;
    if (this.readonly) return;

    const target = e.composedPath()[0];
    if (target === this._outerTrack) return;
    //Clicked on the inner track.

    if (target === this._innerColor || target === this._innerColorThumb) {
      // If we clicked in the colored area
      window.addEventListener('mouseup', this._onMouseUp);
      window.addEventListener('mousemove', this._onMouseMove);

      this._movement = true;
      this._saveStartPoints(e.pageX);
    } else {
      // Else move just 1 thumb
      const value = this._getClickedValue(e.pageX);
      const diffLow = Math.abs(this._lowInputValue - value);
      const diffHigh = Math.abs(this._highInputValue - value);
      if (diffLow < diffHigh) {
        this.setValueLow(value);
      } else {
        this.setValueHigh(value);
      }
    }
  };

  private _onMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    this._dragBothValuesByMousePos(e.pageX);
  };

  private _onMouseUp = () => {
    this._movement = false;
    this.onChanged();
    window.removeEventListener('mouseup', this._onMouseUp);
    window.removeEventListener('mousemove', this._onMouseMove);
  };

  /** Drag both thumbs logics */
  private _saveStartPoints(pageX: number) {
    this.startPoint = {
      mouse: pageX,
      low: this._lowInputValue,
      high: this._highInputValue,
    };
  }

  private _dragBothValuesByMousePos(pageX: number) {
    const trackWidth = this._outerTrack.offsetWidth;

    const drag = pageX - this.startPoint.mouse;
    const trackDiff = this._max - this._min;

    const dragPercent = drag / (trackWidth + TRACK_PADDING * 2);
    const dragValue =
      Math.round((dragPercent * trackDiff) / this._step) * this._step;

    const newValueLow = this.startPoint.low + dragValue;
    const newValueHigh = this.startPoint.high + dragValue;

    this.setValue(newValueLow, newValueHigh, true);
    this.dispatchEvent(new UUIRangeSliderEvent(UUIRangeSliderEvent.INPUT));
  }

  /** Input Events */
  private _onLowInput(e: Event) {
    if (this.disabled) e.preventDefault();
    if (this.readonly) e.preventDefault();

    this._currentFocus = this._inputLow;
    const newValue = Number((e.target as HTMLInputElement).value);

    this.setValueLow(newValue);
    this.dispatchEvent(new UUIRangeSliderEvent(UUIRangeSliderEvent.INPUT));
  }

  private _onHighInput(e: Event) {
    if (this.disabled) e.preventDefault();
    if (this.readonly) e.preventDefault();

    this._currentFocus = this._inputHigh;
    const newValue = Number((e.target as HTMLInputElement).value);

    this.setValueHigh(newValue);
    this.dispatchEvent(new UUIRangeSliderEvent(UUIRangeSliderEvent.INPUT));
  }

  /** Change Events */
  private _onLowChange() {
    this.setValueLow(Number(this._inputLow.value));
    this.onChanged();
  }

  private _onHighChange() {
    this.setValueHigh(Number(this._inputHigh.value));
    this.onChanged();
  }

  protected onChanged() {
    this.pristine = false;
    this.dispatchEvent(new UUIRangeSliderEvent(UUIRangeSliderEvent.CHANGE));
  }

  /** Render */

  render() {
    return html`
      <div id="range-slider">
        ${this._renderNativeInputs()}
        <div id="inner-track">
          <div
            id="inner-color-thumb"
            class="${this._movement ? 'active' : ''}"
            style="left: ${this._lowValuePercentStart}%; right: ${this
              ._highValuePercentEnd}%">
            ${this._renderThumbValues()}
            <div class="${this._movement ? 'color active' : 'color'}"></div>
          </div>
          ${this._renderSteps()}
        </div>
      </div>
    `;
  }

  private _renderThumbValues() {
    return html`<div class="thumb-values">
      <span
        ><span
          >${this._lowInputValue.toFixed(CountDecimalPlaces(this._step))}</span
        ></span
      >
      <span
        ><span
          >${this._highInputValue.toFixed(CountDecimalPlaces(this._step))}</span
        ></span
      >
    </div>`;
  }

  private _renderSteps() {
    const stepAmount = (this._max - this._min) / this._step;
    const stepWidth = (this._trackWidth - TRACK_PADDING * 2) / stepAmount;

    if (stepWidth < STEP_MIN_WIDTH) return;
    if (stepAmount % 1 !== 0) return;

    let index = 0;
    const stepPositions = new Array(stepAmount + 1)
      .fill(stepWidth)
      .map(stepWidth => stepWidth * index++);

    return html`<div class="step-wrapper">
      <svg height="100%" width="100%">
        <rect x="9" y="9" height="${TRACK_HEIGHT}" rx="2" />
        ${this._renderStepCircles(stepPositions)}
      </svg>
      ${this._renderStepValues(stepAmount)}
    </div>`;
  }

  private _renderStepValues(stepAmount: number) {
    if (this.hideStepValues || stepAmount > 20) return;

    let index = 0;
    const stepValues = new Array(stepAmount + 1)
      .fill(this._step)
      .map(step =>
        (this._min + step * index++).toFixed(CountDecimalPlaces(this._step)),
      );

    return html`<div class="step-values">
      ${stepValues.map(value => html`<span><span>${value}</span></span>`)}
    </div>`;
  }

  private _renderStepCircles(stepPositionArray: Array<number>) {
    const trackValue = this._trackWidth / (this._max - this._min);

    return svg`${stepPositionArray.map(position => {
      const cx = position + TRACK_PADDING;
      const colorStart = this._lowInputValue - this._min;
      const colorEnd = this._highInputValue - this._min;

      if (cx / trackValue >= colorStart && cx / trackValue <= colorEnd) {
        return svg`<circle class="track-step filled" cx="${cx}" cy="${TRACK_HEIGHT * 2}" r="4.5" />`;
      } else {
        return svg`<circle class="track-step regular" cx="${cx}" cy="${TRACK_HEIGHT * 2}" r="4.5" />`;
      }
    })}`;
  }

  private _renderNativeInputs() {
    return html` <div class="native-wrapper">
      <input
        id="inputLow"
        class="${this._movement ? 'focus' : ''}"
        type="range"
        min=${this._min}
        max=${this._max}
        step=${this._step}
        .value=${this._lowInputValue.toString()}
        aria-label="${this.label} low-end value"
        ?disabled="${this.disabled || this.readonly}"
        @input=${this._onLowInput}
        @change=${this._onLowChange} />
      <input
        id="inputHigh"
        class="${this._movement ? 'focus' : ''}"
        type="range"
        min="${this._min}"
        max="${this._max}"
        step="${this._step}"
        .value=${this._highInputValue.toString()}
        aria-label="${this.label} high-end value"
        ?disabled="${this.disabled || this.readonly}"
        @input=${this._onHighInput}
        @change=${this._onHighChange} />
    </div>`;
  }

  /** Style */
  static styles = [
    css`
      :host {
        --color-interactive: var(--uui-color-selected);
        --color-hover: var(--uui-color-selected-emphasis);
        --color-focus: var(--uui-color-focus);
        min-height: 30px;
      }

      :host([error]) {
        --color-interactive: var(--uui-color-danger-standalone);
        --color-hover: var(--uui-color-danger);
      }

      #range-slider {
        min-height: 30px;
        box-sizing: border-box;
        position: relative;
        display: flex;
        align-items: center;
      }

      /** Track */

      #inner-track {
        user-select: none;
        background-color: var(--uui-color-border-standalone);
        position: absolute;
        height: 3px;
        left: ${TRACK_PADDING}px; /* Match TRACK_MARGIN */
        right: ${TRACK_PADDING}px; /* Match TRACK_MARGIN */
      }

      :host(:not([disabled]):hover) #inner-track,
      :host(:not([disabled]):active) #inner-track {
        background-color: var(--uui-color-border-emphasis);
      }

      #inner-color-thumb {
        margin: -9px 0 0;
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: ${THUMB_SIZE}px;
        cursor: grab;
        user-select: none;
        z-index: ${Z_INDEX.CENTER};
      }

      :host([disabled]) #inner-color-thumb,
      :host([readonly]) #inner-color-thumb {
        cursor: default;
      }

      /** Colored part of track */

      :host([disabled]) #range-slider #inner-color-thumb .color {
        background-color: var(--uui-palette-mine-grey) !important;
      }

      #inner-color-thumb:focus .color {
        background-color: var(--color-focus);
      }

      #inner-color-thumb:hover .color,
      #inner-color-thumb .color.active {
        background-color: var(--color-hover);
      }

      :host(:not([readonly])) #inner-color-thumb:hover .color {
        height: ${TRACK_HEIGHT * 2}px;
        background-color: var(--color-hover);
        transform: translateY(-${TRACK_HEIGHT / 2}px);
      }

      .color {
        user-select: none;
        position: absolute;
        inset-inline: 0;
        height: ${TRACK_HEIGHT}px;
        top: 50%;
        transform: translateY(0);
        background-color: var(--color-interactive);
        transition: height 60ms;
      }

      :host([error]) .color {
        background-color: var(--uui-color-danger-standalone);
      }
      :host([error]) #inner-color-thumb:hover ~ .color,
      :host([error]) #inner-color-thumb:focus ~ .color {
        background-color: var(--uui-color-danger-emphasis);
      }

      /** Steps */
      .step-wrapper {
        margin: 0 ${-1 * TRACK_PADDING}px;
        height: 11px;
        position: absolute;
        left: 0;
        right: 0;
        top: -10px;
      }

      /** Step circles */
      .track-step {
        fill: var(--uui-color-border);
      }

      :host(:not([disabled]):hover) #inner-track .track-step.regular,
      :host(:not([disabled]):active) #inner-track .track-step.regular {
        fill: var(--uui-color-border-emphasis);
      }

      :host .track-step.filled {
        fill: var(--color-interactive);
      }

      :host([error]) .track-step.filled {
        fill: var(--uui-color-danger-emphasis);
      }

      :host #inner-color-thumb.active ~ .step-wrapper .track-step.filled,
      :host #inner-color-thumb:hover ~ .step-wrapper .track-step.filled {
        fill: var(--color-hover);
      }

      :host([disabled]) #range-slider .track-step.filled {
        fill: var(--uui-palette-mine-grey) !important;
      }

      /** Step values */

      .step-values {
        box-sizing: border-box;
        margin: 0 ${TRACK_PADDING}px; /* Match TRACK_MARGIN */
        display: flex;
        justify-content: space-between;
        font-size: var(--uui-type-small-size);
      }

      .step-values > span {
        position: relative;
        color: var(--uui-color-disabled-contrast);
      }

      .step-values > span > span {
        position: absolute;
        transform: translateX(-50%);
      }

      /** Input */

      .native-wrapper {
        position: relative;
        width: 100%;
        inset-inline: 0px;
        margin: -22px 5px 0 1px;
      }

      input {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        pointer-events: none;
        position: absolute;
        cursor: pointer;
        background-color: transparent;
        inset-inline: 0;
        width: 100%;
        border-radius: 20px;
      }

      input:focus-within {
        outline: none;
      }

      /** Thumb values */
      .thumb-values {
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        color: var(--color-interactive);
        font-weight: bold;
        transition: 120ms opacity;
        opacity: 0;
      }

      .thumb-values > span {
        width: 0;
      }

      .thumb-values > span > span {
        bottom: 15px;
        position: absolute;
        transform: translateX(-50%);
      }

      :host([disabled]) .thumb-values {
        color: var(--uui-palette-mine-grey);
      }

      :host([readonly]) .thumb-values {
        opacity: 1;
      }

      #range-slider:hover .thumb-values {
        opacity: 1;
      }

      /** Native thumbs */
      /** Chrome */
      input::-webkit-slider-thumb {
        -webkit-appearance: none;
        pointer-events: all;
        cursor: grab;
        position: relative;
        z-index: ${Z_INDEX.TOP};
        width: ${THUMB_SIZE}px;
        height: ${THUMB_SIZE}px;
        border-radius: 24px;
        border: none;
        background-color: var(--color-interactive);
        overflow: visible;
        box-shadow:
          inset 0 0 0 2px var(--color-interactive),
          inset 0 0 0 4px var(--uui-color-surface);
      }

      :host([disabled]) input::-webkit-slider-thumb,
      :host([readonly]) input::-webkit-slider-thumb {
        cursor: default;
      }

      input:focus-within::-webkit-slider-thumb,
      input.focus::-webkit-slider-thumb {
        background-color: var(--color-focus);
        box-shadow:
          inset 0 0 0 2px var(--color-focus),
          inset 0 0 0 4px var(--uui-color-surface),
          0 0 0 2px var(--color-focus);
      }
      input::-webkit-slider-thumb:hover {
        background-color: var(--color-hover);
        box-shadow:
          inset 0 0 0 2px var(--color-hover),
          inset 0 0 0 4px var(--uui-color-surface);
      }

      :host([disabled]) #range-slider input::-webkit-slider-thumb {
        background-color: var(--uui-palette-mine-grey);
        box-shadow:
          inset 0 0 0 2px var(--uui-palette-mine-grey),
          inset 0 0 0 4px var(--uui-color-surface);
      }

      /** Mozilla */

      input::-moz-range-thumb {
        -moz-appearance: none;
        pointer-events: all;
        cursor: grab;
        position: relative;
        z-index: ${Z_INDEX.TOP};
        width: ${THUMB_SIZE}px;
        height: ${THUMB_SIZE}px;
        border-radius: 24px;
        border: none;
        background-color: var(--color-interactive);
        overflow: visible;
        box-shadow:
          inset 0 0 0 2px var(--color-interactive),
          inset 0 0 0 4px var(--uui-color-surface);
      }
      :host([disabled]) input::-moz-range-thumb,
      :host([readonly]) input::-moz-range-thumb {
        cursor: default;
      }

      input:focus-within::-moz-range-thumb,
      input.focus::-moz-range-thumb {
        background-color: var(--color-focus);
        box-shadow:
          inset 0 0 0 2px var(--color-focus),
          inset 0 0 0 4px var(--uui-color-surface),
          0 0 0 2px var(--color-focus);
      }
      input::-moz-range-thumb:hover {
        background-color: var(--color-hover);
        box-shadow:
          inset 0 0 0 2px var(--color-hover),
          inset 0 0 0 4px var(--uui-color-surface);
      }

      :host([disabled]) #range-slider input::-moz-range-thumb {
        background-color: var(--uui-palette-mine-grey);
        box-shadow:
          inset 0 0 0 2px var(--uui-palette-mine-grey),
          inset 0 0 0 4px var(--uui-color-surface);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-range-slider': UUIRangeSliderElement;
  }
}
