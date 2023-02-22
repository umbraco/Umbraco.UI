import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';

import { UUIColorPickerElement } from './uui-color-picker.element';

export class UUIColorPickerChangeEvent extends UUIEvent<
  {},
  UUIColorPickerElement
> {
  public static readonly CHANGE = 'change';
}
