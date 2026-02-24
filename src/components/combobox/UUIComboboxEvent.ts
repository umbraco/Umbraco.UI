import { UUIEvent } from '../../internal/events';
import { UUIComboboxElement } from './uui-combobox.element';

export class UUIComboboxEvent extends UUIEvent<UUIComboboxElement> {
  public static readonly SEARCH: string = 'search';
  public static readonly CHANGE: string = 'change';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
