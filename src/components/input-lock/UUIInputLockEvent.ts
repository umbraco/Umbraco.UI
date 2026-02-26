import { UUIEvent } from '../../internal/events/index.js';
import type { UUIInputLockElement } from './input-lock.element.js';

export class UUIInputLockEvent extends UUIEvent<{}, UUIInputLockElement> {
  public static readonly LOCK_CHANGE: string = 'lock-change';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
