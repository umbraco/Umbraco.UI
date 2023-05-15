import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUIPaginationElement } from './uui-pagination.element';

export class UUIPaginationEvent extends UUIEvent<{}, UUIPaginationElement> {
  public static readonly CHANGE = 'change';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
