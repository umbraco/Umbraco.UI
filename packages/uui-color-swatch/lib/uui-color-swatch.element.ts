import { Colord } from 'colord';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { css, html, LitElement } from 'lit';
import { iconCheck } from '@umbraco-ui/uui-icon-registry-essential/lib/svgs';

import { styleMap } from 'lit/directives/style-map.js';

import {
  ActiveMixin,
  SelectableMixin,
} from '@umbraco-ui/uui-base/lib/mixins';

/**
 * @element uui-color-swatch
 */
@defineElement('uui-color-swatch')
export class UUIColorSwatchElement extends SelectableMixin(
  ActiveMixin(LitElement)
) {
      static styles = [
    css`
      :host {
        --swatch-size: 25px;

        position: relative;
        display:  inline-block;
      }

      :host([selectable]) {
        cursor: pointer;
      }

      .color-swatch {
        position: relative;
        width: var(--swatch-size);
        height: var(--swatch-size);
        border-radius: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .color-swatch--transparent-bg {

      }
      .color-swatch__color {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        border: 1px solid rgba(0, 0, 0, 0.125);
        border-radius: inherit;
        cursor: pointer;
      }

      .color-swatch__check {
        position: absolute;
        vertical-align: middle;
        width: 1em;
        height: 1em;
        line-height: 0;
        transition: fill 120ms, opacity 120ms;
        fill: #fff;
        pointer-events: none;
        opacity: 0;
      }

      .color-swatch--light .color-swatch__check {
        fill: #000;
      }

      :host([selected]) .color-swatch__check {
        opacity: 1;
      }
    `,
  ];

  private _value: string | undefined;

  @state()
  private _disabled = false;

  @state() _displayValue = '';

  /**
 * Value of the option.
 * @type { string }
 * @attr
 * @default ""
 */
  @property({ type: String })
  public get value(): string {
    return this._value ? this._value : this.textContent?.trim() || '';
  }
  
  public set value(newValue: string) {
    const oldValue = this._value;
    this._value = newValue;
    this.requestUpdate('value', oldValue);
  }

  /**
   * A readable value.
   * @type { string }
   * @attr
   * @default ""
   */
  @property({ type: String, attribute: 'display-value' })
  public get displayValue() {
    return this._displayValue
      ? this._displayValue
      : this.textContent?.trim() || '';
  }
  
  public set displayValue(newValue) {
    const oldValue = this._displayValue;
    this._displayValue = newValue;
    this.requestUpdate('displayValue', oldValue);
  }

  /**
   * Determines if the options is disabled. If true the option can't be selected
   * @type { boolean }
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public get disabled() {
    return this._disabled;
  }
  
  public set disabled(newValue) {
    const oldValue = this._disabled;
    this._disabled = newValue;
    this.selectable = !this._disabled;
    this.requestUpdate('disabled', oldValue);
  }

  @property() label = '';

  constructor() {
    super();
    this.selectable = true;
    this.unselectable = false;
  }

  isLight(color: string) {
    return new Colord(color).isLight();
  }

  render(){
    return html`
        <div
          class=${classMap({
            'color-swatch': true,
            'color-swatch--transparent-bg': true,
            'color-swatch--light': this.isLight(this.value)
          })}
          role="button"
          aria-label=${this.label}
        >
        <div class="color-swatch__color" style=${styleMap({ backgroundColor: this.value })}></div>
        <div class="color-swatch__check">${iconCheck}</div>
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-color-swatch': UUIColorSwatchElement;
  }
}
