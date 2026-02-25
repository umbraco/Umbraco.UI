import { UUIEvent } from '../../internal/events';
import type { UUIColorSliderElement } from './color-slider.element';

export class UUIColorSliderEvent extends UUIEvent<{}, UUIColorSliderElement> {
  public static readonly CHANGE = 'change';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
