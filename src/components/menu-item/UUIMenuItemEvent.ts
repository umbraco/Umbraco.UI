import { UUIEvent } from '../../internal/events/index.js';
import type { UUIMenuItemElement } from './menu-item.element.js';

export class UUIMenuItemEvent extends UUIEvent<{}, UUIMenuItemElement> {
  public static readonly SHOW_CHILDREN = 'show-children';
  public static readonly HIDE_CHILDREN = 'hide-children';

  public static readonly CLICK_LABEL = 'click-label';
}
