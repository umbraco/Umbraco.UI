import { UUIEvent } from '../../internal/events';

import type { UUIColorSwatchElement } from '../color-swatch/color-swatch.element.js';

export class UUIColorSwatchesEvent extends UUIEvent<{}, UUIColorSwatchElement> {
  public static readonly CHANGE = 'change';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
