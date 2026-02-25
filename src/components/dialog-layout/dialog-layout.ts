import { defineElement } from '../../internal/registration/index.js';
import { UUIDialogLayoutElement } from './dialog-layout.element.js';

export * from './dialog-layout.element.js';

export default UUIDialogLayoutElement;

defineElement('uui-dialog-layout', UUIDialogLayoutElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-dialog-layout': UUIDialogLayoutElement;
  }
}
