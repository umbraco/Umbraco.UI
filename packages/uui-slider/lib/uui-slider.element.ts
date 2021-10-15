import { LitElement, html, css, svg, nothing } from 'lit';
import { property, query, state } from 'lit/decorators.js';

import { styleMap } from 'lit/directives/style-map.js';
import { nativeInputStyles } from './native-input.styles';
import {
  UUIHorizontalPulseKeyframes,
  UUIHorizontalPulseAnimationValue,
} from '@umbraco-ui/uui-base/lib/animations';
import { UUISliderEvent } from './UUISliderEvents';
import { LabelMixin } from '@umbraco-ui/uui-base/lib/mixins';

const renderSVG = (steps: number[], stepWidth: number) => {
  return svg`
  ${steps.map(el => {
    if (stepWidth / 6 >= 5)
      return svg`<circle class="uui-slider-circle" cx="${
        stepWidth * steps.indexOf(el)
      }" cy="50%" r="4.2" />`;
    return svg``;
  })}
`;
};

const renderValues = (steps: number[], stepWidth: number, hide: boolean) => {
  if (hide) return html``;

  return html`<div id="steps-values">
    ${steps.map(
      el =>
        html` <span class="uui-slider-step">
          ${steps.length <= 20 && stepWidth / 6 >= 5 ? el.toFixed(0) : nothing}
        </span>`
    )}
  </div>`;
};

/**
 *  @element uui-slider
 *  @description - Native `<input type="range">` wrapper.
 *  @extends LabelMixin(LitElement)
 *  @slot label - for the input label text.
 *  @fires UUISliderEvent#input on input
 *
 */
export class UUISliderElement extends LabelMixin('label', LitElement) {
  static styles = [
    UUIHorizontalPulseKeyframes,
    nativeInputStyles,
    css`
      input[type='range'] {
        box-sizing: border-box;
      }

      :host {
        display: inline-block;
        width: 100%;
        position: relative;
        margin: 12px 0;
        min-height: 30px;
        border: none;
        user-select: none;
      }

      #track {
        position: relative;
        top: 50%;
        height: 18px;
        width: 100%;
        display: flex;
      }

      #thumb {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        height: 18px;
        width: 18px;
        background-color: transparent;
        border-radius: 50%;
        box-sizing: border-box;
        border: 1px solid var(--uui-interface-select);
        margin-left: -9px;
        transition: 0.1s left ease;
      }

      #thumb:after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        height: 9px;
        width: 9px;
        background-color: var(--uui-interface-select);
        border-radius: 50%;
      }

      #thumb:before {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform-origin: center center;
        transform: translate(-50%, -50%);
        height: 24px;
        width: 24px;
        background-color: transparent;
        border: 1px solid var(--uui-interface-select);
        border-radius: 50%;
        opacity: 0;
      }

      input:hover ~ #track #thumb:before {
        animation: ${UUIHorizontalPulseAnimationValue};
      }

      input:hover ~ #track #thumb:after {
        background-color: var(--uui-interface-select-hover);
      }

      input:hover ~ #track #thumb {
        border: 1px solid var(--uui-interface-select-hover);
      }

      #value {
        position: relative;
        box-sizing: border-box;
        font-weight: 600;
        bottom: 150%;
        width: 100%;
        text-align: center;
        opacity: 0;
        color: var(--uui-interface-select);
        transition: 0.2s opacity ease;
      }

      input:hover ~ #track #value {
        opacity: 1;
      }

      #track svg {
        opacity: 0.5;
        transition: 0.2s opacity ease;
      }

      input:focus ~ #track svg {
        opacity: 1;
      }

      #stepper {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 100%;
      }

      #steps-values {
        display: flex;
        align-items: flex-end;
        box-sizing: border-box;
      }

      #steps-values > span {
        flex-basis: 0;
        flex-grow: 1;
        transform: translateX(-50%);
        display: inline-block;
        text-align: center;
        font-size: 12px;
        color: var(--uui-interface-contrast-disabled);
      }

      #steps-values :first-child {
        opacity: 0;
      }

      svg > circle:first-of-type {
        fill: none;
      }

      #stepper {
        width: 100%;
      }

      #slider-line {
        stroke: var(--uui-interface-contrast-disabled);
        stroke-width: 1px;
      }

      .uui-slider-circle {
        fill: var(--uui-interface-contrast-disabled);
      }

      label {
        display: inline-block;
        margin-top: 6px;
        position: relative;

        font-weight: 2100;
      }

      @media (prefers-reduced-motion) {
        input:focus ~ #track #thumb:before {
          animation: none;
        }

        label:before {
          transition: none;
        }
      }
    `,
  ];

  /**
   * This is a static class field indicating that the element is can be used inside a native form and participate in its events. It may require a polyfill, check support here https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals.  Read more about form controls here https://web.dev/more-capable-form-controls/
   * @type {boolean}
   */
  static readonly formAssociated = true;

  @query('input')
  private input!: HTMLInputElement;

  @query('#track')
  private track!: HTMLInputElement;

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
   * @default 100
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

  private _value = '';
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
    const oldVal = this._value;
    this._value = newVal;
    this._calculateSliderPosition(newVal);
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
   * Set to true to visually hide the labeling provided by the component. The element will still have label for accessibility purposes
   * @type {boolean}
   * @attr hide-label
   * @default false
   */
  @property({ type: Boolean, attribute: 'hide-label', reflect: true })
  hideLabel = false;

  private _internals;

  constructor() {
    super();
    this._internals = (this as any).attachInternals();
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', this.onWindowResize);
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.onWindowResize);
    super.disconnectedCallback();
  }

  firstUpdated() {
    this._updateSteps();
  }

  private _updateSteps() {
    this.steps = this._range(this.min, this.max - 1, this.step);
    this.stepWidth = this._calculateStepWidth();
  }

  updated(changedProperties: any) {
    if (
      changedProperties.get('max') ||
      changedProperties.get('min') ||
      changedProperties.get('step')
    )
      this._updateSteps();
  }

  @state()
  private stepWidth = 0;

  private _calculateStepWidth() {
    return this.track.getBoundingClientRect().width / this.steps.length;
  }

  private onWindowResize = () => {
    this.stepWidth = this._calculateStepWidth();
  };

  @state()
  protected steps: number[] = [];

  @state()
  protected sliderPosition = '50%';

  @state()
  protected fillScale = '0.5';

  private _calculateSliderPosition(newVal: string) {
    const ratio = (parseFloat(newVal) - this.min) / (this.max - this.min);
    this.fillScale = `${ratio}`;
    this.sliderPosition = `${Math.floor(ratio * 100)}%`;
  }

  private _thumbDynamicStyles() {
    return { left: this.sliderPosition };
  }

  private _onInput() {
    this.value = this.input.value;
    this.dispatchEvent(new UUISliderEvent(UUISliderEvent.INPUT));
  }

  private _range = (start: number, stop: number, step: number) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );

  render() {
    return html`
      <input
        type="range"
        min="${this.min}"
        max="${this.max}"
        .value="${this.value}"
        id="input1"
        aria-label="${this.label}"
        step="${+this.step}"
        @input=${this._onInput} />
      <div id="track" aria-hidden="true">
        <div id="stepper">
          <svg height="100%" width="100%" class="uui-slider-step">
            <line
              x1="0"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke="black"
              id="slider-line" />
            ${renderSVG(this.steps, this.stepWidth)}
          </svg>
        </div>

        <div id="thumb" style=${styleMap(this._thumbDynamicStyles())}>
          <div id="value">${this.value}</div>
        </div>
      </div>
      ${renderValues(this.steps, this.stepWidth, this.hideStepValues)}
      ${this.hideLabel === false ? this.renderLabel() : ''}
    `;
  }
}
