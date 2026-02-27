import { UUIEvent } from '../../internal/events/index.js';
import type { UUIColorAreaElement } from './color-area.element.js';

export class UUIColorAreaEvent extends UUIEvent<{}, UUIColorAreaElement> {
  public static readonly CHANGE = 'change';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
