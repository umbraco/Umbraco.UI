import { UUITabElement } from './uui-tab.element';
import { UUITabGroupElement } from './uui-tab-group.element';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';

defineElement('uui-tab', UUITabElement as any);
defineElement('uui-tab-group', UUITabGroupElement as any);
