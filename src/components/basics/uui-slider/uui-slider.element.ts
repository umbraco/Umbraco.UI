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
        height: 8px;
        width: 100%;
        background-color: lightblue;
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
      }

      #thumb {
        position: absolute;
        left: 0;
        transform-box: inherit;
        /* transform: translateX(100%); */
        height: 24px;
        width: 24px;
        background-color: fuchsia;
        border-radius: 50%;
        margin-left: -12px;
        /* will-change: left;
        transition: left 10ms; */
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
    `,
  ];

  @query('input')
  input!: HTMLInputElement;

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

  @internalProperty()
  protected sliderPosition = '50%';

  @internalProperty()
  protected fillScale = '0.5';

  private calculateSliderPosition(newVal: string) {
    const ratio = (parseFloat(newVal) - this.min) / (this.max - this.min);

    this.fillScale = `${ratio}`;
    this.sliderPosition = `${Math.floor(ratio * 100)}%`;
    console.log;
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
    console.log(this.input.value);
  }

  private range = (start: number, stop: number, step: number) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );

  renderSVG() {
    return `"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 790.39 715.45'%3E%3Cdefs%3E%3Cstyle%3E .cls-1 %7B fill: %23fbf7f7; %7D .cls-2 %7B fill: %239d8057; %7D .cls-3 %7B fill: %233544b1; %7D .cls-4 %7B fill: %23f5c1bc; %7D .cls-5 %7B fill: %23f2ebe6; %7D %3C/style%3E%3C/defs%3E%3Ctitle%3E_CG20_heart%3C/title%3E%3Cg id='Heart'%3E%3Cpolygon class='cls-1' points='394.87 77.68 78.25 396.76 394.52 396.65 394.87 77.68' /%3E%3Cpolyline class='cls-2' points='713.34 396.06 394.02 715.45 76.5 396.76 713.34 396.13' /%3E%3Cpolygon class='cls-3' points='713.34 396.13 713.77 395.7 393.8 76.73 393.8 396.1 713.27 396.13 713.34 396.06 713.34 396.13' /%3E%3Cpath class='cls-4' d='M724.44,66C636.51-22,493.94-22,406,66L394.5,77.43,713.42,395.35l11-11C812.37,296.44,812.37,153.88,724.44,66Z' /%3E%3Cpath class='cls-5' d='M394.69,77.62,384.37,67.34C296.44-20.59,153.88-20.59,66,67.34S-22,297.83,66,385.77L78,397.8Z' /%3E%3C/g%3E%3C/svg%3E"`;
  }

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
        ${this.range(this.min, this.max - 1, parseFloat(this.step)).map(
          el =>
            html`<span class="uui-slider-step">
              ${this.range(this.min, this.max - 1, parseFloat(this.step))
                .length <= 10
                ? el.toFixed(0)
                : nothing}
            </span>`
        )}
        <div id="fill" style=${styleMap(this.fillDynamicStyles())}></div>
        <div id="thumb" style=${styleMap(this.thumbDynamicStyles())}></div>
      </div>
    `;
  }
}

//background-image: url(\"data:image/svg+svg+xml;utf8,${this.renderSVG()}\")
