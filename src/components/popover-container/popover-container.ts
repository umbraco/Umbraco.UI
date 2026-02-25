import { defineElement } from '../../internal/registration/index.js';
import { UUIPopoverContainerElement } from './popover-container.element.js';

export * from './popover-container.element.js';

export default UUIPopoverContainerElement;

defineElement('uui-popover-container', UUIPopoverContainerElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-popover-container': UUIPopoverContainerElement;
  }
}
