import { UUIEvent } from '../../../event/UUIEvent';
import { UUISelectListElement } from './uui-select-list.element';

export class UUISelectListEvent extends UUIEvent<{}, UUISelectListElement> {
  public static readonly CHANGE = 'change';
}
