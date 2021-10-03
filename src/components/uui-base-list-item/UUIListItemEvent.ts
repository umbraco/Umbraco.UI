import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUIBaseListItemElement } from './uui-base-list-item.element';

export class UUIListItemEvent extends UUIEvent<{}, UUIBaseListItemElement> {
  public static readonly OPEN = 'open';
  public static readonly SELECTED = 'selected';
}
