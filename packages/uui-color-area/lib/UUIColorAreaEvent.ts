import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUIColorAreaElement } from './uui-color-area.element';

export class UUIColorAreaEvent extends UUIEvent<{}, UUIColorAreaElement> {
  public static readonly CHANGE = 'change';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
