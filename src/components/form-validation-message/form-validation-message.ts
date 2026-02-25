import { defineElement } from '../../internal/registration/index.js';
import { UUIFormValidationMessageElement } from './form-validation-message.element.js';

export * from './form-validation-message.element.js';

export default UUIFormValidationMessageElement;

defineElement('uui-form-validation-message', UUIFormValidationMessageElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-form-validation-message': UUIFormValidationMessageElement;
  }
}
