import { UUIEvent } from '../../../event/UUIEvent';
import { UUISingleSelectBaseElement } from './uui-single-select-base.element';

export class UUISelectEvent extends UUIEvent<{}, UUISingleSelectBaseElement> {
  public static readonly CHANGE = 'change';
  public static readonly SPACE = 'space';
}
