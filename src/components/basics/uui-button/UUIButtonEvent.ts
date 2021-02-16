import { UUIEvent } from '../../../event/UUIEvent';
import { UUIButtonElement } from './uui-button.element';

export class UUIButtonEvent extends UUIEvent<{}, UUIButtonElement> {
  public static readonly CLICK = 'click';
}
