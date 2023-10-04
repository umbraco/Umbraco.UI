import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUIResizeObserverElement } from './uui-resize-observer.element';

export class UUIResizeEvent extends UUIEvent<{}, UUIResizeObserverElement> {
  public static readonly CHANGE = 'change';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
