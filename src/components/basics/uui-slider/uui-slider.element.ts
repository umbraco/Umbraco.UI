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
        padding: 30px 0;
      }

      #track {
        position: relative;
        height: 12px;
        width: 100%;

        display: flex;
      }

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
      }

      #thumb {
        position: absolute;
        left: 0;
        height: 24px;
        width: 24px;
        background-color: transparent;
        border-radius: 50%;
        box-sizing: border-box;
        border: 1px solid fuchsia;
        margin-left: -12px;
        transform: translateY(-25%);
      }

      #track > span {
        flex-basis: 0;
        flex-grow: 1;
        margin-top: 10px;
        border-left: 1px solid purple;
        height: 100%;
      }

      #track > span:last-of-type {
        border-right: 1px solid purple;
      }

      svg > circle:first-of-type {
        fill: none;
      }
    `,
  ];

  @query('input')
  input!: HTMLInputElement;

  @query('#track')
  track!: HTMLInputElement;

  @property({})
  label = '';

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

  private fillDynamicStyles() {
    return {
      transform: `scaleX(${this.fillScale})`,
      //   backgroundImage: `url(${this.renderSVG()})`,
    };
  }

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
        <div id="fill" style=${styleMap(this.fillDynamicStyles())}></div>
        <div id="thumb" style=${styleMap(this.thumbDynamicStyles())}></div>
        <svg height="100%" width="100%" class="uui-slider-step">
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="black" />
          ${this.steps.map(el => {
            if (this.stepWidht / 6 >= 5)
              return svg`<circle class="uui-slider-circle" cx="${
                this.stepWidht *
                this.range(
                  this.min,
                  this.max - 1,
                  parseFloat(this.step)
                ).indexOf(el)
              }" cy="6" r="6" fill="red" />`;
          })}
        </svg>
      </div>
    `;
  }
}

// ${this.range(this.min, this.max - 1, parseFloat(this.step)).map(
//   el =>
//     html` <span class="uui-slider-step">
//       ${this.range(this.min, this.max - 1, parseFloat(this.step))
//         .length <= 10
//         ? el.toFixed(0)
//         : nothing}
//     </span>`
// )}
