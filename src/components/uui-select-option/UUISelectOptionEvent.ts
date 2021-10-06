import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUISelectOptionElement } from './uui-select-option.element';

export class UUISelectOptionEvent extends UUIEvent<{}, UUISelectOptionElement> {
  public static readonly CHANGE = 'change';
}
