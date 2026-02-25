import { UUIEvent } from '../../internal/events';
import { UUICardElement } from './card.element';

export class UUICardEvent extends UUIEvent<{}, UUICardElement> {
  public static readonly OPEN = 'open';
}
