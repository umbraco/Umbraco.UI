import { UUIEvent } from '../../internal/events/index.js';
import type { UUISelectElement } from './select.element.js';

export class UUISelectEvent extends UUIEvent<{}, UUISelectElement> {
  public static readonly CHANGE = 'change';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
