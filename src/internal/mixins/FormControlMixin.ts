import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { UUIFormControlEvent } from '../events/index.js';

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
  | 'valid';

const WeightedErrorFlagTypes = [
  'customError',
  'valueMissing',
  'badInput',
  'typeMismatch',
  'patternMismatch',
  'rangeOverflow',
  'rangeUnderflow',
  'stepMismatch',
  'tooLong',
  'tooShort',
];

// Acceptable as an internal interface/type, BUT if exposed externally this should be turned into a public class in a separate file.
interface UUIFormControlValidatorConfig {
  flagKey: FlagTypes;
  getMessageMethod: () => string;
  checkMethod: () => boolean;
  weight: number;
}

export interface UUIFormControlBaseMixinInterface<
  ValueType,
> extends LitElement {
  addValidator: (
    flagKey: FlagTypes,
    getMessageMethod: () => string,
    checkMethod: () => boolean,
  ) => void;
  removeValidator: (obj: UUIFormControlValidatorConfig) => void;
  //static formAssociated: boolean;
  //protected getFormElement(): HTMLElement | undefined | null; // allows for null as it makes it simpler to just implement a querySelector as that might return null. [NL]
  focusFirstInvalidElement(): void;
  get value(): ValueType;
  set value(newValue: ValueType);
  hasValue(): boolean;
  formResetCallback(): void;
  checkValidity(): boolean;
  get validationMessage(): string;
  get validity(): ValidityState;
  setCustomValidity(error?: string): void;
  pristine: boolean;
}

export declare abstract class UUIFormControlBaseMixinElement<ValueType>
  extends LitElement
  implements UUIFormControlBaseMixinInterface<ValueType>
{
  protected _internals: ElementInternals;
  protected _runValidators(): void;
  addValidator: (
    flagKey: FlagTypes,
    getMessageMethod: () => string,
    checkMethod: () => boolean,
  ) => void;
  removeValidator: (obj: UUIFormControlValidatorConfig) => void;
  protected addFormControlElement(element: NativeFormControlElement): void;

  //static formAssociated: boolean;
  protected abstract getFormElement(): HTMLElement | undefined | null; // allows for null as it makes it simpler to just implement a querySelector as that might return null. [NL]
  focusFirstInvalidElement(): void;
  get value(): ValueType;
  set value(newValue: ValueType);
  hasValue(): boolean;
  formResetCallback(): void;
  checkValidity(): boolean;
  get validationMessage(): string;
  get validity(): ValidityState;
  public setCustomValidity(error: string): void;
  pristine: boolean;
}

/**
 * The mixin allows a custom element to participate in HTML forms.
 *
 * @param {Object} superClass - superclass to be extended.
 * @mixin
 */
export const UUIFormControlBaseMixin = <
  ValueType = FormDataEntryValue | FormData,
  T extends HTMLElementConstructor<LitElement> = typeof LitElement,
  DefaultValueType = undefined,
