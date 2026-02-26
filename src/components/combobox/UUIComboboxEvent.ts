import { UUIEvent } from '../../internal/events/index.js';
import type { UUIComboboxElement } from './combobox.element.js';

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
