import {
  UUIFormControlMixin,
  LabelMixin,
} from '../../internal/mixins/index.js';
import type { TemplateResult } from 'lit';
import { css, html, LitElement } from 'lit';
import { property, query } from 'lit/decorators.js';

import { UUIBooleanInputEvent } from './UUIBooleanInputEvent.js';

type LabelPosition = 'left' | 'right' | 'top' | 'bottom';

/**
 * Base class wrapping native input type="checkbox". Extend for custom boolean input.
 * @extends LabelMixin
 * @fires UUIBooleanInputEvent#change on change
 * @abstract
 */
export abstract class UUIBooleanInputElement extends UUIFormControlMixin(
  LabelMixin('', LitElement),
  '',
) {
  private _value = '';

  /** intentional overwrite of FormControlMixins value getter and setter method. */
  get value() {
    return this._value;
  }
  set value(newVal: string) {
    const oldValue = super.value;
    this._value = newVal;
    this._internals.setFormValue(
      this._checked && this.name !== '' ? this._value : null,
    );

    this.requestUpdate('value', oldValue);
  }

  /**
   * Specifies the label position of the checkbox or the toggle
   * @type {'left' | 'right' | 'top' | 'bottom'}
   * @attr label-position
   * @default right
   */
  @property({ type: String, attribute: 'label-position', reflect: true })
  labelPosition: LabelPosition = 'right';

  private _checked = false;

  /**
   * Reflects the state of the element.
   * True if checkbox or toggle is checked. Change this to switch the state programmatically.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean }) // Do not 'reflect' as the attribute is used as fallback.
  get checked() {
    return this._checked;
  }
  set checked(newVal) {
    const oldValue = this._checked;
    this._checked = newVal;
    this._internals.setFormValue(
      this._checked && this.name !== '' ? this._value || 'on' : null,
    );
    this.requestUpdate('checked', oldValue);
  }

  /**
   * Indeterminate state for the input.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  /**
   * Disables the input.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Sets the input to readonly mode, meaning value cannot be changed but still able to read and select its content.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  @query('#input')
  protected _input!: HTMLInputElement;

  private inputRole: 'checkbox' | 'switch';

  constructor(inputRole: 'checkbox' | 'switch' = 'checkbox') {
    super();
    if (this._value === '') {
      this._value = 'on';
    }
    this.inputRole = inputRole;
    this.addEventListener('keydown', this.#onKeyDown);
  }

  protected getFormElement(): HTMLInputElement {
    return this._input;
  }

  #onKeyDown(e: KeyboardEvent): void {
    if (e.key == 'Enter') {
      this.submit();
    }
  }

  public hasValue(): boolean {
    return this.checked;
  }

  public formResetCallback() {
    super.formResetCallback();
    this.checked = this.hasAttribute('checked');
  }

  /**
   * This method enables <label for="..."> to focus the input
   */
  async focus() {
    await this.updateComplete;
    this._input.focus();
  }
  async click() {
    await this.updateComplete;
    this._input.click();
  }

  private _onInputChange(e: Event) {
    e.stopPropagation();
    this.pristine = false;
    this.checked = this._input.checked;
    this.indeterminate = this._input.indeterminate;
    this.dispatchEvent(new UUIBooleanInputEvent(UUIBooleanInputEvent.CHANGE));
  }

  /**
   * When extending UUIBooleanInputBase class you need to implement this abstract method. It should return a template of your input.
   * @returns {TemplateResult}
   * @abstract
   * @method
   */
  protected abstract renderCheckbox(): TemplateResult;

  render() {
    return html`
      <label>
        <input
          id="input"
          type="checkbox"
          @change="${this._onInputChange}"
          .disabled=${this.disabled || this.readonly}
          .checked=${this.checked}
          .indeterminate=${this.indeterminate}
          aria-checked="${this.checked ? 'true' : 'false'}"
          aria-label=${this.label}
          role="${this.inputRole}" />
        ${this.renderCheckbox()} ${this.renderLabel()}
      </label>
    `;
  }

  static override readonly styles = [
    css`
      :host {
        display: inline-block;
      }

      label {
        position: relative;
        cursor: pointer;
        user-select: none;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-items: center;
        gap: var(--uui-size-3);
      }

      :host([readonly]) label {
        cursor: default;
      }

      input {
        position: absolute;
        height: 0px;
        width: 0px;
        opacity: 0;
      }

      :host([label-position='left']) label {
        flex-direction: row-reverse;
      }

      :host([label-position='top']) label {
        gap: var(--uui-size-half-base-unit);
        flex-direction: column-reverse;
      }

      :host([label-position='bottom']) label {
        gap: var(--uui-size-half-base-unit);
        flex-direction: column;
      }

      :host([disabled]) label {
        cursor: not-allowed;
        opacity: 0.5;
      }

      .label {
        display: block;
      }

      span.label:empty {
        display: none;
      }
    `,
  ];
}
