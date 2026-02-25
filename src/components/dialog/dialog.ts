import { defineElement } from '../../internal/registration/index.js';
import { UUIDialogElement } from './dialog.element.js';

export * from './dialog.element.js';

defineElement('uui-dialog', UUIDialogElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-dialog': UUIDialogElement;
  }
}
