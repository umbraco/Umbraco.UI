import { UUIHorizontalPulseKeyframes } from '@umbraco-ui/uui-base/lib/animations';
import { UUIFormControlMixin } from '@umbraco-ui/uui-base/lib/mixins';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement, nothing, svg } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import { nativeInputStyles } from './native-input.styles';
import { UUISliderEvent } from './UUISliderEvent';

const TRACK_PADDING = 12;
const STEP_MIN_WIDTH = 24;

const RenderTrackSteps = (steps: number[], stepWidth: number) => {
  return svg`
  ${steps.map(el => {
    if (stepWidth >= STEP_MIN_WIDTH) {
      const x = Math.round(TRACK_PADDING + stepWidth * steps.indexOf(el));
      return svg`<circle class="track-step" cx="${x}" cy="50%" r="4.5" />`;
    }
    return svg``;
  })}
`;
};

const RenderStepValues = (
  steps: number[],
  stepWidth: number,
  hide: boolean,
) => {
  if (hide) return nothing;

  return html`<div id="step-values">
    ${steps.map(
      el =>
        html` <span
          ><span>
            ${steps.length <= 20 && stepWidth >= STEP_MIN_WIDTH
              ? el.toFixed(0)
              : nothing}
          </span></span
        >`,
    )}
  </div>`;
};

const GenerateStepArray = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

/**
 * @element uui-slider
 * @description - Native `<input type="range">` wrapper.
 * @fires UUISliderEvent#input on input
 * @extends UUIFormControlMixin
 */
@defineElement('uui-slider')
export class UUISliderElement extends UUIFormControlMixin(LitElement, '') {
  /**
   * This is a static class field indicating that the element is can be used inside a native form and participate in its events. It may require a polyfill, check support here https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals.  Read more about form controls here https://web.dev/more-capable-form-controls/
   * @type {boolean}
   */
  static readonly formAssociated = true;

  #stepDecimalPlaces = 0;

  /**
   * Hides the numbers representing the value of each steps. Dots will still be visible
   * @type {boolean}
   * @attr 'hide-step-values'
   * @default false
   */
  @property({ type: Boolean, attribute: 'hide-step-values' })
  hideStepValues = false;

  /**
   * Hides the value label on the thumb.
   * @type {boolean}
   * @attr 'hide-value-label'
   * @default false
   */
  @property({ type: Boolean, attribute: 'hide-value-label' })
  hideValueLabel = false;

  /**
   * This is a minimum value of the input.
   * @type {number}
   * @attr
   * @default 0
   */
  @property({ type: Number })
  min = 0;

  /**
   * This is a maximum value of the input.
   * @type {number}
   * @attr
   * @default 100
   */
  @property({ type: Number })
  max = 100;

  /**
   * This reflects the behavior of a native input step attribute.
   * @type {number}
   * @attr
   * @default 1
   */
  @property({ type: Number })
  public get step() {
    return this.#step;
  }

  public set step(value) {
    this.#step = value;
    this.#stepDecimalPlaces = (value.toString().split('.')[1] || []).length;
  }

  #step = 1;

  /**
   * This is a value property of the uui-slider.
   * @type {string}
   * @attr
   * @default ''
   */
  @property({ type: String })
  get value() {
    return super.value;
  }

  set value(newVal) {
    if (newVal instanceof File) {
      return;
    }

    const oldVal = super.value;

    let correctedValue = newVal ? parseFloat(newVal as string) : 0;
    correctedValue = Math.min(Math.max(correctedValue, this.min), this.max);

    if (this.step > 0) {
      correctedValue = Math.round(correctedValue / this.step) * this.step;
    }

    super.value = correctedValue.toFixed(this.#stepDecimalPlaces).toString();

    this._calculateSliderPosition();
    this.requestUpdate('value', oldVal);
  }

  /**
   * Disables the input.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Label to be used for aria-label and eventually as visual label
   * @type {string}
   * @attr
   */
  @property({ type: String })
  public label!: string;

  @query('#input')
  private _input!: HTMLInputElement;

  @query('#track')
  private _track!: HTMLElement;

  constructor() {
    super();
    this.addEventListener('mousedown', () => {
      this.style.setProperty('--uui-show-focus-outline', '0');
    });
    this.addEventListener('blur', () => {
      this.style.setProperty('--uui-show-focus-outline', '');
    });
    this.addEventListener('keypress', this._onKeypress);
  }

  /**
   * This method enables <label for="..."> to focus the select
   */
  async focus() {
    await this.updateComplete;
    this._input.focus();
  }
  async blur() {
    await this.updateComplete;
    this._input.blur();
  }
  /**
   * This method enables <label for="..."> to open the select
   */
  async click() {
    await this.updateComplete;
    this._input.click();
  }

  protected getFormElement(): HTMLElement {
    return this._input;
  }

  connectedCallback() {
    super.connectedCallback();
    //TODO: change to observer.
    window.addEventListener('resize', this.onWindowResize);
    if (!this.label) {
      console.warn(this.tagName + ' needs a `label`', this);
    }
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.onWindowResize);
    super.disconnectedCallback();
  }

