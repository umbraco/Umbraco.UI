import { UUIEvent } from '../../internal/events/index.js';
import type { UUIRadioElement } from './radio.element.js';

export class UUIRadioEvent extends UUIEvent<{}, UUIRadioElement> {
  public static readonly CHANGE = 'change';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
