import { UUITabGroupElement } from './tab-group.element';
import { UUIEvent } from '../../internal/events';

type DetailType = {};

export class UUITabGroupEvent extends UUIEvent<
  DetailType,
  UUITabGroupElement
> {}
