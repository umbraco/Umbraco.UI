import { defineElement } from '../../internal/registration/index.js';
import { UUIPopoverContainerElement } from './popover-container.element.js';

defineElement('uui-popover-container', UUIPopoverContainerElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-popover-container': UUIPopoverContainerElement;
  }
}

export * from './popover-container.element.js';
export { UUIPopoverContainerElement as default } from './popover-container.element.js';
