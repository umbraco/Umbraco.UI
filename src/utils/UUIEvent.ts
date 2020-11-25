export class UUIEvent<DetailType> extends Event {
  static defaultInit = {
    bubbles: true,
    composed: true,
  };
  detail: DetailType;

  constructor(evName, eventInit) {
    super(evName, {
      ...UUIEvent.defaultInit,
      ...eventInit,
    });
    this.detail = eventInit.detail;
  }
}