  firstUpdated() {
    this._calculateSliderPosition();
    this._updateSteps();
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    if (
      changedProperties.get('max') ||
      changedProperties.get('min') ||
      changedProperties.get('step')
    ) {
      this.value = this.value as string;
      this._updateSteps();
    }
  }

  private _updateSteps() {
    this._steps = GenerateStepArray(this.min, this.max, this.step);
    this._stepWidth = this._calculateStepWidth();
  }

  @state()
  private _stepWidth = 0;

  private _calculateStepWidth() {
    return (
      (this._track.getBoundingClientRect().width - TRACK_PADDING * 2) /
      (this._steps.length - 1)
    );
  }

  private onWindowResize = () => {
    this._stepWidth = this._calculateStepWidth();
  };

  private _onKeypress(e: KeyboardEvent): void {
    if (e.key == 'Enter') {
      this.submit();
    }
  }

  @state()
  protected _steps: number[] = [];

  @state()
  protected _sliderPosition = '0%';

  private _calculateSliderPosition() {
    const ratio =
      (parseFloat((super.value || '0') as string) - this.min) /
      (this.max - this.min);
    this._sliderPosition = `${Math.floor(ratio * 100000) / 1000}%`;
  }

  private _onInput(e: Event) {
    e.stopPropagation();
    this.value = this._input.value;
    this.dispatchEvent(new UUISliderEvent(UUISliderEvent.INPUT));
  }

  private _onChange(e: Event) {
    e.stopPropagation();
    this.pristine = false;
    this.dispatchEvent(new UUISliderEvent(UUISliderEvent.CHANGE));
  }

  render() {
    return html`
      <input
        id="input"
        type="range"
        min="${this.min}"
        max="${this.max}"
        .value="${this.value}"
        aria-label="${this.label}"
        step="${+this.step}"
        ?disabled=${this.disabled}
        @input=${this._onInput}
        @change=${this._onChange} />
      <div id="track" aria-hidden="true">
        <svg height="100%" width="100%">
          <rect x="9" y="9" height="3" rx="2" />
          ${RenderTrackSteps(this._steps, this._stepWidth)}
        </svg>

        <div id="track-inner" aria-hidden="true">
          <div id="thumb" style=${styleMap({ left: this._sliderPosition })}>
            ${this.hideValueLabel
              ? null
              : html`<div id="thumb-label">${this.value}</div>`}
          </div>
        </div>
      </div>
      ${RenderStepValues(this._steps, this._stepWidth, this.hideStepValues)}
    `;
  }

  static styles = [
    UUIHorizontalPulseKeyframes,
    nativeInputStyles,
    css`
      :host {
        display: inline-block;
        width: 100%;
        position: relative;
        min-height: 30px;
        user-select: none;
      }

      input {
        box-sizing: border-box;
        height: 18px;
      }

      #track {
        position: relative;
        height: 18px;
        width: 100%;
        display: flex;
      }

      #track svg {
        height: 21px;
        border-radius: 10px;
        background-color: var(--uui-color-surface);
      }
      #track svg rect {
        width: calc(100% - 18px);
        fill: var(--uui-color-border-standalone);
      }
      input:hover ~ #track svg rect {
        fill: var(--uui-color-border-emphasis);
      }

      input:focus ~ #track svg {
        outline: calc(2px * var(--uui-show-focus-outline, 1)) solid
          var(--uui-color-focus);
      }

      .track-step {
        fill: var(--uui-color-border);
      }
      input:hover ~ #track svg .track-step {
        fill: var(--uui-color-border-emphasis);
      }

      #track-inner {
        position: absolute;
        left: ${TRACK_PADDING}px; /* Match TRACK_MARGIN */
        right: ${TRACK_PADDING}px; /* Match TRACK_MARGIN */
      }

      #thumb {
        position: absolute;
        top: 2px;
        bottom: 0;
        left: 0;
        height: 17px;
        width: 17px;
        margin-left: -8px;
        margin-right: -8px;
        border-radius: 50%;
        box-sizing: border-box;

        background-color: var(--uui-color-surface);
        border: 2px solid var(--uui-color-selected);

        transition: 120ms left ease;
      }
      :host([disabled]) #thumb {
        background-color: var(--uui-color-disabled);
        border-color: var(--uui-color-disabled-standalone);
      }

      #thumb:after {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        height: 9px;
        width: 9px;
        border-radius: 50%;
        background-color: var(--uui-color-selected);
      }
      :host([disabled]) #thumb:after {
        background-color: var(--uui-color-disabled);
      }

      #thumb-label {
        position: absolute;
        box-sizing: border-box;
        font-weight: 700;
        bottom: 15px;
        left: 50%;
        width: 40px;
        margin-left: -20px;
        text-align: center;
        opacity: 0;
        transition: 120ms opacity;
        color: var(--uui-color-selected);
      }

      input:focus ~ #track #thumb-label,
      input:hover ~ #track #thumb-label {
        opacity: 1;
      }

      #step-values {
        margin: 0 ${TRACK_PADDING}px; /* Match TRACK_MARGIN */
        margin-top: 6px;
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

      :host(:not([pristine]):invalid) #thumb {
        border-color: var(--uui-color-danger-standalone);
      }
      :host(:not([pristine]):invalid) #thumb:after {
        background-color: var(--uui-color-danger);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-slider': UUISliderElement;
  }
}
