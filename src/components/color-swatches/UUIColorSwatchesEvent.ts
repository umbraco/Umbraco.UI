import { UUIEvent } from '../../internal/events';

import { UUIColorSwatchElement } from '../color-swatch/uui-color-swatch.element.js';

export class UUIColorSwatchesEvent extends UUIEvent<{}, UUIColorSwatchElement> {
  public static readonly CHANGE = 'change';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
