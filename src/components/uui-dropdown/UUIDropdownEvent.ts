import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUIDropdownElement } from './uui-dropdown.element';

export class UUIDropdownEvent extends UUIEvent<{}, UUIDropdownElement> {
  public static readonly OPEN = 'open';
  public static readonly CLOSE = 'close';
}
