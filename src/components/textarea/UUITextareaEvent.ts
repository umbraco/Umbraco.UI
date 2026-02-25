import { UUIEvent } from '../../internal/events';
import type { UUITextareaElement } from './textarea.element';

export class UUITextareaEvent extends UUIEvent<{}, UUITextareaElement> {
  public static readonly CHANGE: string = 'change';
  public static readonly INPUT: string = 'input';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
