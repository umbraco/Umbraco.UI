import { LitElement, html, css, svg, nothing } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property, query, state } from 'lit/decorators.js';

import { styleMap } from 'lit/directives/style-map.js';
import { nativeInputStyles } from './native-input.styles';
import { UUIHorizontalPulseKeyframes } from '@umbraco-ui/uui-base/lib/animations';
import { UUISliderEvent } from './UUISliderEvents';
import { FormControlMixin } from '@umbraco-ui/uui-base/lib/mixins';

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
  hide: boolean
) => {
  if (hide) return html``;

  return html`<div id="step-values">
    ${steps.map(
      el =>
        html` <span
          ><span>
            ${steps.length <= 20 && stepWidth >= STEP_MIN_WIDTH
              ? el.toFixed(0)
              : nothing}
          </span></span
        >`
    )}
  </div>`;
};

const GenerateStepArray = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

/**
 *  @element uui-slider
 *  @description - Native `<input type="range">` wrapper.
 *  @fires UUISliderEvent#input on input
 *
 */
@defineElement('uui-slider')
export class UUISliderElement extends FormControlMixin(LitElement) {
  /**
   * This is a static class field indicating that the element is can be used inside a native form and participate in its events. It may require a polyfill, check support here https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals.  Read more about form controls here https://web.dev/more-capable-form-controls/
   * @type {boolean}
   */
  static readonly formAssociated = true;

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
        /*border: 1px solid var(--uui-interface-border);*/
        border-radius: 10px;
        background-color: var(--uui-interface-surface);
      }
      #track svg rect {
        width: calc(100% - 18px);
        fill: var(--uui-interface-border);
      }
      input:hover ~ #track svg rect {
        fill: var(--uui-interface-border-hover);
      }

      input:focus ~ #track svg {
        outline: calc(2px * var(--uui-show-focus-outline, 1)) solid
          var(--uui-interface-outline);
      }

      .track-step {
        fill: var(--uui-interface-border);
      }
      input:hover ~ #track svg .track-step {
        fill: var(--uui-interface-border-hover);
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

        background-color: var(--uui-interface-surface);
        border: 2px solid var(--uui-interface-select);

        transition: 120ms left ease;
      }
      :host([disabled]) #thumb {
        background-color: var(--uui-interface-surface-disabled);
        border-color: var(--uui-interface-select-disabled);
      }

      #thumb:after {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        height: 9px;
        width: 9px;
        border-radius: 50%;
        background-color: var(--uui-interface-select);
      }
      :host([disabled]) #thumb:after {
        background-color: var(--uui-interface-select-disabled);
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
        color: var(--uui-interface-select);
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
        color: var(--uui-interface-contrast-disabled);
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
        border-color: var(--uui-look-danger-border);
      }
      :host(:not([pristine]):invalid) #thumb:after {
        background-color: var(--uui-look-danger-surface);
      }
    `,
  ];

  /**
   * Hides the numbers representing the value of each steps. Dots will still be visible
   * @type {boolean}
   * @attr 'hide-step-values'
   * @default false
   */
  @property({ type: Boolean, attribute: 'hide-step-values' })
  hideStepValues = false;

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
  step = 1;

  /**
   * This is a value property of the uui-slider.
   * @type {string}
   * @attr
   * @default ''
   */
  @property({ type: String })
  get value() {
    return this._value;
  }

  set value(newVal) {
    if (newVal instanceof File) {
      return;
    }

    const oldVal = this._value;

    let correctedValue = newVal ? parseFloat(newVal as string) : 0;
    correctedValue = Math.min(Math.max(correctedValue, this.min), this.max);
    if (this.step > 0) {
      correctedValue = Math.round(correctedValue / this.step) * this.step;
    }

    this._value = correctedValue.toString();
    this._calculateSliderPosition();
    if (
      'ElementInternals' in window &&
      //@ts-ignore
      'setFormValue' in window.ElementInternals.prototype
    ) {
      this._internals.setFormValue(this._value);
    }
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
  }

  /**
   * This method enables <label for="..."> to focus the input
   */
  focus() {
    this._input.focus();
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

  @state()
  protected _steps: number[] = [];

  @state()
  protected _sliderPosition = '0%';

  private _calculateSliderPosition() {
    const ratio =
      (parseFloat((this._value || '0') as string) - this.min) /
      (this.max - this.min);
    this._sliderPosition = `${Math.floor(ratio * 100000) / 1000}%`;
  }

  private _onInput() {
    this.value = this._input.value;
    this.dispatchEvent(new UUISliderEvent(UUISliderEvent.INPUT));
  }

  private _onChange() {
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
        .value="${this.value as string}"
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
            <div id="thumb-label">${this.value}</div>
          </div>
        </div>
      </div>
      ${RenderStepValues(this._steps, this._stepWidth, this.hideStepValues)}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-slider': UUISliderElement;
  }
}
