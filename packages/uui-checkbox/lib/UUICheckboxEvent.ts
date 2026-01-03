import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUICheckboxElement } from './uui-checkbox.element';

export class UUICheckboxEvent extends UUIEvent<{}, UUICheckboxElement> {
  public static readonly CHANGE = 'change';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
