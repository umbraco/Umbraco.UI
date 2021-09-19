import { UUITabGroupElement } from './uui-tab-group.element';
import { UUIEvent } from '@umbraco-ui/uui-base/events';

type DetailType = {};

export class UUITabGroupEvent extends UUIEvent<
  DetailType,
  UUITabGroupElement
> {}
