import { UUIEvent } from '../../internal/events/index.js';
import { UUIInputElement } from './input.element';

export class UUIInputEvent extends UUIEvent<{}, UUIInputElement> {
  public static readonly CHANGE: string = 'change';
  public static readonly INPUT: string = 'input';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
