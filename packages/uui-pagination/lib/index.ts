import { defineElement } from '@umbraco-ui/uui-base/lib/registration';

import { UUIPaginationElement } from './uui-pagination.element';

defineElement('uui-pagination', UUIPaginationElement);

export * from './uui-pagination.element';
export * from './UUIPaginationEvent';
