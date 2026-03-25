import { css, html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ActiveMixin, SelectableMixin } from '../../internal/mixins/index.js';

/**
 * @element uui-combobox-list-option
 * @slot - For option content
 * @description - An option to be used within uui-combobox-list
 */
export class UUIComboboxListOptionElement extends SelectableMixin(
  ActiveMixin(LitElement),
) {
  private _value: string | undefined;

  @state()
  private _disabled = false;

  @state() _displayValue = '';

  @property({ type: Boolean, reflect: true })
  multiple = false;

  /**
   * Value of the option.
   * @type {string}
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
   * @type {string}
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
   * @type {boolean}
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

  constructor() {
    super();
    this.selectable = true;
    this.deselectable = false;
  }

  render() {
    return html`${this.multiple ? html`<span id="checkbox"></span>` : nothing}
      <slot></slot>`;
  }

  static override readonly styles = [
    css`
      :host {
        position: relative;
        cursor: pointer;
        margin: 1px var(--uui-size-2);
        border-radius: var(--uui-border-radius);
        outline: 2px solid transparent;
        outline-offset: -2px;
        padding: var(--uui-size-1);
        padding-left: var(--uui-size-2);
      }

      :host(:first-child) {
        margin-top: 6px;
      }
      :host(:last-child) {
        margin-bottom: 6px;
      }

      :host([selected]):host([active])::after {
        display: block;
        content: '';
        position: absolute;
        inset: 0px;
        outline: var(--uui-color-surface) solid 2px;
        outline-offset: -4px;
      }
      /*
      :host::before {
        display: block;
        content: '';
        opacity: 0;
        position: absolute;
        inset: 0;
        background-color: var(--uui-color-selected);
      }

      :host(:hover)::before {
        opacity: 0.15;
        border-radius: var(--uui-border-radius);
      } */

      :host(:hover) {
        background-color: var(--uui-color-surface-emphasis);
        color: var(--uui-color-interactive-emphasis);
      }

      :host([disabled]) {
        cursor: auto;
        color: var(--uui-color-disabled-contrast);
        background-color: var(--uui-color-disabled);
      }

      :host([disabled]:hover) {
        background-color: var(--uui-color-disabled);
      }

      :host([active]) {
        outline-color: var(--uui-color-focus);
      }

      :host([selected]:not([multiple])) {
        color: var(--uui-color-selected-contrast);
        background-color: var(--uui-color-selected);
      }

      :host([selected]:not([multiple]):hover) {
        color: var(--uui-color-selected-contrast);
        background-color: var(--uui-color-selected-emphasis);
      }
      :host([selected][disabled]) {
        color: var(--uui-color-disabled-contrast);
        background-color: var(--uui-color-disabled);
      }

      #checkbox {
        display: inline-block;
        width: 16px;
        height: 16px;
        min-width: 16px;
        border: 2px solid var(--uui-color-border-standalone);
        border-radius: 3px;
        margin-right: var(--uui-size-2);
        vertical-align: middle;
        box-sizing: border-box;
        position: relative;
      }

      :host([selected]) #checkbox {
        background-color: var(--uui-color-selected);
        border-color: var(--uui-color-selected);
      }

      :host([selected]) #checkbox::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 2px;
        margin: auto;
        width: 4px;
        height: 8px;
        border: solid var(--uui-color-selected-contrast);
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    `,
  ];
}
