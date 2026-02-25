import { defineElement } from '../../internal/registration/index.js';
import { UUIScrollContainerElement } from './scroll-container.element.js';

export * from './scroll-container.element.js';

defineElement('uui-scroll-container', UUIScrollContainerElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-scroll-container': UUIScrollContainerElement;
  }
}
