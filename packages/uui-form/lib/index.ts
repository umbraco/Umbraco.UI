import { UUIFormElement } from './uui-form.element';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';

defineElement('uui-form', UUIFormElement, { extends: 'form' });

export * from './uui-form.element';
