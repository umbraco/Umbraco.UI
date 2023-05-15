import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUIComboboxListElement } from './uui-combobox-list.element';

export class UUIComboboxListEvent extends UUIEvent<UUIComboboxListElement> {
  public static readonly CHANGE: string = 'change';
  public static readonly INNER_SLOT_CHANGE: string = 'inner-slot-change';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
