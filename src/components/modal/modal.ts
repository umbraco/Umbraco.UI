import { defineElement } from '../../internal/registration/index.js';
import { UUIModalDialogElement } from './modal-dialog.element.js';
import { UUIModalSidebarElement } from './modal-sidebar.element.js';
import { UUIModalContainerElement } from './modal-container.js';
import { UUIModalElement } from './modal.element.js';

export * from './modal-dialog.element.js';
export * from './modal-sidebar.element.js';
export * from './modal.element.js';
export * from './modal-container.js';

export default UUIModalElement;

defineElement('uui-modal-dialog', UUIModalDialogElement);
defineElement('uui-modal-sidebar', UUIModalSidebarElement);
defineElement('uui-modal-container', UUIModalContainerElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-modal-dialog': UUIModalDialogElement;
    'uui-modal-sidebar': UUIModalSidebarElement;
    'uui-modal-container': UUIModalContainerElement;
  }
}
