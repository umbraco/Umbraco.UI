import { LitElement } from 'lit';
import {
  UUIFormControlMixin,
  type UUIFormControlMixinElement,
} from './FormControlMixin.js';
import { property } from 'lit/decorators.js';

type HTMLElementConstructor<T = HTMLElement> = new (...args: any[]) => T;

export interface UUIFormControlWithBasicsMixinElement<
  ValueType,
> extends UUIFormControlMixinElement<ValueType> {
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
export const UUIFormControlWithBasicsMixin = <
  ValueType = FormDataEntryValue | FormData,
  T extends HTMLElementConstructor<LitElement> = typeof LitElement,
  DefaultValueType = undefined,
>(
  superClass: T,
  defaultValue?: DefaultValueType,
) => {
  abstract class UUIFormControlWithBasicsMixinClass extends UUIFormControlMixin<
    ValueType,
    T,
    DefaultValueType
  >(superClass, defaultValue) {
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

    constructor(...args: any[]) {
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
  }

  return UUIFormControlWithBasicsMixinClass as unknown as HTMLElementConstructor<
    UUIFormControlWithBasicsMixinElement<ValueType | DefaultValueType>
  > &
    T;
};
