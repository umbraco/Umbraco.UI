import { UUIEvent } from '../../internal/events/index.js';
import type { UUIBooleanInputElement } from './boolean-input.element.js';

export class UUIBooleanInputEvent extends UUIEvent<{}, UUIBooleanInputElement> {
  public static readonly CHANGE: string = 'change';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
