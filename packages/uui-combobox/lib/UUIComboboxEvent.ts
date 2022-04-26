import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUIComboboxElement } from './uui-combobox.element';

export class UUIComboboxEvent extends UUIEvent<UUIComboboxElement> {
  public static readonly SEARCH: string = 'search';
  public static readonly CHANGE: string = 'change';
}
