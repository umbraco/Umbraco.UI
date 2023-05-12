import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';

import { UUIColorSwatchElement } from '@umbraco-ui/uui-color-swatch/lib/uui-color-swatch.element';

export class UUIColorSwatchesEvent extends UUIEvent<{}, UUIColorSwatchElement> {
  public static readonly CHANGE = 'change';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
