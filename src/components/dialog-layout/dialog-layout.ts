import { defineElement } from '../../internal/registration/index.js';
import { UUIDialogLayoutElement } from './dialog-layout.element.js';

defineElement('uui-dialog-layout', UUIDialogLayoutElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-dialog-layout': UUIDialogLayoutElement;
  }
}

export * from './dialog-layout.element.js';
export { UUIDialogLayoutElement as default } from './dialog-layout.element.js';
