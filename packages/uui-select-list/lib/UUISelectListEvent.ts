import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUISelectListElement } from './uui-select-list.element';

export class UUISelectListEvent extends UUIEvent<UUISelectListElement> {
  public static readonly CHANGE: string = 'change';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
