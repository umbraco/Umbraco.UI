import { UUIEvent } from '../../internal/events/index.js';
import type { UUISliderElement } from './slider.element.js';

export class UUISliderEvent extends UUIEvent<{}, UUISliderElement> {
  public static readonly INPUT = 'input';
  public static readonly CHANGE = 'change';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
