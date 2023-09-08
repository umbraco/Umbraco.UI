import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement, svg } from 'lit';
import { FormControlMixin } from '@umbraco-ui/uui-base/lib/mixins';
import { property, query, state } from 'lit/decorators.js';

import { UUIRangeSliderEvent } from './UUIRangeSliderEvent';

const Z_INDEX = {
  TOP: 3,
  CENTER: 2,
  BACK: 1,
};

const THUMB_SIZE = 18;
const TRACK_PADDING = 12;
const STEP_MIN_WIDTH = 24;

/**
 * @element uui-range-slider
 * @description - Range slider with two handles. Use uui-slider for a single handle.
 * @fires UUIRangeSliderEvent#input on input
 * @fires UUIRangeSliderEvent#change on change
 * @cssprop --color-interactive - overwrite the default color
 * @cssprop --color-focus - overwrite the default focus color
 */
@defineElement('uui-range-slider')
export class UUIRangeSliderElement extends FormControlMixin(LitElement) {
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
  step = 1;

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
    super.value = newVal;
  }

  @state()
  private _currentFocus?: HTMLInputElement;

  @state()
  private _movement = false;

  @state()
  private startPoint = {
    mouse: 0,
    low: 0,
    high: 0,
  };

  @state()
  private _lowInputValue = '0';

  @state()
  private _highInputValue = '100';

  @state()
  private _trackWidth = 0;

  protected getValueLow() {
    return Number((this.value as string).split(',')[0]);
  }

  protected getValueHigh() {
    return Number((this.value as string).split(',')[1]);
  }

  protected setValueLow(value: number | string) {
    const valueFix = Math.round(Number(value) * 100) / 100;
    this._lowInputValue = String(valueFix);
    this._inputLow.value = String(valueFix);
    this.value = `${valueFix},${this._highInputValue}`;
  }

  protected setValueHigh(value: number | string) {
    const valueFix = Math.round(Number(value) * 100) / 100;
    this._highInputValue = String(valueFix);
    this._inputHigh.value = String(valueFix);
    this.value = `${this._lowInputValue},${valueFix}`;
  }

  protected getFormElement(): HTMLInputElement {
    return this._currentFocus ? this._currentFocus : this._inputLow;
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
    this.addEventListener('keypress', this._onKeypress);
    // Mouse
    this.addEventListener('mousedown', this._onMouseDown);
    // Touch
    this.addEventListener('touchstart', this._onTouchStart);
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (!this.value) {
      // Lack value. Defaulting to the min and max attributes
      this.value = `${this.min},${this.max}`;
    }
    //Setting thumbs based on value
    this._lowInputValue = String(this.getValueLow());
    this._highInputValue = String(this.getValueHigh());

    window.addEventListener('resize', () => {
      this._trackWidth = this._outerTrack.offsetWidth;
    });
  }

  firstUpdated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    this._trackWidth = this._outerTrack.offsetWidth;
    this._runPropertiesChecks();
    this._updateInnerColor();
  }

  private _runPropertiesChecks() {
    // Note: We are checking if the attributes set makes any sense.

    const regex = new RegExp(/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/); // regex: Number Comma Number (optional: decimals and negatives)
    if (!regex.test(this.value as string))
      console.error(`Range slider (Value error occurred): Bad input`);

    if (this.getValueHigh() === this.getValueLow()) {
      console.error(
        `Range slider (Value error occurred): Low-end and high-end value should never be equal. Use <uui-slider></uui-slider> instead.`
      );
    }

    if (this.getValueLow() > this.getValueHigh()) {
      console.error(
        `Range slider (Value error occurred): Low-end value should never be higher than high-end value.`
      );
    }

    if (this.getValueHigh() > this.max || this.getValueHigh() < this.min) {
      this.setValueHigh(this.max);
      console.warn(
        `Conflict with the high-end value and max value. High-end value has been converted to the max value (${this.max})`
      );
    }

    if (this.getValueLow() < this.min || this.getValueLow() > this.max) {
      this.setValueLow(this.min);
      console.warn(
        `Conflict with the low-end value and min value. Low-end value has been converted to the min value (${this.min})`
      );
    }

    // Step vs value logic
    if (this.step <= 0) {
      this.step = 1;
      console.warn(
        `Property step needs a value higher than 0. Converted the step value to 1 (default)`
      );
    }

    if (((this.max - this.min) / this.step) % 1 !== 0) {
      console.error(
        `Conflict with step value and the min and max values. May experience bad side effects`
      );
    }

    if (this.minGap && this.minGap < this.step) {
      this.minGap = undefined;
      console.warn(
        `Conflict with min-gap and step value. The min-gap needs to be higher than the step value. Removed the min-gap property.`
      );
    }

    // Gaps
    if (this.minGap && this.maxGap && this.minGap > this.maxGap) {
      this.minGap = undefined;
      this.maxGap = undefined;
      console.warn(
        `Conflict with min-gap and max-gap. Removed the min-gap and max-gap properties.`
      );
    }

    if (this.minGap && this.max - this.min < this.minGap) {
      this.minGap = undefined;
      console.warn(
        `Conflict with the min-gap and the total range. Removed the min-gap.`
      );
    }

    if (this.maxGap && this.getValueHigh() - this.getValueLow() > this.maxGap) {
      this.setValueHigh(this.getValueLow() + this.maxGap);
      console.warn(
        `Conflict with value and max-gap. High-end value has been converted to the highest possible value based on the low-end value and the max gap value (${this.getValueHigh()})`
      );
    }

    if (this.minGap && this.getValueHigh() - this.getValueLow() < this.minGap) {
      const minGap = this.minGap;
      if (this.getValueHigh() - minGap < this.min) {
        this.setValueHigh(this.getValueLow() + minGap);
        console.warn(
          `Conflict with value and min gap. High-end value has been converted to the lowest possible value based on the low-end value and the min gap value (${this.getValueHigh()}).`
        );
      } else {
        this.setValueLow(this.getValueHigh() - minGap);
        console.warn(
          `Conflict with value and min gap. Low-end value has been converted to the highest possible value based on the high-end value and the min gap value (${this.getValueLow()}).`
        );
      }
    }
  }

  private _updateInnerColor() {
    const low = this.getValueLow();
    const high = this.getValueHigh();

    const percentStart = ((low - this.min) / (this.max - this.min)) * 100;
    const percentEnd = ((high - this.min) / (this.max - this.min)) * 100;

    this._innerColorThumb.style.left = `${percentStart}%`;
    this._innerColorThumb.style.right = `${100 - percentEnd}%`;
  }

  private _getClickedValue(pageX: number) {
    const outerTrackMargin = this._outerTrack.getBoundingClientRect().left;
    const mouseXPosition = pageX - outerTrackMargin - TRACK_PADDING;
    const clickPercent =
      mouseXPosition / (this._trackWidth - TRACK_PADDING * 2);

    const clickedValue = clickPercent * (this.max - this.min) + this.min;
    return Math.round(clickedValue / this.step) * this.step;
  }

  /** Events */

  private _onKeypress = (e: KeyboardEvent) => {
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
      const diffLow = Math.abs(this.getValueLow() - value);
      const diffHigh = Math.abs(this.getValueHigh() - value);
      if (diffLow < diffHigh) {
        this.setValueLow(value);
      } else {
        this.setValueHigh(value);
      }
      this._updateInnerColor();
    }
  };

  private _onTouchMove = (e: TouchEvent) => {
    this._dragBothValuesByMousePos(e.touches[0].pageX);
  };

  private _onTouchEnd = () => {
    this._onBothChange();
    window.removeEventListener('touchend', this._onTouchEnd);
    window.removeEventListener('touchcancel', this._onTouchEnd);
    window.removeEventListener('touchmove', this._onTouchMove);
  };

  /** Mouse Event */
  private _onMouseDown = (e: MouseEvent) => {
    if (this.disabled) return;

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
      const diffLow = Math.abs(this.getValueLow() - value);
      const diffHigh = Math.abs(this.getValueHigh() - value);
      if (diffLow < diffHigh) {
        this.setValueLow(value);
      } else {
        this.setValueHigh(value);
      }
      this._updateInnerColor();
    }
  };

  private _onMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    this._dragBothValuesByMousePos(e.pageX);
  };

  private _onMouseUp = () => {
    this._onBothChange();
    window.removeEventListener('mouseup', this._onMouseUp);
    window.removeEventListener('mousemove', this._onMouseMove);
  };

  /** Drag both thumbs logics */
  private _saveStartPoints(pageX: number) {
    this.startPoint = {
      mouse: pageX,
      low: Number(this._inputLow.value),
      high: Number(this._inputHigh.value),
    };
  }

  private _dragBothValuesByMousePos(pageX: number) {
    const trackWidth = this._outerTrack.offsetWidth;

    const drag = pageX - this.startPoint.mouse;
    const trackDiff = this.max - this.min;

    const dragPercent = drag / (trackWidth + TRACK_PADDING * 2);
    const dragValue =
      Math.round((dragPercent * trackDiff) / this.step) * this.step;

    const newValueLow = this.startPoint.low + dragValue;
    const newValueHigh = this.startPoint.high + dragValue;

    if (newValueLow >= this.min && newValueHigh <= this.max) {
      this.setValueHigh(newValueHigh);
      this.setValueLow(newValueLow);
      this._updateInnerColor();
      this.dispatchEvent(new UUIRangeSliderEvent(UUIRangeSliderEvent.INPUT));
    }
  }

  /** Input Events */
  private _onLowInput(e: Event) {
    if (this.disabled) e.preventDefault();
    this._currentFocus = this._inputLow;

    const currentLow = Number(this._inputLow.value);
    const currentHigh = Number(this._inputHigh.value);
    const minGap = this.minGap || this.step;

    if (
      currentLow > currentHigh - minGap ||
      (this.maxGap && currentLow < currentHigh - this.maxGap)
    ) {
      this.setValueLow(this._lowInputValue);
    } else {
      this.setValueLow(currentLow);
    }

    this._updateInnerColor();
    this.dispatchEvent(new UUIRangeSliderEvent(UUIRangeSliderEvent.INPUT));
  }

  private _onHighInput(e: Event) {
    if (this.disabled) e.preventDefault();
    this._currentFocus = this._inputHigh;

    const currentLow = Number(this._inputLow.value);
    const currentHigh = Number(this._inputHigh.value);
    const minGap = this.minGap || this.step;

    if (
      currentHigh < currentLow + minGap ||
      (this.maxGap && currentHigh > currentLow + this.maxGap)
    ) {
      this.setValueHigh(this._highInputValue);
    } else {
      this.setValueHigh(currentHigh);
    }

    this._updateInnerColor();
    this.dispatchEvent(new UUIRangeSliderEvent(UUIRangeSliderEvent.INPUT));
  }

  /** Change Events */
  private _onLowChange() {
    this.setValueLow(this._inputLow.value);
    this.onChanged();
  }

  private _onHighChange() {
    this.setValueHigh(this._inputHigh.value);
    this.onChanged();
  }

  private _onBothChange() {
    this._movement = false;
    this.setValueLow(this._inputLow.value);
    this.setValueHigh(this._inputHigh.value);
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
          <div id="inner-color-thumb" class="${this._movement ? 'active' : ''}">
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
      <span class="valueLow"><span>${this._lowInputValue}</span></span>
      <span class="valueHigh"><span>${this._highInputValue}</span></span>
    </div>`;
  }

  private _renderSteps() {
    const stepAmount = (this.max - this.min) / this.step;
    const stepWidth = (this._trackWidth - TRACK_PADDING * 2) / stepAmount;

    if (stepWidth < STEP_MIN_WIDTH) return;
    if (stepAmount % 1 !== 0) return;

    let index = 0;
    const stepPositions = new Array(stepAmount + 1)
      .fill(stepWidth)
      .map(stepWidth => stepWidth * index++);

    return html`<div class="step-wrapper">
      <svg height="100%" width="100%">
        <rect x="9" y="9" height="3" rx="2" />
        ${this._renderStepCircles(stepPositions)}
      </svg>
      ${this._renderStepValues(stepAmount)}
    </div>`;
  }

  private _renderStepValues(stepAmount: number) {
    if (this.hideStepValues || stepAmount > 20) return;

    let index = 0;
    const stepValues = new Array(stepAmount + 1)
      .fill(this.step)
      .map(step => this.min + step * index++);

    return html`<div class="step-values">
      ${stepValues.map(value => html`<span><span>${value}</span></span>`)}
    </div>`;
  }

  private _renderStepCircles(stepPositionArray: Array<number>) {
    const trackValue = this._trackWidth / (this.max - this.min);

    return svg`${stepPositionArray.map(position => {
      const cx = position + TRACK_PADDING;
      const colorStart = this.getValueLow() - this.min;
      const colorEnd = this.getValueHigh() - this.min;

      if (cx / trackValue >= colorStart && cx / trackValue <= colorEnd) {
        return svg`<circle class="track-step filled" cx="${cx}" cy="50%" r="4.5" />`;
      } else {
        return svg`<circle class="track-step regular" cx="${cx}" cy="50%" r="4.5" />`;
      }
    })}`;
  }

  private _renderNativeInputs() {
    return html` <div class="native-wrapper">
      <input
        id="inputLow"
        class="${this._movement ? 'focus' : ''}"
        type="range"
        min=${this.min}
        max=${this.max}
        step=${this.step}
        .value=${this._lowInputValue}
        aria-label="${this.label} low-end value"
        ?disabled="${this.disabled}"
        @input=${this._onLowInput}
        @change=${this._onLowChange} />
      <input
        id="inputHigh"
        class="${this._movement ? 'focus' : ''}"
        type="range"
        min="${this.min}"
        max="${this.max}"
        step="${this.step}"
        .value=${this._highInputValue}
        aria-label="${this.label} high-end value"
        ?disabled="${this.disabled}"
        @input=${this._onHighInput}
        @change=${this._onHighChange} />
    </div>`;
  }

  /** Style */
  static styles = [
    css`
      :host {
        --color-interactive: var(--uui-color-interactive-emphasis);
        --color-focus: var(--uui-color-focus);
        min-height: 30px;
      }

      :host([error]) {
        --color-interactive: var(--uui-color-danger-standalone);
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

      #inner-color-thumb {
        margin: -8px 0 0;
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 16px;
        cursor: pointer;
        user-select: none;
        z-index: ${Z_INDEX.CENTER};
      }

      :host([disabled]) #inner-color-thumb {
        cursor: default;
      }

      /** Colored part of track */

      :host([disabled]) #range-slider #inner-color-thumb .color {
        background-color: var(--uui-palette-mine-grey) !important;
      }

      #inner-color-thumb:hover .color,
      #inner-color-thumb:focus .color,
      #inner-color-thumb .active {
        background-color: var(--color-focus);
      }

      .color {
        user-select: none;
        position: absolute;
        inset-inline: 0;
        height: 3px;
        transform: translateY(50%);
        background-color: var(--color-interactive);
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
        height: 10px;
        transform: translateY(-100%);
      }

      /** Step circles */
      .track-step {
        fill: var(--uui-color-border);
      }

      :host(:not([disabled])) #inner-track:hover .track-step.regular {
        fill: var(--uui-color-divider-emphasis);
      }

      :host .track-step.filled {
        fill: var(--uui-color-interactive-emphasis);
      }

      :host([error]) .track-step.filled {
        fill: var(--uui-color-danger-emphasis);
      }

      :host #inner-color-thumb.active ~ .step-wrapper .track-step.filled,
      :host #inner-color-thumb:hover ~ .step-wrapper .track-step.filled {
        fill: var(--uui-color-focus);
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

      #range-slider:hover .thumb-values {
        opacity: 1;
      }

      /** Native thumbs */
      /** Chrome */
      input::-webkit-slider-thumb {
        -webkit-appearance: none;
        pointer-events: all;
        cursor: pointer;
        position: relative;
        z-index: ${Z_INDEX.TOP};
        width: ${THUMB_SIZE}px;
        height: ${THUMB_SIZE}px;
        border-radius: 24px;
        border: none;
        background-color: var(--color-interactive);
        overflow: visible;
        box-shadow: inset 0 0 0 2px var(--color-interactive),
          inset 0 0 0 4px var(--uui-color-surface);
      }
      :host([disabled]) input::-webkit-slider-thumb {
        cursor: default;
      }

      input:focus-within::-webkit-slider-thumb {
        box-shadow: inset 0 0 0 2px var(--color-interactive),
          inset 0 0 0 4px var(--uui-color-surface), 0 0 0 2px var(--color-focus);
      }

      input.focus::-webkit-slider-thumb {
        box-shadow: inset 0 0 0 2px var(--color-interactive),
          inset 0 0 0 4px var(--uui-color-surface), 0 0 0 2px var(--color-focus);
      }

      input::-webkit-slider-thumb:hover {
        box-shadow: inset 0 0 0 2px var(--color-interactive),
          inset 0 0 0 4px var(--uui-color-surface), 0 0 0 2px var(--color-focus);
      }

      :host([disabled]) #range-slider input::-webkit-slider-thumb {
        background-color: var(--uui-palette-mine-grey);
        box-shadow: inset 0 0 0 2px var(--uui-palette-mine-grey),
          inset 0 0 0 4px var(--uui-color-surface);
      }

      /** Mozilla */

      input::-moz-range-thumb {
        -moz-appearance: none;
        pointer-events: all;
        cursor: pointer;
        position: relative;
        z-index: ${Z_INDEX.TOP};
        width: ${THUMB_SIZE}px;
        height: ${THUMB_SIZE}px;
        border-radius: 24px;
        border: none;
        background-color: var(--color-interactive);
        overflow: visible;
        box-shadow: inset 0 0 0 2px var(--color-interactive),
          inset 0 0 0 4px var(--uui-color-surface);
      }
      :host([disabled]) input::-moz-range-thumb {
        cursor: default;
      }

      input:focus-within::-moz-range-thumb {
        box-shadow: inset 0 0 0 2px var(--color-interactive),
          inset 0 0 0 4px var(--uui-color-surface), 0 0 0 2px var(--color-focus);
      }

      input.focus::-moz-range-thumb {
        box-shadow: inset 0 0 0 2px var(--color-interactive),
          inset 0 0 0 4px var(--uui-color-surface), 0 0 0 2px var(--color-focus);
      }

      input::-moz-range-thumb:hover {
        box-shadow: inset 0 0 0 2px var(--color-interactive),
          inset 0 0 0 4px var(--uui-color-surface), 0 0 0 2px var(--color-focus);
      }

      :host([disabled]) #range-slider input::-moz-range-thumb {
        background-color: var(--uui-palette-mine-grey);
        box-shadow: inset 0 0 0 2px var(--uui-palette-mine-grey),
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
