/**
 * Base class for dispatching UUIVirtualEvent objects.
 */

import { UUIVirtualEvent } from './UUIVirtualEvent';

type ListenerType<T extends UUIVirtualEvent = UUIVirtualEvent> = (
  event: T
) => void;

export class UUIVirtualEventEmitter {
  private listeners: Record<string, ListenerType<UUIVirtualEvent>[]> = {};

  public on<T extends UUIVirtualEvent = UUIVirtualEvent>(
    type: string,
    callback: ListenerType<T>
  ) {
    const listeners = this.listeners[type] || (this.listeners[type] = []);
    if (listeners.indexOf(callback as any) !== -1) {
      return;
    }

    listeners.push(callback as any); // Currently using as any, as TypeScript complains about it, currently its okay internally in this method.
  }

  public off(type: string, callback: ListenerType) {
    const listeners = this.listeners[type];
    const i = listeners.indexOf(callback);
    if (i !== -1) {
      listeners.splice(i, 1);
    }
  }

  /**
   * Dispatches an event to all listeners of the event type.
   */
  public emit(event: UUIVirtualEvent) {
    this.listeners[event.type]?.forEach(x => x(event));
  }
}
