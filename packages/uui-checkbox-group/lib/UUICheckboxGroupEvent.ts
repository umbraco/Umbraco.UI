import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUICheckboxGroupElement } from './uui-checkbox-group.element';

export class UUICheckboxGroupEvent extends UUIEvent<
  {},
  UUICheckboxGroupElement
> {
  public static readonly CHANGE = 'change';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
