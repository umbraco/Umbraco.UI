import { UUIEvent } from '../../internal/events';
import { UUIBooleanInputElement } from './uui-boolean-input.element';

export class UUIBooleanInputEvent extends UUIEvent<{}, UUIBooleanInputElement> {
  public static readonly CHANGE: string = 'change';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
