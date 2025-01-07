import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUICopyElement } from './uui-copy.element';

interface UUICopyEventInit extends EventInit {
  detail?: { text: string };
}

export class UUICopyEvent extends UUIEvent<{ text: string }, UUICopyElement> {
  public static readonly COPIED: string = 'copied';
  public static readonly COPYING: string = 'copying';

  constructor(evName: string, eventInit: UUICopyEventInit = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
