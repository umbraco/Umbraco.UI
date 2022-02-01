import { UUITabElement } from './uui-tab.element';
import { UUITabGroupElement } from './uui-tab-group.element';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';

defineElement('uui-tab', UUITabElement);
defineElement('uui-tab-group', UUITabGroupElement);

export * from './uui-tab.element';
export * from './uui-tab-group.element';
export * from './UUITabEvent';
export * from './UUITabGroupEvent';
