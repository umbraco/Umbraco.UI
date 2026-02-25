import { UUIEvent } from '../../internal/events';
import type { UUIRadioGroupElement } from './radio-group.element';

export class UUIRadioGroupEvent extends UUIEvent<{}, UUIRadioGroupElement> {
  public static readonly CHANGE = 'change';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
