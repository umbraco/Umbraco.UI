import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUISelectListElement } from './uui-select-list.element';

export class UUISelectListEvent extends UUIEvent<
  { selected: Element[] },
  UUISelectListElement
> {
  public static readonly CHANGE: string = 'change';
  public static readonly OPTION_CLICK: string = 'option-click';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
