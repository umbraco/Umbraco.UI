interface DragOptions {
  /** Callback that runs as dragging occurs. */
  onMove: (x: number, y: number) => void;
  /** Callback that runs when dragging stops. */
  onStop: () => void;
  /**
   * When an initial event is passed, the first drag will be triggered immediately using the coordinates therein. This
   * is useful when the drag is initiated by a mousedown/touchstart event but you want the initial "click" to activate
   * a drag (e.g. positioning a handle initially at the click target).
   */
  initialEvent: PointerEvent;
}

export const drag = (
  container: HTMLElement,
  options?: Partial<DragOptions>,
) => {
  function move(event: PointerEvent | TouchEvent) {
    const dims = container.getBoundingClientRect();
    const defaultView = container.ownerDocument.defaultView!;
    const offsetX = dims.left + defaultView.scrollX;
    const offsetY = dims.top + defaultView.scrollY;

    let pointerEvent: PointerEvent | Touch;
    // TouchEvent is not available in Firefox
    if ('TouchEvent' in window && event instanceof TouchEvent) {
      pointerEvent = event.touches[0];
    } else if (event instanceof PointerEvent) {
      pointerEvent = event;
    } else {
      return;
    }

    const x = pointerEvent.pageX - offsetX;
    const y = pointerEvent.pageY - offsetY;

    if (options?.onMove) {
      options.onMove(x, y);
    }
  }

  function stop() {
    document.removeEventListener('pointermove', move);
    document.removeEventListener('pointerup', stop);

    if (options?.onStop) {
      options.onStop();
    }
  }

  document.addEventListener('pointermove', move, { passive: true });
  document.addEventListener('pointerup', stop);

  // If an initial event is set, trigger the first drag immediately
  if (options?.initialEvent) {
    move(options.initialEvent);
  }
};
