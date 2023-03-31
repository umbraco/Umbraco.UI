import { Colord } from 'colord';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { css, html, LitElement, nothing } from 'lit';
import { iconCheck } from '@umbraco-ui/uui-icon-registry-essential/lib/svgs';

import { styleMap } from 'lit/directives/style-map.js';

import {
  ActiveMixin,
  LabelMixin,
  SelectableMixin,
} from '@umbraco-ui/uui-base/lib/mixins';

/**
 * Color swatch, can have label and be selectable. Depends on colord library and exposes it's utility functions under color property.
 *
 * @element uui-color-swatch
 * @cssprop --uui-swatch-size - The size of the swatch.
 * @cssprop --uui-swatch-border-width - The width of the border.
 * @slot label - Default slot for the label.
 */
@defineElement('uui-color-swatch')
export class UUIColorSwatchElement extends LabelMixin(
  'label',
  SelectableMixin(ActiveMixin(LitElement))
) {
  static styles = [
    css`
      :host {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        transition: box-shadow 100ms ease-out;
        flex-direction: column;
      }

      :host(*),
      * {
        /* TODO: implement globally shared outline style */
        outline-color: var(--uui-color-focus);
        outline-offset: 4px;
      }

      :host(:focus-within:not([disabled])) {
        outline: none;
      }

      :host(:focus:not([disabled])) #swatch {
        outline-color: var(--uui-color-focus);
        outline-width: var(--uui-swatch-border-width, 1px);
        outline-style: solid;
        outline-offset: var(--uui-swatch-border-width, 1px);
      }

      :host([selectable]) #swatch {
        cursor: pointer;
      }

      :host([disabled]) {
        cursor: not-allowed;
      }

      #swatch {
        outline: none;
        background: none;
        border: none;
        padding: 0;
        margin: 0;
        text-align: left;
        border-radius: 3px;
      }

      :host(:not([selectable])) #swatch:focus {
        outline: none;
      }

      :host([selectable]) #swatch::after {
        content: '';
        position: absolute;
        pointer-events: none;
        inset: calc(var(--uui-swatch-border-width, 1px) * -1);
        width: calc(100% + calc(var(--uui-swatch-border-width, 1px) * 2));
        height: calc(100% + calc(var(--uui-swatch-border-width, 1px) * 2));
        box-sizing: border-box;
        border: var(--uui-swatch-border-width, 1px) solid
          var(--uui-color-selected);
        border-radius: calc(
          var(--uui-border-radius) + var(--uui-swatch-border-width, 1px)
        );
        transition: opacity 100ms ease-out;
        opacity: 0;
      }
      :host([selectable]:not([disabled]):hover) #swatch::after {
        opacity: 0.33;
      }
      :host([selectable][selected]:not([disabled]):hover) #swatch::after {
        opacity: 0.66;
      }
      :host([selectable][selected]:not([disabled])) #swatch::after {
        opacity: 1;
      }

      .color-swatch {
        position: relative;
        width: var(--uui-swatch-size, 25px);
        height: var(--uui-swatch-size, 25px);
        border-radius: 3px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .color-swatch--transparent-bg {
        background-image: linear-gradient(
            45deg,
            var(--uui-palette-grey) 25%,
            transparent 25%
          ),
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
        box-sizing: border-box;
      }

      .color-swatch--big .color-swatch__color {
        border-radius: 3px 3px 0 0;
      }

      .color-swatch__check {
        position: absolute;
        vertical-align: middle;
        width: calc(var(--uui-swatch-size, 25px) / 2);
        height: calc(var(--uui-swatch-size, 25px) / 2);
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

      slot[name='label']::slotted(*),
      .label {
        font-size: var(--uui-size-4);
      }

      .color-swatch--big {
        width: 120px;
        height: 50px;
      }

      .color-swatch__label {
        max-width: 120px;
        box-sizing: border-box;
        padding: var(--uui-size-space-1) var(--uui-size-space-2);
        line-height: 1.5;
        display: flex;
        flex-direction: column;
        background: white;
        border: 1px solid var(--uui-color-border);
        border-radius: 0 0 3px 3px;
        font-size: var(--uui-size-4, 12px);
      }

      .color-swatch__label strong {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        box-sizing: border-box;
      }
    `,
  ];

  private _value: string | undefined = '';
  /**
   * Value of the swatch. Should be a valid hex, hexa, rgb, rgba, hsl or hsla string. Should fulfill this [css spec](https://www.w3.org/TR/css-color-4/#color-type). If not provided element will look at its text content.
   * @type { string }
   * @attr
   * @default ""
   */
  @property({ type: String })
  get value(): string {
    return this._value ? this._value : this.textContent?.trim() || '';
  }

  set value(newValue: string) {
    const oldValue = this._value;
    this._value = newValue;
    this.requestUpdate('value', oldValue);
  }

  /**
   * Determines if the options is disabled. If true the option can't be selected
   * @type { boolean }
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * When true shows element label below the color checkbox
   *
   * @memberof UUIColorSwatchElement
   */
  @property({ type: Boolean, attribute: 'show-label' })
  showLabel = false;
  /**
   * Colord object instance based on the value provided to the element. If the value is not a valid color, it falls back to black (like Amy Winehouse). For more information about Colord, see [Colord](https://omgovich.github.io/colord/)
   *
   * @type {(Colord | null)}
   * @memberof UUIColorSwatchElement
   */
  get color(): Colord | null {
    return this._color;
  }

  set color(_) {
    // do nothing, this is just to prevent the color from being set from outside
    return;
  }
  private _color: Colord | null = null;

  /**
   * Returns true if the color brightness is >= 0.5
   *
   * @readonly
   * @memberof UUIColorSwatchElement
   */
  get isLight() {
    return this.color?.isLight() ?? false;
  }

  constructor() {
    super();
    this.addEventListener('click', this._setAriaAttributes);
  }

  private _initializeColor() {
    this._color = new Colord(this.value ?? '');
    if (!this._color.isValid()) {
      this.disabled = true;
      console.error(
        `Invalid color provided to uui-color-swatch: ${this.value}`
      );
    }
  }

  private _setAriaAttributes() {
    if (this.selectable)
      this.setAttribute('aria-checked', this.selected.toString());
  }

  firstUpdated() {
    this._initializeColor();
    this._setAriaAttributes();
  }

  willUpdate(changedProperties: Map<string, any>) {
    if (changedProperties.has('value')) {
      this._initializeColor();
    }
    if (changedProperties.has('disabled')) {
      if (this.selectable) {
        this.selectable = !this.disabled;
        this.unselectable = !this.disabled;
      }
    }
    if (
      changedProperties.has('selectable') ||
      changedProperties.has('selected')
    ) {
      this._setAriaAttributes();
    }
  }

  render() {
    return html`
      <button
        id="swatch"
        aria-label=${this.label}
        aria-disabled="${this.disabled}"
        title="${this.label}">
        <div
          class=${classMap({
            'color-swatch': true,
            'color-swatch--transparent-bg': true,
            'color-swatch--light': this.isLight,
            'color-swatch--big': this.showLabel,
          })}>
          <div
            class="color-swatch__color"
            style=${styleMap({ backgroundColor: this.value })}></div>
          <div class="color-swatch__check">${iconCheck}</div>
        </div>
        ${this._renderWithLabel()}
      </button>
    `;
  }

  private _renderWithLabel() {
    if (!this.showLabel) return nothing;
    return html`<div class="color-swatch__label">
      <strong>${this.renderLabel()}</strong>
      ${this.value}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-color-swatch': UUIColorSwatchElement;
  }
}
