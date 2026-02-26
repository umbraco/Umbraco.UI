import { userEvent } from '@vitest/browser/context';

export class UUITestMouse {
  leftClick(targetElement: HTMLElement) {
    return userEvent.click(targetElement);
  }
}
