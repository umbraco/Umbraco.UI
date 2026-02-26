import type { UUITabGroupElement } from './tab-group.element.js';
import { UUIEvent } from '../../internal/events/index.js';

type DetailType = {};

export class UUITabGroupEvent extends UUIEvent<
  DetailType,
  UUITabGroupElement
> {}
