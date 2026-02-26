import { UUIEvent } from '../../internal/events/index.js';
import type { UUIButtonCopyTextElement } from './button-copy-text.element.js';

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
