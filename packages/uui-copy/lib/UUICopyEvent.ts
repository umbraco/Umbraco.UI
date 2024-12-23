import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUICopyElement } from './uui-copy.element';

export class UUICopyEvent extends UUIEvent<{ text: string }, UUICopyElement> {
  public static readonly COPIED: string = 'copied';
  public static readonly COPYING: string = 'copying';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
