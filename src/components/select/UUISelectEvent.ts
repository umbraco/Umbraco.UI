import { UUIEvent } from '../../internal/events';
import type { UUISelectElement } from './select.element';

export class UUISelectEvent extends UUIEvent<{}, UUISelectElement> {
  public static readonly CHANGE = 'change';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
