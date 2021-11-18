import { LitElement, html, css, TemplateResult } from 'lit';
import { property, query } from 'lit/decorators.js';
import { FormControlMixin, LabelMixin } from '../mixins';
import { UUIBooleanInputEvent } from './UUIBooleanInputEvent';

type LabelPosition = 'left' | 'right' | 'top' | 'bottom';

/**
 * Base class wrapping native input type="checkbox". Extend if you need to make a custom boolean input. Change the role of the input by passing a 'checkbox' || 'switch' to the super() when extending this class. Default is checkbox. Extending this class will make your element formAssociated, meaning it can participate in the native form element.
 * @extends LabelMixin
 * @fires UUIBooleanInputEvent#change on change
 * @abstract
 */
export abstract class UUIBooleanInputBaseElement extends FormControlMixin(
  LabelMixin('', LitElement)
) {
  static styles = [
    css`
      :host {
        display: inline-block;
      }

      label {
        cursor: pointer;
        user-select: none;

        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-items: center;
        gap: var(--uui-size-3);
      }

      input {
        position: absolute;
        height: 0px;
        width: 0px;
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

      :host([disabled]) .label {
        opacity: 0.5;
      }
    `,
  ];

  private inputRole: 'checkbox' | 'switch';

  constructor(inputRole: 'checkbox' | 'switch' = 'checkbox') {
    super();
    this._value = 'on';
    this.inputRole = inputRole;
  }

  @query('#input')
  protected _input!: HTMLInputElement;

  /**
   * This is a value property of the uui-checkbox or the uui-toggle component.
   * The default value of this property is 'on'.
   * It reflects the behaviour of the native input type="checkbox" element and its value attribute.
   * @type {string}
   * @attr
   * @default on
   */
  @property({ type: String })
  get value() {
    return this._value;
  }

  set value(newVal) {
    const oldValue = this._value;
    this._value = newVal;
    this._internals.setFormValue(
      this._checked && this.name !== '' ? this._value : null
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

  /**
   * Set to true to hide the labeling provided by the component.
   * @type {boolean}
   * @attr hide-label
   * @default false
   */
  @property({ type: Boolean, attribute: 'hide-label', reflect: true })
  hideLabel = false;

  private _checked = false;

  /**
   * Reflects the state of the element.
   * True if checkbox or toggle is checked. Change this to switch the state programmatically.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  get checked() {
    return this._checked;
  }

  set checked(newVal) {
    const oldValue = this._checked;
    this._checked = newVal;
    this._internals.setFormValue(
      this._checked && this.name !== ''
        ? this._value
          ? this._value
          : 'on'
        : null
    );
    this.requestUpdate('checked', oldValue);
  }

  private _onInputChange() {
    this.checked = this._input.checked;
    this.dispatchEvent(
      new UUIBooleanInputEvent(UUIBooleanInputEvent.CHANGE, { bubbles: true })
    );
  }

  updated() {
    this._setValidity();
  }

  // Validation
  private _validityState: any = {};

  /**
   * Set to true to show validation errors
   * @type {boolean}
   * @attr show-validation
   * @default false
   */
      @property({ type: Boolean, attribute: 'show-validation', reflect: true })
      showValidation = false;

  /**
   * Set to true if the component should be required.
   * Property is reflected to the corresponding attribute.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Set to true if the component should have an error state.
   * Property is reflected to the corresponding attribute.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  private _setValidity() {
    // check for required
    if (this.required && !this.checked) {
      this._validityState.valueMissing = true;
      this._internals.setValidity(
        this._validityState,
        'The field is required',
        this._input
      );
    } else {
      this._validityState.valueMissing = false;
    }

    // check for custom error
    if (this.error) {
      this._validityState.customError = true;
      this._internals.setValidity(
        this._validityState,
        'The field is invalid',
        this._input
      );
    } else {
      this._validityState.customError = false;
    }

    const hasError = Object.values(this._validityState).includes(true);

    if (hasError === false) {
      this._internals.setValidity({});
    }
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
          type="checkbox"
          id="input"
          ?disabled="${this.disabled}"
          @change="${this._onInputChange}"
          .checked="${this.checked}"
          aria-checked="${this.checked ? 'true' : 'false'}"
          aria-label=${this.label}
          role="${this.inputRole}" />
        ${this.renderCheckbox()}
        ${this.hideLabel === false ? this.renderLabel() : ''}
      </label>
    `;
  }
}
