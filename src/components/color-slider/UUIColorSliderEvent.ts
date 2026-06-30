import { UUIEvent } from '../../internal/events/index.js';
import type { UUIColorSliderElement } from './color-slider.element.js';

export class UUIColorSliderEvent extends UUIEvent<{}, UUIColorSliderElement> {
  public static readonly CHANGE = 'change';

  constructor(evName: string, eventInit: any = {}) {
    super(evName, {
      bubbles: true,
      ...eventInit,
    });
  }
}
