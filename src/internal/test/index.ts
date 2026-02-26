import { userEvent } from 'vitest/browser';

export class UUITestMouse {
  leftClick(targetElement: HTMLElement) {
    return userEvent.click(targetElement);
  }
}
