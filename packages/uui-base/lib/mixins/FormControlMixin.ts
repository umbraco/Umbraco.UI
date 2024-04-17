import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { UUIFormControlEvent } from '../events';

type HTMLElementConstructor<T = HTMLElement> = new (...args: any[]) => T;

type NativeFormControlElement = HTMLInputElement; // Eventually use a specific interface or list multiple options like appending these types: ... | HTMLTextAreaElement | HTMLSelectElement

/* FlagTypes type options originate from:
 * https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
 * */
type FlagTypes =
  | 'badInput'
  | 'customError'
  | 'patternMismatch'
  | 'rangeOverflow'
  | 'rangeUnderflow'
  | 'stepMismatch'
  | 'tooLong'
  | 'tooShort'
  | 'typeMismatch'
  | 'valueMissing'
  | 'badInput'
  | 'valid';

// Acceptable as an internal interface/type, BUT if exposed externally this should be turned into a public class in a separate file.
interface UUIFormControlValidatorConfig {
  flagKey: FlagTypes;
  getMessageMethod: () => string;
  checkMethod: () => boolean;
}

export declare abstract class UUIFormControlMixinInterface<
  ValueType,
  DefaultValueType,
> extends LitElement {
  formAssociated: boolean;
  protected _internals: ElementInternals;
  protected _runValidators(): void;
  get value(): ValueType | DefaultValueType;
  set value(newValue: ValueType | DefaultValueType);
  name: string;
  formResetCallback(): void;
  checkValidity(): boolean;
  get validationMessage(): string;
  get validity(): ValidityState;
  public setCustomValidity(error: string): void;
  public submit(): void;
  protected abstract getFormElement(): HTMLElement | undefined | null; // allows for null as it makes it simpler to just implement a querySelector as that might return null. [NL]
  focusFirstInvalidElement(): void;
  protected addValidator: (
    flagKey: FlagTypes,
    getMessageMethod: () => string,
    checkMethod: () => boolean,
  ) => void;
  protected addFormControlElement(element: NativeFormControlElement): void;
  pristine: boolean;
  required: boolean;
  requiredMessage: string;
  error: boolean;
  errorMessage: string;
}

/**
 * The mixin allows a custom element to participate in HTML forms.
 *
 * @param {Object} superClass - superclass to be extended.
 * @mixin
 */
export const UUIFormControlMixin = <
  ValueType = FormDataEntryValue | FormData,
  T extends
    HTMLElementConstructor<HTMLElement> = HTMLElementConstructor<HTMLElement>,
  DefaultValueType = undefined,
