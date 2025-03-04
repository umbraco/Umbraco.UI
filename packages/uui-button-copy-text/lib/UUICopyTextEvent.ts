import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUIButtonCopyTextElement } from './uui-button-copy-text.element';

export class UUICopyTextEvent extends UUIEvent<
  { text: string },
  UUIButtonCopyTextElement
> {
  public static readonly COPIED: string = 'copied';
  public static readonly COPYING: string = 'copying';

  /**
   * The text content that is about to be copied to the clipboard
   */
  public text: string | null = null;
}
