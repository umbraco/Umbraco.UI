import { UUIEvent } from '../../internal/events';
import type { UUIRadioElement } from './radio.element';

export class UUIRadioEvent extends UUIEvent<{}, UUIRadioElement> {
  public static readonly CHANGE = 'change';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
