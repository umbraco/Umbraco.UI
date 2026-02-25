import type { UUITabElement } from './tab.element';
import { UUIEvent } from '../../internal/events';

type DetailType = {};

export class UUITabEvent extends UUIEvent<DetailType, UUITabElement> {}
