import { UUIEvent } from '../../event/UUIEvent';
import { UUISelectElement } from './uui-select.element';

export class UUISelectEvent extends UUIEvent<{}, UUISelectElement> {
  public static readonly CHANGE = 'change';
  public static readonly INPUT = 'input';
}
