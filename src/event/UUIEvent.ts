/**
 * Umbraco UI implementation of native DOM CustomEvent that propagates out of Shadow DOM context.
 */
export class UUIEvent<
  DetailType extends Record<string, any> = Record<string, any>,
  EventTargetType extends EventTarget | null = EventTarget | null
> extends Event {
  static defaultInit = {
    composed: true,
  };

  readonly detail: DetailType;
  readonly target!: EventTargetType;

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...UUIEvent.defaultInit,
      ...eventInit,
    });
    this.detail = eventInit.detail || {};
  }
}
