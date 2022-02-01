import { UUIRadioElement } from './uui-radio.element';
import { UUIRadioGroupElement } from './uui-radio-group.element';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';

defineElement('uui-radio', UUIRadioElement);
defineElement('uui-radio-group', UUIRadioGroupElement);

export * from './uui-radio.element';
export * from './UUIRadioEvent';
export * from './UUIRadioGroupEvent';
export * from './uui-radio-group.element';
