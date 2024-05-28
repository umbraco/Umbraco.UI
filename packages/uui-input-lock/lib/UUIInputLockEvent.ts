import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUIInputLockElement } from './uui-input-lock.element';

export class UUIInputLockEvent extends UUIEvent<{}, UUIInputLockElement> {
  public static readonly LOCK_CHANGE: string = 'lock-change';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
