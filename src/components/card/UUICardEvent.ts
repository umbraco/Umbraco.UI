import { UUIEvent } from '../../internal/events';
import { UUICardElement } from './uui-card.element';

export class UUICardEvent extends UUIEvent<{}, UUICardElement> {
  public static readonly OPEN = 'open';
}
