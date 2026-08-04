import type { LitElement } from 'lit';
import {
  UUIFormControlBaseMixin,
  type UUIFormControlBaseMixinElement,
  type UUIFormControlBaseMixinInterface,
} from './FormControlMixin.js';
import { property } from 'lit/decorators.js';

type HTMLElementConstructor<T = HTMLElement> = new (...args: any[]) => T;

/**
 * @internal
 */
export interface UUIFormControlWithBasicsMixinInterface<
  ValueType,
> extends UUIFormControlBaseMixinInterface<ValueType> {
  /**
   * Submits the form that this element is a part of. If the element is not part of a form, or if the form has no submit button, this method does nothing.
   */
  submit(): void;
}

/**
 * @internal
 */
export interface UUIFormControlWithBasicsMixinElement<
  ValueType,
> extends UUIFormControlBaseMixinElement<ValueType> {
  name: string;
  required: boolean;
  requiredMessage: string;
  error: boolean;
  errorMessage: string;
  /**
   * Submits the form that this element is a part of. If the element is not part of a form, or if the form has no submit button, this method does nothing.
   */
  submit(): void;
}
/**
 * The mixin allows a custom element to participate in HTML forms.
 *
 * @param {Object} superClass - superclass to be extended.
 * @mixin
 * @internal
 */
export const UUIFormControlWithBasicsMixin = <
  ValueType = FormDataEntryValue | FormData,
  T extends HTMLElementConstructor<LitElement> = typeof LitElement,
  DefaultValueType = undefined,
>(
  superClass: T,
  defaultValue?: DefaultValueType,
) => {
  /**
   * @internal
   */
  abstract class UUIFormControlWithBasicsMixinClass
    extends UUIFormControlBaseMixin<ValueType, T, DefaultValueType>(
      superClass,
      defaultValue,
    )
    implements
      UUIFormControlWithBasicsMixinElement<ValueType | DefaultValueType>
  {
    /**
     * This is a name property of the component.
     * @type {string}
     * @attr
     * @default ''
     */
    @property({ type: String })
    name = '';

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

    constructor(...args: unknown[]) {
      super(...args);

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
    }

    /**
     * Submits the form that this element is a part of. If the element is not part of a form, or if the form has no submit button, this method does nothing.
     */
    submit() {
      this._internals.form?.requestSubmit();
    }
  }

  return UUIFormControlWithBasicsMixinClass as unknown as HTMLElementConstructor<
    UUIFormControlWithBasicsMixinElement<ValueType | DefaultValueType>
  > &
    T;
};

/**
 * The v1 names for this mixin and its types. `UUIFormControlMixin` has the
 * same surface as it had in v1 (`name`, `required`, `requiredMessage`,
 * `error`, `errorMessage`, `submit()` and the built-in `valueMissing` and
 * `customError` validators). The lean core it builds on is exported as
 * `UUIFormControlBaseMixin`.
 */
export {
  UUIFormControlWithBasicsMixin as UUIFormControlMixin,
  type UUIFormControlWithBasicsMixinElement as UUIFormControlMixinElement,
  type UUIFormControlWithBasicsMixinInterface as UUIFormControlMixinInterface,
};
