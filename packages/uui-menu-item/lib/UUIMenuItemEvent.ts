import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUIMenuItemElement } from './uui-menu-item.element';

export class UUIMenuItemEvent extends UUIEvent<{}, UUIMenuItemElement> {
  public static readonly SHOW_CHILDREN = 'show-children';
  public static readonly HIDE_CHILDREN = 'hide-children';

  public static readonly CLICK_LABEL = 'click-label';
}
