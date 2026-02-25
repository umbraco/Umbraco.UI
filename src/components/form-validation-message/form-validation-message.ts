import { defineElement } from '../../internal/registration/index.js';
import { UUIFormValidationMessageElement } from './form-validation-message.element.js';

defineElement('uui-form-validation-message', UUIFormValidationMessageElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-form-validation-message': UUIFormValidationMessageElement;
  }
}

export * from './form-validation-message.element.js';
export { UUIFormValidationMessageElement as default } from './form-validation-message.element.js';
