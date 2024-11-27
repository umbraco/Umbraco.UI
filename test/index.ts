import { sendMouse } from '@web/test-runner-commands';

export class UUITestMouse {
  leftClick(targetElement: HTMLElement) {
    return sendMouse({
      type: 'click',
      position: this.#getCenterCoordinatesOfElement(targetElement),
      button: 'left',
    });
  }

  #getCenterCoordinatesOfElement(element: HTMLElement): [number, number] {
    const position = element.getBoundingClientRect();
    const centerOfElementX = position.left + position.width / 2;
    const centerOfElementY = position.top + position.height / 2;
    return [centerOfElementX, centerOfElementY];
  }
}