>(
  superClass: T,
  defaultValue?: DefaultValueType,
) => {
  abstract class UUIFormControlBaseMixinClass extends superClass {
    /**
     * This is a static class field indicating that the element is can be used inside a native form and participate in its events.
     * It may require a polyfill, check support here https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals.
     * Read more about form controls here https://web.dev/more-capable-form-controls/
     * @type {boolean}
     */
    static readonly formAssociated = true;

    /**
     * Value of this form control.
     * If you dont want the setFormValue to be called on the ElementInternals, then prevent calling this method, by not calling super.value = newValue in your implementation of the value setter method.
     * @type {string}
     * @attr value
     * @default ''
     */
    @property() // Do not 'reflect' as the attribute is used as fallback.
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
    get value(): ValueType | DefaultValueType {
      return this.#value;
    }

    // Validation
    #validity: any = {};

    /**
     * Determines wether the form control has been touched or interacted with, this determines wether the validation-status of this form control should be made visible.
     * @type {boolean}
     * @attr
     * @default
     */
    @property({ type: Boolean, reflect: true })
    public set pristine(value: boolean) {
      if (this._pristine !== value) {
        this._pristine = value;
        if (value) {
          // Back to pristine mode: forget the last dispatched validation state, so re-entering validation mode dispatches anew. [JOV]
          this.#lastDispatchedValidityFlag = undefined;
          this.#lastDispatchedValidationMessage = undefined;
        }
      }
    }
    public get pristine(): boolean {
      return this._pristine;
    }
    private _pristine: boolean = true;

    #value: ValueType | DefaultValueType =
      defaultValue as unknown as DefaultValueType;
    #valueOnFocus: ValueType | DefaultValueType | undefined = undefined;
    // A state to capture late edits to the value after focus has been lost, so we can trigger validation for late value changes. [NL]
    #hadFocus = false;
    protected _internals: ElementInternals;
    #form: HTMLFormElement | null = null;
    readonly #validators: UUIFormControlValidatorConfig[] = [];
    readonly #formCtrlElements: NativeFormControlElement[] = [];
    // The validation outcome of the last dispatched VALID/INVALID event. An undefined flag means nothing has been dispatched yet. [JOV]
    #lastDispatchedValidityFlag: string | undefined = undefined;
    #lastDispatchedValidationMessage: string | undefined = undefined;

    constructor(...args: any[]) {
      super(...args);
      this._internals = this.attachInternals();

      this.addEventListener('focus', () => {
        this.#valueOnFocus = this.value;
        this.#hadFocus = false;
      });
      this.addEventListener('blur', () => {
        if (this.pristine) {
          this.#hadFocus = true;
          if (this.#valueOnFocus !== this.value) {
            this.checkValidity();
          }
        }
        this.#valueOnFocus = undefined;
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
     * Add validation, to validate this Form Control.
     * See https://developer.mozilla.org/en-US/docs/Web/API/ValidityState for available Validator FlagTypes.
     * @example
     * this.addValidator(
     *  'tooLong',
     *  () => 'This input contains too many characters',
     *  () => this._value.length > 10
     * );
     * @function addValidator
     * @param {FlagTypes} flagKey the type of validation.
     * @param {method} getMessageMethod method to retrieve relevant message. Is executed every time the validator is re-executed.
     * @param {method} checkMethod method to determine if this validator should invalidate this form control. Return true if this should prevent submission.
     * @returns {UUIFormControlValidatorConfig} - The added validator configuration.
     */
    addValidator(
      flagKey: FlagTypes,
      getMessageMethod: () => string,
      checkMethod: () => boolean,
    ): UUIFormControlValidatorConfig {
      const validator = {
        flagKey: flagKey,
        getMessageMethod: getMessageMethod,
        checkMethod: checkMethod,
        weight: WeightedErrorFlagTypes.indexOf(flagKey),
      } satisfies UUIFormControlValidatorConfig;
      this.#validators.push(validator);
      // Sort validators based on the WeightedErrorFlagTypes order. [NL]
      this.#validators.sort((a, b) => a.weight - b.weight);
      return validator;
    }

    protected removeValidator(validator: UUIFormControlValidatorConfig) {
      const index = this.#validators.indexOf(validator);
      if (index !== -1) {
        this.#validators.splice(index, 1);
      }
    }

    readonly #runValidatorsCallback = () => this._runValidators();

    /**
     * @method addFormControlElement
     * @description Important notice if adding a native form control then ensure that its value and thereby validity is updated when value is changed from the outside.
     * @param element {NativeFormControlElement} - element to validate and include as part of this form association.
     */
    protected addFormControlElement(element: NativeFormControlElement) {
      if (!element) {
        throw new Error('Element is null or undefined');
      }
      if (!element.validity) {
        throw new Error('Element is not a Form Control');
      }
      if (this.#formCtrlElements.includes(element)) return;
      this.#formCtrlElements.push(element);
      element.addEventListener(
        UUIFormControlEvent.INVALID,
        this.#runValidatorsCallback,
      );
      element.addEventListener(
        UUIFormControlEvent.VALID,
        this.#runValidatorsCallback,
      );
      // If we are in validationMode/'touched'/not-pristine then we need to validate this newly added control. [NL]
      if (this._pristine === false) {
        element.checkValidity();
        // I think we could just execute validators for the new control, but now lets just run al of it again. [NL]
        this._runValidators();
      }
    }

    /**
     * @function removeFormControlElement
     * @param {NativeFormControlElement} element - element to remove as part of this form controls associated controls.
     * @returns {void}
     */
    protected removeFormControlElement(element: NativeFormControlElement) {
      const index = this.#formCtrlElements.indexOf(element);
      if (index !== -1) {
        this.#formCtrlElements.splice(index, 1);
        element.removeEventListener(
          UUIFormControlEvent.INVALID,
          this.#runValidatorsCallback,
        );
        element.removeEventListener(
          UUIFormControlEvent.VALID,
          this.#runValidatorsCallback,
        );
        if (this._pristine === false) {
          this._runValidators();
        }
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
     * @function _runValidators
     * @description Run all validators and set the validityState of this form control.
     * Run this method when you want to re-run all validators.
     * This can be relevant if you have a validators that is using values that is not triggering the Lit Updated Callback.
     * Such are mainly properties that are not declared as a Lit state and or Lit property.
     */
    protected _runValidators() {
      this.#validity = {};
      let message: string | undefined = undefined;
      let innerFormControlEl: NativeFormControlElement | undefined = undefined;

      // Loop through custom validators, currently its intentional to have them overwritten native validity. but might need to be reconsidered (This current way enables to overwrite with custom messages) [NL]
      this.#validators.some(validator => {
        if (validator.checkMethod()) {
          this.#validity[validator.flagKey] = true;
          message = validator.getMessageMethod();
          return true;
        }
        return false;
      });

      if (!message) {
        // Loop through inner native form controls to adapt their validityState. [NL]
        this.#formCtrlElements.some(formCtrlEl => {
          let key: keyof ValidityState;
          for (key in formCtrlEl.validity) {
            if (key !== 'valid' && formCtrlEl.validity[key]) {
              this.#validity[key] = true;
              message = formCtrlEl.validationMessage;
              innerFormControlEl ??= formCtrlEl;
              return true;
            }
          }
          return false;
        });
      }

      // Determine the failing flag (if any) for dispatch comparison. [JOV]
      const failingFlag = Object.keys(this.#validity).find(
        key => this.#validity[key] === true,
      );
      const currentFlag = failingFlag ?? '';
      const hasError = currentFlag !== '';

      // https://developer.mozilla.org/en-US/docs/Web/API/ValidityState#valid
      this.#validity.valid = !hasError;

      // Always transfer the new validityState to the ElementInternals, to keep both the full set of flags and the anchor element in sync. [NL]
      this._internals.setValidity(
        this.#validity,
        message,
        innerFormControlEl ?? this.getFormElement() ?? undefined,
      );

      this.#dispatchValidationState(currentFlag, message);
    }

    #dispatchValidationState(currentFlag: string, message: string | undefined) {
      // Do not fire validation events unless we are not pristine/'untouched'/not-in-validation-mode. [NL]
      if (this._pristine === true) return;
      // Skip the dispatch if the outcome is unchanged since the last dispatched event — each VALID/INVALID event cascades to parent form controls, which re-run their own validators. [JOV]
      if (
        currentFlag === this.#lastDispatchedValidityFlag &&
        message === this.#lastDispatchedValidationMessage
      ) {
        return;
      }
      this.#lastDispatchedValidityFlag = currentFlag;
      this.#lastDispatchedValidationMessage = message;
      if (this.#validity.valid) {
        this.dispatchEvent(new UUIFormControlEvent(UUIFormControlEvent.VALID));
      } else {
        this.dispatchEvent(
          new UUIFormControlEvent(UUIFormControlEvent.INVALID),
        );
      }
    }

    override updated(
      changedProperties: Map<string | number | symbol, unknown>,
    ) {
      super.updated(changedProperties);
      // If still pristine and the control has been blurred while pristine, a later value change should trigger validation (e.g. value changed after blur). [NL]
      if (this.pristine && this.#hadFocus && changedProperties.has('value')) {
        // checkValidity will set pristine to false for itself and all connected form controls and then run validators, so we skip _runValidators() below. [NL]
        this.checkValidity();
      } else {
        this._runValidators();
      }
    }

    readonly #onFormSubmit = () => {
      this.pristine = false;
    };

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
      this.#hadFocus = false;
      this.value = this.getInitialValue() ?? this.getDefaultValue();
      this.#valueOnFocus = undefined;
    }

    protected getDefaultValue(): DefaultValueType {
      return defaultValue as DefaultValueType;
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
  return UUIFormControlBaseMixinClass as unknown as HTMLElementConstructor<
    UUIFormControlBaseMixinElement<ValueType | DefaultValueType>
  > &
    T;
};
