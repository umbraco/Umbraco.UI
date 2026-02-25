import { UUIEvent } from '../../internal/events';
import { UUIColorAreaElement } from './color-area.element';

export class UUIColorAreaEvent extends UUIEvent<{}, UUIColorAreaElement> {
  public static readonly CHANGE = 'change';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
