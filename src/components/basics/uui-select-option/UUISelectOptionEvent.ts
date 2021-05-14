import { UUIEvent } from '../../../event/UUIEvent';
import { UUISelectOptionElement } from './uui-select-option.element';

export class UUISelectOptionEvent extends UUIEvent<{}, UUISelectOptionElement> {
  public static readonly CHANGE = 'change';
}
