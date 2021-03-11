import { UUIEvent } from '../../../event/UUIEvent';
import { UUICardElement } from './uui-card.element';

export class UUICardEvent extends UUIEvent<{}, UUICardElement> {
  public static readonly CLICK_TITLE = 'click-title';
}
