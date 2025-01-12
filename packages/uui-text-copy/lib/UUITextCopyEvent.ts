import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUITextCopyElement } from './uui-text-copy.element';

interface UUITextCopyEventInit extends EventInit {
  detail?: { text: string };
}

export class UUITextCopyEvent extends UUIEvent<
  { text: string },
  UUITextCopyElement
> {
  public static readonly COPIED: string = 'copied';
  public static readonly COPYING: string = 'copying';

  constructor(evName: string, eventInit: UUITextCopyEventInit = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
