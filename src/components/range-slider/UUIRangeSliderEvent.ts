import { UUIEvent } from '../../internal/events/index.js';
import type { UUIRangeSliderElement } from './range-slider.element.js';

export class UUIRangeSliderEvent extends UUIEvent<{}, UUIRangeSliderElement> {
  public static readonly INPUT = 'input';
  public static readonly CHANGE = 'change';

  constructor(evName: string, eventInit: any = {}) {
    super(evName, {
      bubbles: true,
      ...eventInit,
    });
  }
}
