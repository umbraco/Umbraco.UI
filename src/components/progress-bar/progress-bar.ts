import { defineElement } from '../../internal/registration/index.js';
import { UUIProgressBarElement } from './progress-bar.element.js';

defineElement('uui-progress-bar', UUIProgressBarElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-progress-bar': UUIProgressBarElement;
  }
}

export * from './progress-bar.element.js';
export { UUIProgressBarElement as default } from './progress-bar.element.js';
