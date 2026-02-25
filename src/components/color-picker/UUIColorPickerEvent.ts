import { UUIEvent } from '../../internal/events';

import type { UUIColorPickerElement } from './color-picker.element';

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
