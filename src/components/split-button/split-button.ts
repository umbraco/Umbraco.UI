import { defineElement } from '../../internal/registration/index.js';
import { UUISplitButtonElement } from './split-button.element.js';

defineElement('uui-split-button', UUISplitButtonElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-split-button': UUISplitButtonElement;
  }
}

export * from './split-button.element.js';
