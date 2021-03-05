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

        background-color: blue;
        border-radius: 3px;
      }

      #thumb {
        position: absolute;
        left: 50%;
        height: 24px;
        width: 24px;
        background-color: pink;
        border-radius: 50%;
        margin-left: -12px;
      }
    `,
  ];

  @property({ type: Number, reflect: true })
  min = 0;

  @property({ type: Number, reflect: true })
  max = 100;

  private _value = '50';
  @property({ type: String, reflect: true })
  get value() {
    return this._value;
  }

  set value(newVal) {
    const oldVal = this._value;
    this._value = newVal;
    this.calculateThumbPosition(newVal);
    this.requestUpdate('value', oldVal);
  }

  @internalProperty()
  protected sliderPosition = '50%';

  @query('input')
  input!: HTMLInputElement;

  private calculateThumbPosition(newVal: string) {
    const position = `${Math.floor(
      ((parseInt(newVal) - this.min) / (this.max - this.min)) * 100
    )}%`;
    this.sliderPosition = position;
  }

  private thumbDynamicStyles() {
    return { left: this.sliderPosition };
  }

  private fillDynamicStyles() {
    return { width: this.sliderPosition };
  }

  private onInput() {
    this.value = this.input.value;

    console.log(
      this.sliderPosition,
      this.input.value,
      this.thumbDynamicStyles()
    );
  }

  render() {
    return html`
      <label for="input1">Label</label>

      <input
        type="range"
        min="${this.min}"
        max="${this.max}"
        .value="${this.value}"
        id="input1"
        step="1"
        @input=${this.onInput}
      />
      <div id="track" aria-hidden="true">
        <span id="fill" style=${styleMap(this.fillDynamicStyles())}></span>
        <span id="thumb" style=${styleMap(this.thumbDynamicStyles())}></span>
      </div>
      <output for="input1" aria-hidden="true">50</output>
    `;
  }
}
