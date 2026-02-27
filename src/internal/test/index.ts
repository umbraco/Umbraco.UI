import { userEvent } from 'vitest/browser';

export class UUITestMouse {
  leftClick(targetElement: HTMLElement) {
    return userEvent.click(targetElement);
  }
}

/** One-shot event listener as a Promise. */
export function oneEvent(el: EventTarget, event: string): Promise<Event> {
  return new Promise(resolve => {
    el.addEventListener(event, resolve, { once: true });
  });
}
