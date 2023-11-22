import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { findAncestorByAttributeValue } from '@umbraco-ui/uui-base/lib/utils';
import { css, html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { polyfill } from './uui-popover-polyfill.js';

export type PopoverContainerPlacement =
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
   * Set the distance between popover container element and target element.
   * @type {number}
   * @attr margin
   * @default 0
   */
  @property({ type: Number })
  margin = 0;

  /**
   * Read-only attribute to check if the popover is open
   * @type {boolean}
   * @readonly
   * @attr open
   * @default false
   */
  @property({ type: Boolean })
  get open() {
    return this._open;
  }

  /**
   * Define the placement of the popover container.
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
  _open: boolean = false;

  @state()
  _actualPlacement: PopoverContainerPlacement = this._placement;

  #targetElement: HTMLElement | null = null;

  connectedCallback(): void {
    //TODO: Remove this polyfill when firefox supports the new popover API
    !HTMLElement.prototype.hasOwnProperty('popover') && polyfill.bind(this)();

    if (!this.hasAttribute('popover')) {
      this.setAttribute('popover', '');
    }

    super.connectedCallback();
    this.addEventListener('beforetoggle', this.#onBeforeToggle);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('beforetoggle', this.#onBeforeToggle);
  }

  #onBeforeToggle = (event: any) => {
    this._open = event.newState === 'open';

    this.#targetElement = findAncestorByAttributeValue(
      this,
      'popovertarget',
      this.id
    );

    // Dispatch a custom event that can be listened to by the popover target.
    // Mostly used for UUIButton.
    this.#targetElement?.dispatchEvent(
      new CustomEvent('uui-popover-before-toggle', {
        bubbles: false,
        composed: false,
        detail: {
          oldState: event.oldState,
          newState: event.newState,
        },
      })
    );

    if (!this._open) {
      document.removeEventListener('scroll', this.#initUpdate);
      return;
    }

    document.addEventListener('scroll', this.#initUpdate);

    requestAnimationFrame(() => {
      this.#initUpdate();
    });
  };

  #initUpdate = () => {
    if (!this._open) return;

    this._actualPlacement = this._placement;
    this.style.opacity = '0';

    // 3 iterations makes the popover flip back to the initial position if theres no space for it on either side.
    this.#updatePosition(3);
  };

  #updatePosition = (iteration: number) => {
    this.#updatePadding();

    // Iterations makes sure that we don't overflow the stack.
    // That could happen if the is no space for the popover on either side, which without iterations, would make it flip back and forth until the stack overflows
    iteration--;
    if (this.#targetElement === null) return;

    const isTopPlacement = this._actualPlacement.indexOf('top') !== -1;
    const isBottomPlacement = this._actualPlacement.indexOf('bottom') !== -1;
    const isLeftPlacement = this._actualPlacement.indexOf('left') !== -1;
    const isRightPlacement = this._actualPlacement.indexOf('right') !== -1;

    const isStart = this._actualPlacement.indexOf('-start') !== -1;
    const isEnd = this._actualPlacement.indexOf('-end') !== -1;

    const targetRect = this.#targetElement.getBoundingClientRect();
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
    // if we're currently in a top or bottom placement and the popover is outside the screen, and we have more iterations left.
    // Then flip the placement to opposite side
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
    // if we're currently in a left or right placement and the popover is outside the screen, and we have more iterations left.
    // Then flip the placement to opposite side
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
    (this.style as any)[paddingSide] = `${this.margin}px`;
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
