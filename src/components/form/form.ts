import { defineElement } from '../../internal/registration/index.js';
import { UUIFormElement } from './form.element.js';

export * from './form.element.js';

export default UUIFormElement;

defineElement('uui-form', UUIFormElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-form': UUIFormElement;
  }
}
