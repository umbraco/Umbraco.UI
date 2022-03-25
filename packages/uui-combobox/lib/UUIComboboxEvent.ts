import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUIComboboxElement } from './uui-combobox.element';

export class UUIComboboxEvent extends UUIEvent<UUIComboboxElement> {
  public static readonly INPUT: string = 'input';
}
