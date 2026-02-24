import { UUIEvent } from '../../internal/events';
import { UUIRangeSliderElement } from './uui-range-slider.element';

export class UUIRangeSliderEvent extends UUIEvent<{}, UUIRangeSliderElement> {
  public static readonly INPUT = 'input';
  public static readonly CHANGE = 'change';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
