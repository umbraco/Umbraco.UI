/**
 * Generic event for dispatching through an VirtualEventDispatcher.
 */
export class UUIVirtualEvent {
  public readonly type: string;

  constructor(type: string) {
    this.type = type;
  }
}
