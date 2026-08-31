import { defineElement } from '../../internal/registration/index.js';
import { UUIInputOtpElement } from './input-otp.element.js';

defineElement('uui-input-otp', UUIInputOtpElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-input-otp': UUIInputOtpElement;
  }
}

export * from './input-otp.element.js';
