export class UUIEvent extends Event {
  static defaultInit = {
    bubbles: true,
    composed: true,
  };
  detail: any;

  constructor(evName, eventInit) {
    super(evName, {
      ...UUIEvent.defaultInit,
      ...eventInit,
    });
    this.detail = eventInit.detail;
  }
}
