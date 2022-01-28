import { defineElement } from '@umbraco-ui/uui-base/lib/registration';

import { UUITabGroupElement } from '../lib/uui-tab-group.element';
import { UUITabElement } from '../lib/uui-tab.element';

defineElement('uui-tab', UUITabElement);
defineElement('uui-tab-group', UUITabGroupElement);
