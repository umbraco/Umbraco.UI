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
        --uui-swatch-size: 25px;
        --uui-swatch-border-width: 1px;

        position: relative;
        display: flex;
        width: var(--uui-swatch-size);
        height: var(--uui-swatch-size);
        justify-content: center;
        box-sizing: border-box;
        justify-content: center;
        box-sizing: border-box;
        transition: box-shadow 100ms ease-out;
      }

      :host(*) * {
        /* TODO: implement globally shared outline style */
        outline-color: var(--uui-color-focus);
        outline-offset: 4px;
      }

      :host(:focus) {
        outline-color: var(--uui-color-focus);
        outline-width: var(--uui-swatch-border-width);
        outline-style: solid;
        outline-offset: var(--uui-swatch-border-width);
      }

      :host([selectable]) {
        cursor: pointer;
      }

      :host([selectable])::after {
        content: '';
        position: absolute;
        pointer-events: none;
        inset: calc(var(--uui-swatch-border-width) * -1);
        width: calc(100% + calc(var(--uui-swatch-border-width) * 2));
        height: calc(100% + calc(var(--uui-swatch-border-width) * 2));
        box-sizing: border-box;
        border: var(--uui-swatch-border-width) solid var(--uui-color-selected);
        border-radius: calc(
          var(--uui-border-radius) + var(--uui-swatch-border-width)
        );
        transition: opacity 100ms ease-out;
        opacity: 0;
      }
      :host([selectable]:hover)::after {
        opacity: 0.33;
      }
      :host([selectable][selected]:hover)::after {
        opacity: 0.66;
      }
      :host([selectable][selected])::after {
        opacity: 1;
      }

      .color-swatch {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .color-swatch--transparent-bg {
        background-image: linear-gradient(45deg, var(--uui-palette-grey) 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, var(--uui-palette-grey) 75%),
          linear-gradient(45deg, transparent 75%, var(--uui-palette-grey) 75%),
          linear-gradient(45deg, var(--uui-palette-grey) 25%, transparent 25%);
        background-size: 10px 10px;
        background-position: 0 0, 0 0, -5px -5px, 5px 5px;
      }
      .color-swatch__color {
        width: 100%;
        height: 100%;
        border: 1px solid rgba(0, 0, 0, 0.125);
        border-radius: inherit;
        cursor: pointer;
        box-sizing: border-box;
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
