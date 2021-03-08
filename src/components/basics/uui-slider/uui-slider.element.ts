import {
  LitElement,
  html,
  css,
  property,
  query,
  internalProperty,
  svg,
} from 'lit-element';
import { nothing } from 'lit-html';
import { styleMap } from 'lit-html/directives/style-map';
import { nativeInputStyles } from './nativeInputStyles';

/**
 *  @element uui-slider
 *  @description - Native input type="range" wrapper.
 */

const renderSVG = (steps: number[], stepWidht: number) => {
  return svg`
  ${steps.map(el => {
    if (stepWidht / 6 >= 5)
      return svg`<circle class="uui-slider-circle" cx="${
        stepWidht * steps.indexOf(el)
      }" cy="50%" r="4.5" fill="black" />`;
  })}
`;
};

const renderValues = (steps: number[], stepWidht: number, show: boolean) => {
  if (show) {
    return html`<div id="steps-values">
      ${steps.map(
        el =>
          html` <span class="uui-slider-step">
            ${steps.length <= 15 || stepWidht / 6 >= 5
              ? el.toFixed(0)
              : nothing}
          </span>`
      )}
    </div>`;
  }
};

export class UUISliderElement extends LitElement {
  static styles = [
    nativeInputStyles,
    css`
      input[type='range'] {
        box-sizing: border-box;
        width: calc(100% + 24px);
      }

      :host {
        display: inline-block;
        width: 100%;
        position: relative;
        margin: 12px 0;
        min-height: 30px;
        border: 1px solid blue;
      }

      #track {
        position: absolute;
        top: 50%;
        height: 12px;
        width: 100%;
        display: flex;
      }
      /* 
      #fill {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        transform-origin: center left;
        background-color: blue;
        border-radius: 3px;
        opacity: 0.3;
      } */

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
        border: 1px solid var(--uui-interface-selected);
        margin-left: -9px;
      }

      #thumb:after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        height: 9px;
        width: 9px;
        background-color: var(--uui-interface-selected);
        border-radius: 50%;
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
        padding-top: 30px;
      }

      /* TODO add dynamic translation value */

      #steps-values > span {
        flex-basis: 0;
        flex-grow: 1;
        transform: translateX(-50%);
        display: inline-block;
        text-align: center;
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
        stroke: var(--uui-interface-border);
        stroke-width: 1px;
      }

      .uui-slider-circle {
        fill: var(--uui-interface-border);
      }
    `,
  ];

  @query('input')
  input!: HTMLInputElement;

  @query('#track')
  track!: HTMLInputElement;

  @property({})
  label = '';

  @property({ type: Boolean, attribute: 'show-step-values' })
  showStepValues = true;

  @property({ type: Number })
  min = 0;

  @property({ type: Number })
  max = 100;

  @property({ type: String })
  step = 'any';

  private _value = '';
  @property({ type: String })
  get value() {
    return this._value;
  }

  set value(newVal) {
    const oldVal = this._value;
    this._value = newVal;
    this.calculateSliderPosition(newVal);
    this.requestUpdate('value', oldVal);
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
    this.steps = this.range(this.min, this.max - 1, parseFloat(this.step));
    this.stepWidht = this.calculateStepWidth();
  }

  @internalProperty()
  private stepWidht = 0;

  private calculateStepWidth() {
    return this.track.getBoundingClientRect().width / this.steps.length;
  }

  private onWindowResize = () => {
    this.stepWidht = this.calculateStepWidth();
  };

  @internalProperty()
  protected steps: number[] = [];

  @internalProperty()
  protected sliderPosition = '50%';

  @internalProperty()
  protected fillScale = '0.5';

  private calculateSliderPosition(newVal: string) {
    const ratio = (parseFloat(newVal) - this.min) / (this.max - this.min);
    this.fillScale = `${ratio}`;
    this.sliderPosition = `${Math.floor(ratio * 100)}%`;
  }

  private thumbDynamicStyles() {
    return { left: this.sliderPosition };
  }

  // private fillDynamicStyles() {
  //   return {
  //     transform: `scaleX(${this.fillScale})`,
  //   };
  // }

  private onInput() {
    this.value = this.input.value;
    console.log();
  }

  private range = (start: number, stop: number, step: number) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );

  render() {
    return html`
      <label for="input1"><slot></slot></label>
      <input
        type="range"
        min="${this.min}"
        max="${this.max}"
        .value="${this.value}"
        id="input1"
        aria-label="${this.label}"
        step="${this.step}"
        @input=${this.onInput}
      />
      <div id="track" aria-hidden="true">
        <div id="stepper">
          <svg height="100%" width="100%" class="uui-slider-step">
            <line
              x1="0"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke="black"
              id="slider-line"
            />
            ${this.step !== 'any'
              ? renderSVG(this.steps, this.stepWidht)
              : nothing}
          </svg>
        </div>

        <div id="thumb" style=${styleMap(this.thumbDynamicStyles())}></div>
      </div>
      ${this.step !== 'any'
        ? renderValues(this.steps, this.stepWidht, this.showStepValues)
        : nothing}
    `;
  }
}

//<div id="fill" style=${styleMap(this.fillDynamicStyles())}></div>
