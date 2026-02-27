import { UUIEvent } from '../../internal/events/index.js';
import type { UUIComboboxListElement } from './combobox-list.element.js';

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
