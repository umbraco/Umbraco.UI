import { UUIHorizontalPulseKeyframes } from '@umbraco-ui/uui-base/lib/animations';

import { FormControlMixin } from '@umbraco-ui/uui-base/lib/mixins';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement, svg } from 'lit';
import { property, query, state } from 'lit/decorators.js';

const TRACK_PADDING = 12;
const STEP_MIN_WIDTH = 24;

/**
 * @element uui-range-slider
 * @description - Range slider with two handles. Use uui-slider for a single handle.
 */
@defineElement('uui-range-slider')
export class UUIRangeSliderElement extends FormControlMixin(LitElement) {
  protected getFormElement(): HTMLElement | undefined {
    throw new Error('Method not implemented.');
  }
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
        margin: 0 ${TRACK_PADDING}px;
        z-index: -1;
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

      .thumb:focus,
      .thumb:active {
        outline: calc(2px * var(--uui-show-focus-outline, 1)) solid
          var(--uui-color-focus);
      }

      .thumb:not([disabled]):focus .thumb:not([disabled]):active {
        outline: 1px solid red;
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
        border-color: var(--uui-color-disabled-standalone);
      }
      :host([disabled]) .thumb:after {
        background-color: var(--uui-color-disabled);
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
      }

      input[type='range']::-webkit-slider-thumb {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }
    `,
  ];

  /**
   * Disables the input.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Label to be used for aria-label and eventually as visual label. Adds "-minimum" and "-maximum" ending for the two values.
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

  private _gap = 1;
  /**
   * Minimum value gap between the first and last value
   * @type {number}
   * @attr gap
   * @default 1
   */
  @property({ type: Number, attribute: 'gap' })
  set gap(newGap) {
    const oldGap = this._gap;
    if (newGap < this.step) {
      this._gap = this.step;
    } else {
      this._gap = newGap;
    }
    this.requestUpdate('gap', oldGap);
  }
  get gap() {
    return this._gap;
  }

  /**
   * This is the minimum value of the range input.
   * @type {number}
   * @attr min
   * @default 0
   */
  @property({ type: Number, attribute: 'min' })
  minAttr = 0;

  /**
   * This is the maximum value of the range input.
   * @type {number}
   * @attr max
   * @default 100
   */
  @property({ type: Number, attribute: 'max' })
  maxAttr = 100;

  private _minValue = -50;
  /**
   * Sets the first value of the range input.
   * @type {number}
   * @attr minValue
   * @default 100
   */
  @property({ type: Number, reflect: true })
  set minValue(newVal) {
    const oldVal = this._minValue;
    newVal < this.minAttr && this.disabled == false
      ? (this._minValue = this.minAttr)
      : (this._minValue = newVal);
    this.requestUpdate('minValue', oldVal);
  }
  get minValue() {
    return this._minValue;
  }

  private _maxValue = 50;
  /**
   * Sets the last value of the range input.
   * @type {number}
   * @attr maxValue
   * @default 100
   */
  @property({ type: Number, reflect: true })
  set maxValue(newVal) {
    const oldVal = this._maxValue;
    newVal > this.maxAttr && this.disabled == false
      ? (this._maxValue = this.maxAttr)
      : (this._maxValue = newVal);
    this.requestUpdate('maxValue', oldVal);
  }
  get maxValue() {
    return this._maxValue;
  }

  @property({ type: Number })
  private _trackWidth = 0;

  @state()
  private _moveBothHandles = {
    mouseStart: 0,
    minStart: 0,
    maxStart: 0,
    moving: false,
  };

  @state()
  private _moveMinHandle = false;

  @state()
  private _moveMaxHandle = false;

  @state()
  private _inFocus = false;

  @query('#min-slider')
  private _minInput!: HTMLInputElement;

  @query('#max-slider')
  private _maxInput!: HTMLInputElement;

  @query('.slider-track')
  private _sliderTrack!: HTMLElement;

  @query('.inner-track')
  private _innerSliderTrack!: HTMLElement;

  private _onMinInput() {
    const min = parseInt(this._minInput.value);
    const max = parseInt(this._maxInput.value) - this.gap;
    if (min >= max) {
      this._minInput.value = String(max);
      this.minValue = max;
    } else {
      this.minValue = parseInt(this._minInput.value);
    }
  }

  private _onMaxInput() {
    const max = parseInt(this._maxInput.value);
    const min = parseInt(this._minInput.value) + this.gap;
    if (max <= min) {
      this._maxInput.value = String(min);
      this.maxValue = min;
    } else {
      this.maxValue = parseInt(this._maxInput.value);
    }
  }

  private _onChange(e: Event) {
    e.stopPropagation();
    this.pristine = false;
  }

  // keyboard

  private _keyDownMin(e: KeyboardEvent) {
    if (this.disabled == true) return;
    if (e.key === 'ArrowLeft' && this.minValue > this.minAttr) {
      this.minValue = this.minValue - this.step;
    } else if (
      e.key === 'ArrowRight' &&
      this.minValue < this.maxValue - this.gap
    ) {
      this.minValue = this.minValue + this.step;
    }
  }

  private _keyDownMax(e: KeyboardEvent) {
    if (this.disabled == true) return;
    if (e.key === 'ArrowLeft' && this.maxValue > this.minValue + this.gap) {
      this.maxValue = this.maxValue - this.step;
    } else if (e.key === 'ArrowRight' && this.maxValue < this.maxAttr) {
      this.maxValue = this.maxValue + this.step;
    }
  }

  // Mouse

  private _moveMaxThumb(e: MouseEvent) {
    e.stopImmediatePropagation();
    if (this.disabled == false) {
      this._moveMaxHandle = true;
    }
  }

  private _moveMinThumb(e: MouseEvent) {
    e.stopImmediatePropagation();
    if (this.disabled == false) {
      this._moveMinHandle = true;
    }
  }

  private _stopMove() {
    this._moveMinHandle = false;
    this._moveMaxHandle = false;
    this._moveBothHandles.mouseStart = 0;
    this._moveBothHandles.moving = false;
  }

  private _clickedValue(mouseXPosition: number) {
    const clickPercent =
      mouseXPosition / (this._trackWidth + TRACK_PADDING * 2);
    const trackDiff = this.maxAttr - this.minAttr;
    const clickedValue = clickPercent * trackDiff + this.minAttr;
    const newValue = Math.round(clickedValue / this.step) * this.step;
    const value = {
      new: newValue,
      click: clickedValue,
    };
    return value;
  }

  private _onMouseDown(e: MouseEvent) {
    e.stopImmediatePropagation();
    if (this.disabled) return;
    const value = this._clickedValue(e.offsetX);
    if (value.click > this.minValue && value.click < this.maxValue) {
      this._moveBothHandles.mouseStart = e.offsetX;
      this._moveBothHandles.moving = true;
      this._moveBothHandles.minStart = this.minValue;
      this._moveBothHandles.maxStart = this.maxValue;
    } else if (value.new <= this.minValue) {
      this.minValue = value.new;
      this._moveMinHandle = true;
    } else if (value.new >= this.maxValue) {
      this.maxValue = value.new;
      this._moveMaxHandle = true;
    } else {
      console.log(value, 'something went wrong');
    }
  }

  private _onMove(e: MouseEvent) {
    if (e.buttons == 1 && !this.disabled) {
      const value = this._clickedValue(e.offsetX);
      if (this._moveMaxHandle && value.new >= this.minValue + this.gap) {
        this.maxValue = value.new;
      } else if (this._moveMinHandle && value.new <= this.maxValue - this.gap) {
        this.minValue = value.new;
      } else if (this._moveBothHandles.moving) {
        this._onMoveBoth(e.offsetX);
      }
    }
  }

  private _onMoveBoth(mousePosition: number) {
    const drag = mousePosition - this._moveBothHandles.mouseStart;
    const trackDiff = this.maxAttr - this.minAttr;

    const dragPercent = drag / (this._trackWidth + TRACK_PADDING * 2);
    const dragValue =
      Math.round((dragPercent * trackDiff) / this.step) * this.step;

    const newMin = this._moveBothHandles.minStart + dragValue;
    const newMax = this._moveBothHandles.maxStart + dragValue;

    if (
      this.minValue !== newMin &&
      newMin >= this.minAttr &&
      newMax <= this.maxAttr
    ) {
      this.minValue = newMin;
      this.maxValue = newMax;
    }
  }

  // render stuff

  private _fillColor() {
    const percentStart =
      ((this.minValue - this.minAttr) / (this.maxAttr - this.minAttr)) * 100;
    const percentEnd =
      ((this.maxValue - this.minAttr) / (this.maxAttr - this.minAttr)) * 100;
    if (this._inFocus) {
      this._innerSliderTrack.style.background = `linear-gradient(to right, #a1a1a1 calc(-9px + ${percentStart}%), var(--uui-color-selected) ${percentStart}% , var(--uui-color-selected) ${percentEnd}%, #a1a1a1 calc(9px + ${percentEnd}%))`;
    } else {
      this._innerSliderTrack.style.background = `linear-gradient(to right, var(--uui-color-border-standalone) ${percentStart}%, var(--uui-color-selected) ${percentStart}% , var(--uui-color-selected) ${percentEnd}%, var(--uui-color-border-standalone) ${percentEnd}%)`;
    }
  }

  constructor() {
    super();
    this.addEventListener('mouseenter', () => {
      this._inFocus = true;
    });
    this.addEventListener('mouseleave', () => {
      this._inFocus = false;
    });
    this.addEventListener('mousedown', e => {
      this._onMouseDown(e);
    });
    window.addEventListener('mousemove', e => {
      this._onMove(e);
    });
    window.addEventListener('mouseup', () => {
      this._stopMove();
    });
  }

  updated() {
    this._trackWidth = this._sliderTrack.offsetWidth;
    this._fillColor();
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', () => {
      this._trackWidth = this._sliderTrack.offsetWidth;
    });
  }

  private _sliderMinThumbPosition() {
    const ratio =
      (parseFloat((this.minValue || '0') as string) - this.minAttr) /
      (this.maxAttr - this.minAttr);
    const valueMinPercent = `${Math.floor(ratio * 100000) / 1000}%`;
    return valueMinPercent;
  }

  private _sliderMaxThumbPosition() {
    const ratio =
      (parseFloat((this.maxValue || '0') as string) - this.minAttr) /
      (this.maxAttr - this.minAttr);
    const valueMaxPercent = `${Math.floor(ratio * 100000) / 1000}%`;
    return valueMaxPercent;
  }

  renderSteps() {
    const stepAmount = (this.maxAttr - this.minAttr) / this.step;
    const stepWidth = (this._trackWidth - TRACK_PADDING * 2) / stepAmount;

    const trackDiff = this.maxAttr - this.minAttr;
    const trackValue = this._trackWidth / trackDiff;

    if (stepWidth >= STEP_MIN_WIDTH) {
      let i = 0;
      const steps = [];
      for (i; i <= stepAmount; i++) {
        steps.push(i * stepWidth);
      }

      return svg`
        ${steps.map(position => {
          const x = position + TRACK_PADDING;
          if (
            x / trackValue > this.minValue - this.minAttr &&
            x / trackValue < this.maxValue - this.minAttr
          ) {
            return svg`<circle class="track-step filled" cx="${x}" cy="50%" r="4.5" />`;
          } else {
            return svg`<circle class="track-step" cx="${x}" cy="50%" r="4.5" />`;
          }
        })}`;
    } else {
      return svg``;
    }
  }

  renderStepValues(hide: boolean) {
    const stepAmount = (this.maxAttr - this.minAttr) / this.step;
    const stepWidth = (this._trackWidth - TRACK_PADDING * 2) / stepAmount;

    if (stepWidth >= STEP_MIN_WIDTH && stepAmount <= 20 && !hide) {
      let i = 0;
      const values = [];
      for (i; i <= stepAmount; i++) {
        values.push(i * this.step + this.minAttr);
      }
      return html` ${values.map(value => {
        return html`<span><span>${value}</span></span>`;
      })}`;
    } else {
      return html``;
    }
  }

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
          <div class="inner-track"></div>
          <div id="thumb-wrapper">
            <div
              tabindex="0"
              aria-label="${this.label}-minimum"
              class="thumb thumb-min"
              style="left: ${this._sliderMinThumbPosition()}"
              @mousedown="${this._moveMinThumb}"
              @keydown="${this._keyDownMin}">
              <div class="value value-min">${this.minValue}</div>
            </div>
            <div
              tabindex="0"
              aria-label="${this.label}-maximum"
              class="thumb thumb-max"
              style="left: ${this._sliderMaxThumbPosition()}"
              @mousedown="${this._moveMaxThumb}"
              @keydown="${this._keyDownMax}">
              <div class="value value-max">${this.maxValue}</div>
            </div>
          </div>
        </div>
        <div id="step-values">
          ${this.renderStepValues(this.hideStepValues)}
        </div>
      </div>
      <div id="input-wrapper">
        <input
          type="range"
          id="min-slider"
          min="${this.minAttr}"
          max="${this.maxAttr}"
          step="${this.step}"
          ?disabled="${this.disabled}"
          .value="${String(this.minValue)}"
          aria-label="${this.label}-minimum"
          @input="${this._onMinInput}"
          @change="${this._onChange}" />
        <input
          type="range"
          id="max-slider"
          min="${this.minAttr}"
          max="${this.maxAttr}"
          step="${this.step}"
          ?disabled="${this.disabled}"
          .value="${String(this.maxValue)}"
          aria-label="${this.label}-maximum"
          @input="${this._onMaxInput}"
          @change="${this._onChange}" />
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-range-slider': UUIRangeSliderElement;
  }
}
