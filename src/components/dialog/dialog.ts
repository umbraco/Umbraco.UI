import { defineElement } from '../../internal/registration/index.js';
import { UUIDialogElement } from './dialog.element.js';

defineElement('uui-dialog', UUIDialogElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-dialog': UUIDialogElement;
  }
}

export * from './dialog.element.js';
export { UUIDialogElement as default } from './dialog.element.js';
