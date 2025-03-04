import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUIButtonCopyTextElement } from './uui-button-copy-text.element';

interface UUICopyTextEventInit extends EventInit {
  detail?: { text: string };
}

export class UUICopyTextEvent extends UUIEvent<
  { text: string },
  UUIButtonCopyTextElement
> {
  public static readonly COPIED: string = 'copied';
  public static readonly COPYING: string = 'copying';

  constructor(evName: string, eventInit: UUICopyTextEventInit = {}) {
    super(evName, {
      ...eventInit,
    });
  }
}
