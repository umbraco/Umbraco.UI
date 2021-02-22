import { UUIEvent } from '../../../event/UUIEvent';
import { UUISelectListItemElement } from './uui-select-list-item.element';

export class UUISelectListItemEvent extends UUIEvent<
  {},
  UUISelectListItemElement
> {
  public static readonly CHANGE = 'change';
}
