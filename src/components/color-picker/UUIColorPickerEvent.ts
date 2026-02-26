import { UUIEvent } from '../../internal/events/index.js';

import type { UUIColorPickerElement } from './color-picker.element.js';

export class UUIColorPickerChangeEvent extends UUIEvent<
  {},
  UUIColorPickerElement
> {
  public static readonly CHANGE = 'change';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
