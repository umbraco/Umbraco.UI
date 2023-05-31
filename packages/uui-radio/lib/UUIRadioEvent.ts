import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUIRadioElement } from './uui-radio.element';

export class UUIRadioEvent extends UUIEvent<{}, UUIRadioElement> {
  public static readonly CHANGE = 'change';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
