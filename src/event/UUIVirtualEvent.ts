/**
 * Generic event for dispatching through an VirtualEventDispatcher.
 */
export class UUIVirtualEvent {
  public type: Readonly<string>;

  constructor(type: string) {
    this.type = type;
  }
}
