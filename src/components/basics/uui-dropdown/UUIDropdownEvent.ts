import { UUIEvent } from '../../../event/UUIEvent';
import { UUIDropdownElement } from './uui-dropdown.element';

export class UUIDropdownEvent extends UUIEvent<{}, UUIDropdownElement> {
  public static readonly OPEN = 'open';
  public static readonly CLOSE = 'close';
}
