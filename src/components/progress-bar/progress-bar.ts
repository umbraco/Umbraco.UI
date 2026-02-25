import { defineElement } from '../../internal/registration/index.js';
import { UUIProgressBarElement } from './progress-bar.element.js';

export * from './progress-bar.element.js';

defineElement('uui-progress-bar', UUIProgressBarElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-progress-bar': UUIProgressBarElement;
  }
}
