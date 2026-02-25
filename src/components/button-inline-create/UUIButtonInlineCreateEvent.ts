import { UUIEvent } from '../../internal/events';
import { UUIButtonInlineCreateElement } from './button-inline-create.element';

export class UUIButtonInlineCreateEvent extends UUIEvent<
  {},
  UUIButtonInlineCreateElement
> {
  public static readonly CLICK: string = 'click';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true, composed: true },
      ...eventInit,
    });
  }
}
