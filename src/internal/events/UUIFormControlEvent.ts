import type { UUIFormControlMixinInterface } from '../mixins/index.js';
import { UUIEvent } from './UUIEvent.js';

export class UUIFormControlEvent extends UUIEvent<
  {},
  UUIFormControlMixinInterface<unknown>
> {
  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }

  public static readonly VALID = 'valid';
  public static readonly INVALID = 'invalid';
}
