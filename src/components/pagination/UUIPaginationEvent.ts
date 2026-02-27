import { UUIEvent } from '../../internal/events/index.js';
import type { UUIPaginationElement } from './pagination.element.js';

export class UUIPaginationEvent extends UUIEvent<{}, UUIPaginationElement> {
  public static readonly CHANGE = 'change';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
