import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUIListItemElement } from './uui-list-item.element';

export class UUIListItemEvent extends UUIEvent<{}, UUIListItemElement> {
  public static readonly OPEN = 'open';
  public static readonly SELECTED = 'selected';
}
