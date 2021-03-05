import {
  LitElement,
  html,
  css,
  property,
  query,
  internalProperty,
} from 'lit-element';
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

        height: 24px;
        width: 24px;
        background-color: pink;
        border-radius: 50%;
        margin-left: -12px;
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

  @property({ type: Number })
  step = 1;

  private _value = '50';
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
    const ratio = (parseInt(newVal) - this.min) / (this.max - this.min);

    this.fillScale = `${ratio}`;
    this.sliderPosition = `${Math.floor(ratio * 100)}%`;
    console.log;
  }

  private thumbDynamicStyles() {
    return { left: this.sliderPosition };
  }

  private fillDynamicStyles() {
    return { transform: `scaleX(${this.fillScale})` };
  }

  private onInput() {
    this.value = this.input.value;
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
        <div id="fill" style=${styleMap(this.fillDynamicStyles())}></div>
        <div id="thumb" style=${styleMap(this.thumbDynamicStyles())}></div>
      </div>
    `;
  }
}
