import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';

export type PopoverContainerPlacement =
  | 'auto'
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'left'
  | 'left-start'
  | 'left-end';

/**
 * @element uui-popover-container
 */
@defineElement('uui-popover-container')
export class UUIPopoverContainerElement extends LitElement {
  /**
   * Set the distance between popover-modal and trigger.
   * @type {number}
   * @attr disabled
   * @default false
   */
  @property({ type: Number })
  margin = 0;

  /**
   * Define the placement of the popover-modal.
   * @attr placement
   * @default 'bottom-start'
   */
  @property({ type: String, reflect: true })
  get placement(): PopoverContainerPlacement {
    return this._placement;
  }
  set placement(newValue: PopoverContainerPlacement) {
    this._placement = newValue;
    this._actualPlacement = newValue;
    this.#initUpdate();
  }

  @state()
  _placement: PopoverContainerPlacement = 'bottom-start';

  @state()
  _actualPlacement: PopoverContainerPlacement = this._placement;

  #target: HTMLElement | null = null;

  connectedCallback(): void {
    super.connectedCallback();

    // CHECK BROWSER SUPPORT
    if (!HTMLElement.prototype.hasOwnProperty('popover')) {
      alert(
        'Browser does not support popovers. Check the docs for info on how to enable: https://developer.mozilla.org/en-US/docs/Web/API/Popover_API'
      );
      return;
    }

    this.addEventListener('beforetoggle', this.#beforeToggle);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener('beforetoggle', this.#beforeToggle);
  }

  #updatePadding = () => {
    const oppositeSides: Record<string, string> = {
      top: 'bottom',
      bottom: 'top',
      left: 'right',
      right: 'left',
    };

    // find the side excluding start/end
    let side = this._actualPlacement.split('-')[0];
    // find the opposite side
    side = oppositeSides[side] || side;
    // capitalize the side
    side = side.charAt(0).toUpperCase() + side.slice(1);

    const paddingSide = `padding${side}`;
    this.style.padding = '0';
    (this.style as any)[paddingSide] = `10px`;
  };

