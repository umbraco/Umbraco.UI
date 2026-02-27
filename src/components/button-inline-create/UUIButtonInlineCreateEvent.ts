import { UUIEvent } from '../../internal/events/index.js';
import type { UUIButtonInlineCreateElement } from './button-inline-create.element.js';

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
