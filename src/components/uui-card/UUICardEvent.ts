import { UUIEvent } from '../../event/UUIEvent';
import { UUICardElement } from './uui-card.element';

export class UUICardEvent extends UUIEvent<{}, UUICardElement> {
  public static readonly OPEN = 'open';
  public static readonly SELECTED = 'selected';
}
