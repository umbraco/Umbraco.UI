export class UUIEvent<DetailType> extends Event {
  static defaultInit = {
    bubbles: true,
    composed: true,
  };
  detail: DetailType;

  constructor(evName: string, eventInit: any) {
    super(evName, {
      ...UUIEvent.defaultInit,
      ...eventInit,
    });
    this.detail = eventInit.detail;
  }
}
