import { defineElement } from '../../internal/registration/index.js';
import { UUIBreadcrumbItemElement } from './breadcrumb-item.element.js';
import { UUIBreadcrumbsElement } from './breadcrumbs.element.js';

defineElement('uui-breadcrumb-item', UUIBreadcrumbItemElement);
defineElement('uui-breadcrumbs', UUIBreadcrumbsElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-breadcrumb-item': UUIBreadcrumbItemElement;
    'uui-breadcrumbs': UUIBreadcrumbsElement;
  }
}

export * from './breadcrumb-item.element.js';
export * from './breadcrumbs.element.js';
export { UUIBreadcrumbsElement as default } from './breadcrumbs.element.js';
