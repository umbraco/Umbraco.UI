import { UUIEvent } from '../../internal/events/index.js';
import type { UUICardElement } from './card.element.js';

export class UUICardEvent extends UUIEvent<{}, UUICardElement> {
  public static readonly OPEN = 'open';
}
