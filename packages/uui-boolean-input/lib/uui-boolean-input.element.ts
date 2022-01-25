import { LitElement, html, css, TemplateResult } from 'lit';
import { property, query } from 'lit/decorators.js';
import { FormControlMixin, LabelMixin } from '@umbraco-ui/uui-base/lib/mixins';
import { UUIBooleanInputEvent } from './UUIBooleanInputEvent';

type LabelPosition = 'left' | 'right' | 'top' | 'bottom';

/**
 * Base class wrapping native input type="checkbox". Extend for custom boolean input.
 * @extends LabelMixin
 * @fires UUIBooleanInputEvent#change on change
 * @abstract
 */
export abstract class UUIBooleanInputElement extends FormControlMixin(
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

  @query('#input')
  protected _input!: HTMLInputElement;

  get value() {
    return this._value as string;
  }
  set value(newVal: string) {
    const oldValue = this._value;
    this._value = newVal;

    if (
      'ElementInternals' in window &&
      //@ts-ignore
      'setFormValue' in window.ElementInternals.prototype
    ) {
      this._internals.setFormValue(
        this._checked && this.name !== '' ? this._value : null
      );
    }

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
   * Force error style on this input.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  /*
   * This is a static class field indicating that the element is can be used inside a native form and participate in its events. It may require a polyfill, check support here https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals.  Read more about form controls here https://web.dev/more-capable-form-controls/
   * @type {boolean}
   */
  static readonly formAssociated = true;

  private inputRole: 'checkbox' | 'switch';

  constructor(inputRole: 'checkbox' | 'switch' = 'checkbox') {
    super();
    if (this._value === '') {
      this._value = 'on';
    }
    this.inputRole = inputRole;
  }

  protected firstUpdated(): void {
    const labelEl = this.shadowRoot?.querySelector('label') as HTMLLabelElement;

    // hide outline if mouse-interaction:
    let hadMouseDown = false;
    this._input.addEventListener('blur', () => {
      if (hadMouseDown === false) {
        this.style.setProperty('--uui-show-focus-outline', '1');
      }
      hadMouseDown = false;
    });
    labelEl.addEventListener('mousedown', () => {
      this.style.setProperty('--uui-show-focus-outline', '0');
      hadMouseDown = true;
    });
    labelEl.addEventListener('mouseup', () => {
      hadMouseDown = false;
    });
  }

  /**
   * This method enables <label for="..."> to focus the input
   */
  focus() {
    (this.shadowRoot?.querySelector('#input') as any).focus();
  }
  click() {
    (this.shadowRoot?.querySelector('#input') as any).click();
  }

  private _onInputChange() {
    this.checked = this._input.checked;
    this.dispatchEvent(new UUIBooleanInputEvent(UUIBooleanInputEvent.CHANGE));
  }

  updated() {
    this._setValidity();
  }

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
        ${this.renderCheckbox()} ${this.renderLabel()}
      </label>
    `;
  }
}
