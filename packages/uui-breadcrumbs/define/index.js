import { defineElement } from '@umbraco-ui/uui-base/lib/registration';

import { UUIBreadcrumbItemElement } from '../lib/uui-breadcrumb-item.element';
import { UUIBreadcrumbsElement } from '../lib/uui-breadcrumbs.element';

defineElement('uui-breadcrumbs', UUIBreadcrumbsElement);
defineElement('uui-breadcrumb-item', UUIBreadcrumbItemElement);
