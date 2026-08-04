import type { UUIFormControlBaseMixinInterface } from '../mixins/index.js';
import { UUIEvent } from './UUIEvent.js';

export class UUIFormControlEvent extends UUIEvent<
  {},
  UUIFormControlBaseMixinInterface<unknown>
> {
  constructor(evName: string, eventInit: any = {}) {
    super(evName, {
      bubbles: true,
      ...eventInit,
    });
  }

  public static readonly VALID = 'valid';
  public static readonly INVALID = 'invalid';
}
