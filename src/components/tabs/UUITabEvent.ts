import type { UUITabElement } from './tab.element.js';
import { UUIEvent } from '../../internal/events/index.js';

type DetailType = {};

export class UUITabEvent extends UUIEvent<DetailType, UUITabElement> {}
