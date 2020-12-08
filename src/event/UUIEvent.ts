export class UUIEvent<
  DetailType extends Record<string, any> = Record<string, any>
> extends Event {
  static defaultInit = {
    bubbles: true,
    composed: true,
  };
  detail: DetailType;

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...UUIEvent.defaultInit,
      ...eventInit,
    });
    this.detail = eventInit.detail || {};
  }
}
