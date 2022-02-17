import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUIPopoverElement } from './uui-popover.element';

export class UUIPopoverEvent extends UUIEvent<{}, UUIPopoverElement> {
  public static readonly CHANGE = 'change';
}
