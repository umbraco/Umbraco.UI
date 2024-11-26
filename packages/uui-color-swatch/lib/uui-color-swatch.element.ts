import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property } from 'lit/decorators.js';
import { css, html, LitElement, nothing } from 'lit';
import { ref } from 'lit/directives/ref.js';
import { iconCheck } from '@umbraco-ui/uui-icon-registry-essential/lib/svgs';
import {
  ActiveMixin,
  LabelMixin,
  SelectableMixin,
} from '@umbraco-ui/uui-base/lib/mixins';

/**
 * Color swatch, can have label and be selectable, disabled or readonly.
 *
 * @element uui-color-swatch
 * @cssprop --uui-swatch-size - The size of the swatch.
 * @cssprop --uui-swatch-border-width - The width of the border.
 * @cssprop --uui-swatch-color - The width of the border.
 * @slot label - Default slot for the label.
 */
@defineElement('uui-color-swatch')
export class UUIColorSwatchElement extends LabelMixin(
  'label',
  SelectableMixin(ActiveMixin(LitElement)),
) {
  /**
   * Value of the swatch. This will become the color value if color is left undefined, see the property `color` for more details.
   */
  @property()
  get value(): string {
    return this._value ?? '';
  }
  set value(newValue: string) {
    const oldValue = this._value;
    this._value = newValue;
    this.requestUpdate('value', oldValue);
  }
  private _value?: string;

  /**
   * Color of the swatch. Should be a valid hex, hexa, rgb, rgba, hsl or hsla string. Should fulfill this [css spec](https://www.w3.org/TR/css-color-4/#color-type). If not provided element will look at its text content.
   */
  @property()
  get color(): string | undefined {
    return this._color;
  }
  set color(newValue: string) {
    const oldValue = this._color;
    this._color = newValue;
    this.requestUpdate('color', oldValue);
  }
  private _color?: string;

  /**
   * Sets the swatch to disabled.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Sets the swatch to readonly mode.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  readonly: boolean = false;

  /**
   * When true shows element label below the color checkbox
   *
   * @attr
   * @memberof UUIColorSwatchElement
   */
  @property({ type: Boolean, attribute: 'show-label', reflect: true })
  showLabel = false;

  constructor() {
    super();
    this.addEventListener('click', this._setAriaAttributes);
  }

  private _setAriaAttributes() {
    if (this.selectable)
      this.setAttribute('aria-checked', this.selected.toString());
  }

  firstUpdated() {
    this._setAriaAttributes();
  }

  willUpdate(changedProperties: Map<string, any>) {
    if (
      changedProperties.has('disabled') ||
      changedProperties.has('readonly')
    ) {
      if (this.selectable) {
        this.selectable = !this.disabled && !this.readonly;
        this.deselectable = !this.disabled && !this.readonly;
      }
    }
    if (
      changedProperties.has('selectable') ||
      changedProperties.has('selected')
    ) {
      this._setAriaAttributes();
    }
  }

  #selectButtonChanged(button?: Element | undefined) {
    this.selectableTarget = button || this;
  }

  render() {
    return html`
      <button
        id="swatch"
        ${ref(this.#selectButtonChanged)}
        aria-label=${this.label}
        ?disabled="${this.disabled}"
        title="${this.label}">
        <div class="color-swatch color-swatch--transparent-bg">
          <div
            class="color-swatch__color"
            style="background-color: var(--uui-swatch-color, ${this.color ??
            this.value})"></div>
          <div
            class="color-swatch__check"
            style="color: var(--uui-swatch-color, ${this.color ?? this.value})">
            ${iconCheck}
          </div>
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
        opacity: 0.5;
      }

      :host([readonly]) {
        cursor: default;
      }

      #swatch {
        cursor: inherit;
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
        border: var(--uui-swatch-border-width, 2px) solid
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

      :host([show-label]) .color-swatch {
        width: 120px;
        height: 50px;
      }

      .color-swatch.color-swatch--transparent-bg {
        background-image: linear-gradient(
            45deg,
            var(--uui-palette-grey) 25%,
            transparent 25%
          ),
          linear-gradient(45deg, transparent 75%, var(--uui-palette-grey) 75%),
          linear-gradient(45deg, transparent 75%, var(--uui-palette-grey) 75%),
          linear-gradient(45deg, var(--uui-palette-grey) 25%, transparent 25%);
        background-size: 10px 10px;
        background-position:
          0 0,
          0 0,
          -5px -5px,
          5px 5px;
      }
      .color-swatch__color {
        width: 100%;
        height: 100%;
        border: 1px solid rgba(0, 0, 0, 0.125);
        border-radius: inherit;
        box-sizing: border-box;
      }

      :host([show-label]) .color-swatch__color {
        border-radius: 3px 3px 0 0;
      }

      .color-swatch__check {
        position: absolute;
        vertical-align: middle;
        width: calc(var(--uui-swatch-size, 25px) / 2);
        height: calc(var(--uui-swatch-size, 25px) / 2);
        line-height: 0;
        filter: invert(1) grayscale(1) contrast(9);
        pointer-events: none;
        opacity: 0;
      }

      :host([selected]) .color-swatch__check {
        opacity: 1;
      }

      slot[name='label']::slotted(*),
      .label {
        font-size: var(--uui-size-4);
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
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-color-swatch': UUIColorSwatchElement;
  }
}
