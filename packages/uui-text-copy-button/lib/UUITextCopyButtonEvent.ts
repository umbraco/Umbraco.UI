import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUITextCopyButtonElement } from './uui-text-copy-button.element';

interface UUITextCopyButtonEventInit extends EventInit {
  detail?: { text: string };
}

export class UUITextCopyButtonEvent extends UUIEvent<
  { text: string },
  UUITextCopyButtonElement
> {
  public static readonly COPIED: string = 'copied';
  public static readonly COPYING: string = 'copying';

  constructor(evName: string, eventInit: UUITextCopyButtonEventInit = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