  #beforeToggle = async (event: any) => {
    this.#target = this.#findAncestorWithAttribute(
      this,
      'popovertarget',
      this.id
    );

    // Dispatch a custom event that can be listened to by the popover target.
    // Mostly used for UUIButton.
    this.#target?.dispatchEvent(
      new CustomEvent('uui-popover-before-toggle', {
        bubbles: false,
        composed: false,
        detail: {
          oldState: event.oldState,
          newState: event.newState,
        },
      })
    );

    if (event.newState !== 'open') {
      document.removeEventListener('scroll', this.#initUpdate);
      return;
    }

    document.addEventListener('scroll', this.#initUpdate);

    requestAnimationFrame(() => {
      this.#initUpdate();
    });
  };

  #initUpdate = () => {
    this._actualPlacement = this._placement;
    this.style.opacity = '0';
    this.#updatePosition(3);
  };

  #updatePosition = (iteration: number) => {
    this.#updatePadding();
    iteration--;
    if (this.#target === null) return;

    const isTopPlacement = this._actualPlacement.indexOf('top') !== -1;
    const isBottomPlacement = this._actualPlacement.indexOf('bottom') !== -1;
    const isLeftPlacement = this._actualPlacement.indexOf('left') !== -1;
    const isRightPlacement = this._actualPlacement.indexOf('right') !== -1;

    const isStart = this._actualPlacement.indexOf('-start') !== -1;
    const isEnd = this._actualPlacement.indexOf('-end') !== -1;

    const targetRect = this.#target.getBoundingClientRect();
    const popoverRect = this.getBoundingClientRect();

    let top = 0;
    let left = 0;

    if (isBottomPlacement) {
      top = targetRect.top + targetRect.height;
      if (isStart) {
        left = targetRect.left;
      }
      if (isEnd) {
        left = targetRect.left + targetRect.width - popoverRect.width;
      }
      if (!isStart && !isEnd) {
        left = targetRect.left + targetRect.width / 2 - popoverRect.width / 2;
      }
    }
    if (isTopPlacement) {
      top = targetRect.top - popoverRect.height;
      if (isStart) {
        left = targetRect.left;
      }
      if (isEnd) {
        left = targetRect.left + targetRect.width - popoverRect.width;
      }
      if (!isStart && !isEnd) {
        left = targetRect.left + targetRect.width / 2 - popoverRect.width / 2;
      }
    }
    if (isLeftPlacement) {
      left = targetRect.left - popoverRect.width;
      if (isStart) {
        top = targetRect.top;
      }
      if (isEnd) {
        top = targetRect.top + targetRect.height - popoverRect.height;
      }
      if (!isStart && !isEnd) {
        top = targetRect.top + targetRect.height / 2 - popoverRect.height / 2;
      }
    }
    if (isRightPlacement) {
      left = targetRect.left + targetRect.width;
      if (isStart) {
        top = targetRect.top;
      }
      if (isEnd) {
        top = targetRect.top + targetRect.height - popoverRect.height;
      }
      if (!isStart && !isEnd) {
        top = targetRect.top + targetRect.height / 2 - popoverRect.height / 2;
      }
    }

    // Clamp left and top within screen bounds
    // If the target leaves the screen, the popover follows.
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const topTargetVsScreenTop = Math.min(
      0,
      targetRect.top + targetRect.height
    );
    const topTargetVsScreenBottom = Math.max(
      Math.min(top, screenHeight - popoverRect.height),
      targetRect.top - popoverRect.height
    );

    const topClamp = Math.max(topTargetVsScreenTop, topTargetVsScreenBottom);
    if (
      topClamp !== top &&
      (isTopPlacement || isBottomPlacement) &&
      iteration > 0
    ) {
      this.#flipPlacement();
      this.#updatePosition(iteration);
      return;
    }

    top = Math.max(topTargetVsScreenTop, topTargetVsScreenBottom);

    const leftTargetVsScreenLeft = Math.min(
      0,
      targetRect.left + targetRect.width
    );
    const leftTargetVsScreenRight = Math.max(
      Math.min(left, screenWidth - popoverRect.width),
      targetRect.left - popoverRect.width
    );

    const leftClamp = Math.max(leftTargetVsScreenLeft, leftTargetVsScreenRight);
    if (
      leftClamp !== left &&
      (isLeftPlacement || isRightPlacement) &&
      iteration > 0
    ) {
      this.#flipPlacement();
      this.#updatePosition(iteration);
      return;
    }
    left = leftClamp;

    // Detect if the popover is completely outside the screen on any side
    const isCompletelyOutsideScreen =
      top + popoverRect.height < 0 ||
      top > screenHeight ||
      left + popoverRect.width < 0 ||
      left > screenWidth;

    if (isCompletelyOutsideScreen) {
      // @ts-ignore - This is part of the new popover API, but typescript doesn't recognize it yet.
      this.hidePopover();
    }

    // Set the popover's position
    this.style.transform = `translate(${left}px, ${top}px)`;
    this.style.opacity = '1';
  };

  #flipPlacement() {
    const [direction, position] = this._actualPlacement.split('-');
    const oppositeDirection =
      direction === 'top'
        ? 'bottom'
        : direction === 'bottom'
        ? 'top'
        : direction === 'left'
        ? 'right'
        : 'left';
    this._actualPlacement =
      `${oppositeDirection}-${position}` as PopoverContainerPlacement;
  }

  #findAncestorWithAttribute(
    element: HTMLElement,
    attributeName: string,
    attributeValue: string
  ) {
    while (element !== null && element.parentElement !== null) {
      element = element.parentElement;

      const elementHasAttribute =
        element.hasAttribute(attributeName) &&
        element.getAttribute(attributeName) === attributeValue;
      const elementContainsAttribute =
        element.querySelector(`[${attributeName}="${attributeValue}"]`) !==
        null;
      if (elementHasAttribute) {
        return element;
      } else if (elementContainsAttribute) {
        return element.querySelector(
          `[${attributeName}="${attributeValue}"]`
        ) as HTMLElement;
      }
    }
    return null;
  }

  render() {
    return html`<slot></slot>`;
  }

  static styles = [
    css`
      :host {
        margin: 0;
        width: fit-content;
        height: fit-content;
        border: none;
        border-radius: 0;
        padding: 0;
        background-color: none;
        background: none;
        overflow: visible;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-popover-container': UUIPopoverContainerElement;
  }
}
