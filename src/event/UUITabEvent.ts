import { UUIEvent } from './UUIEvent';

type DetailType = {
  tabId: string;
};

export class UUITabEvent extends UUIEvent<DetailType> {
  constructor(evName: string, eventInit: any) {
    super(evName, {
      ...UUIEvent.defaultInit,
      ...eventInit,
    });
    this.detail = eventInit.detail;
  }
}