>(
  superClass: T,
  defaultValue: DefaultValueType = undefined as DefaultValueType,
) => {
  abstract class UUIFormControlMixinClass extends superClass {
    /**
     * This is a static class field indicating that the element is can be used inside a native form and participate in its events.
     * It may require a polyfill, check support here https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals.
     * Read more about form controls here https://web.dev/more-capable-form-controls/
     * @type {boolean}
     */
    static readonly formAssociated = true;

    /**
     * This is a name property of the component.
     * @type {string}
     * @attr
     * @default ''
     */
    @property({ type: String })
    name = '';

    /**
     * Value of this form control.
     * If you dont want the setFormValue to be called on the ElementInternals, then prevent calling this method, by not calling super.value = newValue in your implementation of the value setter method.
     * @type {string}
     * @attr value
     * @default ''
     */
    @property() // Do not 'reflect' as the attribute is used as fallback.
    get value(): ValueType | DefaultValueType {
      return this.#value;
    }
    set value(newValue: ValueType | DefaultValueType) {
      const oldValue = this.#value;
      this.#value = newValue;
      if (
        'ElementInternals' in window &&
        'setFormValue' in window.ElementInternals.prototype
      ) {
        this._internals.setFormValue((this.#value as any) ?? null);
      }
      this.requestUpdate('value', oldValue);
    }

    // Validation
    #validity: any = {};

    /**
     * Determines wether the form control has been touched or interacted with, this determines wether the validation-status of this form control should be made visible.
     * @type {boolean}
     * @attr
     * @default true
     */
    @property({ type: Boolean, reflect: true })
    public set pristine(value: boolean) {
      if (this._pristine !== value) {
        this._pristine = value;
        this.#dispatchValidationState();
      }
    }
    public get pristine(): boolean {
      return this._pristine;
    }
    private _pristine: boolean = true;

    /**
     * Apply validation rule for requiring a value of this form control.
     * @attr
     * @default false
     */
    @property({ type: Boolean, reflect: true })
    required = false;

    /**
     * Required validation message.
     * @attr
     */
    @property({ type: String, attribute: 'required-message' })
    requiredMessage = 'This field is required';

    /**
     * Apply custom error on this input.
     * @attr
     */
    @property({ type: Boolean, reflect: true })
    error = false;

    /**
     * Custom error message.
     * @attr
     */
    @property({ type: String, attribute: 'error-message' })
    errorMessage = 'This field is invalid';

    #value: ValueType | DefaultValueType = defaultValue;
    protected _internals: ElementInternals;
    #form: HTMLFormElement | null = null;
    #validators: UUIFormControlValidatorConfig[] = [];
    #formCtrlElements: NativeFormControlElement[] = [];

    constructor(...args: any[]) {
      super(...args);
      this._internals = this.attachInternals();

      this.addValidator(
        'valueMissing',
        () => this.requiredMessage,
        () => this.hasAttribute('required') && this.hasValue() === false,
      );
      this.addValidator(
        'customError',
        () => this.errorMessage,
        () => this.error,
      );

      this.addEventListener('blur', () => {
        this.pristine = false;
        this.checkValidity();
      });
    }

    /**
     * Determine wether this FormControl has a value.
     * @method hasValue
     * @returns {boolean}
     */
    public hasValue(): boolean {
      return this.value !== this.getDefaultValue();
    }

    /**
     * Get internal form element.
     * This has to be implemented to provide a FormControl Element of choice for the given context. The element is used as anchor for validation-messages.
     * @abstract
     * @method getFormElement
     * @returns {HTMLElement | undefined}
     */
    protected abstract getFormElement(): HTMLElement | undefined;

    /**
     * Focus first element that is invalid.
     * @method focusFirstInvalidElement
     * @returns {HTMLElement | undefined}
     */
    focusFirstInvalidElement() {
      const firstInvalid = this.#formCtrlElements.find(
        el => el.validity.valid === false,
      );
      if (firstInvalid) {
        if ('focusFirstInvalidElement' in firstInvalid) {
          (firstInvalid as any).focusFirstInvalidElement();
        } else {
          firstInvalid.focus();
        }
      } else {
        this.focus();
      }
    }

    disconnectedCallback(): void {
      super.disconnectedCallback();
      this.#removeFormListeners();
    }
    #removeFormListeners() {
      if (this.#form) {
        this.#form.removeEventListener('submit', this.#onFormSubmit);
      }
    }

    /**
     * Add validator, to validate this Form Control.
     * See https://developer.mozilla.org/en-US/docs/Web/API/ValidityState for available Validator FlagTypes.
     *
     * @example
     * this.addValidator(
     *  'tooLong',
     *  () => 'This input contains too many characters',
     *  () => this._value.length > 10
     * );
     * @method hasValue
     * @param {FlagTypes} flagKey the type of validation.
     * @param {method} getMessageMethod method to retrieve relevant message. Is executed every time the validator is re-executed.
     * @param {method} checkMethod method to determine if this validator should invalidate this form control. Return true if this should prevent submission.
     */
    protected addValidator(
      flagKey: FlagTypes,
      getMessageMethod: () => string,
      checkMethod: () => boolean,
    ): UUIFormControlValidatorConfig {
      const obj = {
        flagKey: flagKey,
        getMessageMethod: getMessageMethod,
        checkMethod: checkMethod,
      };
      this.#validators.push(obj);
      return obj;
    }

    protected removeValidator(validator: UUIFormControlValidatorConfig) {
      const index = this.#validators.indexOf(validator);
      if (index !== -1) {
        this.#validators.splice(index, 1);
      }
    }

    /**
     * @method addFormControlElement
     * @description Important notice if adding a native form control then ensure that its value and thereby validity is updated when value is changed from the outside.
     * @param element {NativeFormControlElement} - element to validate and include as part of this form association.
     */
    protected addFormControlElement(element: NativeFormControlElement) {
      this.#formCtrlElements.push(element);
      element.addEventListener(UUIFormControlEvent.INVALID, () => {
        this._runValidators();
      });
      element.addEventListener(UUIFormControlEvent.VALID, () => {
        this._runValidators();
      });
      // If we are in validationMode/'touched'/not-pristine then we need to validate this newly added control. [NL]
      if (this._pristine === false) {
        element.checkValidity();
        // I think we could just execute validators for the new control, but now lets just run al of it again. [NL]
        this._runValidators();
      }
    }

    private _customValidityObject?: UUIFormControlValidatorConfig;

    /**
     * @method setCustomValidity
     * @description Set custom validity state, set to empty string to remove the custom message.
     * @param message {string} - The message to be shown
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/setCustomValidity|HTMLObjectElement:setCustomValidity}
     */
    protected setCustomValidity(message: string | null) {
      if (this._customValidityObject) {
        this.removeValidator(this._customValidityObject);
      }

      if (message != null && message !== '') {
        this._customValidityObject = this.addValidator(
          'customError',
          (): string => message,
          () => true,
        );
      }

      this._runValidators();
    }

    /**
     * @protected
     * @method _runValidators
     * @description Run all validators and set the validityState of this form control.
     * Run this method when you want to re-run all validators.
     * This can be relevant if you have a validators that is using values that is not triggering the Lit Updated Callback.
     * Such are mainly properties that are not declared as a Lit state and or Lit property.
     */
    protected _runValidators() {
      this.#validity = {};
      const messages: Set<string> = new Set();
      let innerFormControlEl: NativeFormControlElement | undefined = undefined;

      // Loop through inner native form controls to adapt their validityState. [NL]
      this.#formCtrlElements.forEach(formCtrlEl => {
        let key: keyof ValidityState;
        for (key in formCtrlEl.validity) {
          if (key !== 'valid' && formCtrlEl.validity[key]) {
            this.#validity[key] = true;
            messages.add(formCtrlEl.validationMessage);
            innerFormControlEl ??= formCtrlEl;
          }
        }
      });

      // Loop through custom validators, currently its intentional to have them overwritten native validity. but might need to be reconsidered (This current way enables to overwrite with custom messages) [NL]
      this.#validators.forEach(validator => {
        if (validator.checkMethod()) {
          this.#validity[validator.flagKey] = true;
          messages.add(validator.getMessageMethod());
        }
      });

      const hasError = Object.values(this.#validity).includes(true);

      // https://developer.mozilla.org/en-US/docs/Web/API/ValidityState#valid
      this.#validity.valid = !hasError;

      // Transfer the new validityState to the ElementInternals. [NL]
      this._internals.setValidity(
        this.#validity,
        // Turn messages into an array and join them with a comma. [NL]:
        [...messages].join(', '),
        innerFormControlEl ?? this.getFormElement() ?? undefined,
      );

      this.#dispatchValidationState();
    }

    #dispatchValidationState() {
      // Do not fire validation events unless we are not pristine/'untouched'/not-in-validation-mode. [NL]
      if (this._pristine === true) return;
      if (this.#validity.valid) {
        this.dispatchEvent(new UUIFormControlEvent(UUIFormControlEvent.VALID));
      } else {
        this.dispatchEvent(
          new UUIFormControlEvent(UUIFormControlEvent.INVALID),
        );
      }
    }

    updated(changedProperties: Map<string | number | symbol, unknown>) {
      // @ts-expect-error We don't know if we are extending a lit-element:
      super.updated?.(changedProperties);
      this._runValidators();
    }

    #onFormSubmit = () => {
      this.pristine = false;
    };

    public submit() {
      this.#form?.requestSubmit();
    }

    public formAssociatedCallback() {
      this.#removeFormListeners();
      this.#form = this._internals.form;
      if (this.#form) {
        // This relies on the form begin a 'uui-form':
        if (this.#form.hasAttribute('submit-invalid')) {
          this.pristine = false;
        }
        this.#form.addEventListener('submit', this.#onFormSubmit);
      }
    }
    public formResetCallback() {
      this.pristine = true;
      this.value = this.getInitialValue() ?? this.getDefaultValue();
    }

    protected getDefaultValue(): DefaultValueType {
      return defaultValue;
    }
    protected getInitialValue(): ValueType | DefaultValueType {
      return this.getAttribute('value') as ValueType | DefaultValueType;
    }

    public checkValidity() {
      this.pristine = false;
      this._runValidators();

      for (const key in this.#formCtrlElements) {
        if (this.#formCtrlElements[key].checkValidity() === false) {
          return false;
        }
      }

      return this._internals?.checkValidity();
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/validity
    public get validity(): ValidityState {
      return this.#validity;
    }

    get validationMessage() {
      return this._internals?.validationMessage;
    }
  }
  return UUIFormControlMixinClass as unknown as HTMLElementConstructor<
    UUIFormControlMixinInterface<ValueType, DefaultValueType>
  > &
    T;
};
