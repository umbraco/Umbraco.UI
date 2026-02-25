import { defineElement } from '../../internal/registration/index.js';
import { UUIResponsiveContainerElement } from './responsive-container.element.js';

export * from './responsive-container.element.js';

defineElement('uui-responsive-container', UUIResponsiveContainerElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-responsive-container': UUIResponsiveContainerElement;
  }
}
