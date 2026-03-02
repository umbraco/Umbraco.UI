import { findAncestorByAttributeValue } from '../../internal/utils/index.js';
import { css, html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';

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
 * @attr popover - Indicates that the element is a popover container
 */
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
  #scrollParents: Element[] = [];
  #sizeObserver: ResizeObserver | null = null;
  #size: { width: number; height: number } = { width: 0, height: 0 };

  constructor() {
    super();

    this.addEventListener('beforetoggle', this.#onBeforeToggle, {
      passive: true,
    });
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (!this.hasAttribute('popover')) {
      this.setAttribute('popover', '');
    }

    if (!this.#sizeObserver) {
      this.#sizeObserver = new ResizeObserver(entries => {
        const element = entries[0]; // should be only one
        const width = element.contentRect.width;
        const height = element.contentRect.height;

        if (width === this.#size.width && height === this.#size.height) {
          return; // no change
        }

        this.#size = { width, height };
        this.#initUpdate();
      });

      // start listening for size changes
      this.#sizeObserver.observe(this);
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#stopScrollListener();
    this.#sizeObserver?.disconnect();
    this.#sizeObserver = null;
  }

  readonly #onBeforeToggle = (event: any) => {
    this._open = event.newState === 'open';

    this.#targetElement = findAncestorByAttributeValue(
      this,
      'popovertarget',
      this.id,
    );

    // Dispatch a custom event that can be listened to by the popover target.
    // Mostly used for UUIButton.
    this.#targetElement?.dispatchEvent(
      new CustomEvent('uui-popover-before-toggle', {
        bubbles: false,
        composed: false,
        detail: { oldState: event.oldState, newState: event.newState },
      }),
    );

    if (this._open) {
      this.#calculateScrollParents();

      this.#startScrollListener();

      requestAnimationFrame(() => {
        this.#initUpdate();
      });
    } else {
      this.#stopScrollListener();
    }
  };

  readonly #initUpdate = () => {
    if (!this._open) return;

    this._actualPlacement = this._placement;
    this.style.opacity = '0';

    // 3 iterations makes the popover flip back to the initial position if theres no space for it on either side.
    this.#updatePosition(3);
  };

  readonly #updatePosition = (iteration: number) => {
    this.#updatePadding();

    // Iterations makes sure that we don't overflow the stack.
    // That could happen if the is no space for the popover on either side, which without iterations, would make it flip back and forth until the stack overflows
    iteration--;
    if (this.#targetElement === null) return;

    const targetRect = this.#targetElement.getBoundingClientRect();
    const popoverRect = this.getBoundingClientRect();

    let { top, left } = this.#calculateAlignedPosition(targetRect, popoverRect);
    const result = this.#clampAndFlip(
      top,
      left,
      targetRect,
      popoverRect,
      iteration,
    );

    if (result === null) return; // flipped and recursed

    top = result.top;
    left = result.left;

    // Detect if the popover is completely outside the screen on any side
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const isCompletelyOutsideScreen =
      top + popoverRect.height < 0 ||
      top > screenHeight ||
      left + popoverRect.width < 0 ||
      left > screenWidth;

    if (isCompletelyOutsideScreen) {
      this.hidePopover();
    }

    // Set the popover's position
    this.style.transform = `translate(${left}px, ${top}px)`;
    this.style.opacity = '1';
  };

  #calculateAlignedPosition(targetRect: DOMRect, popoverRect: DOMRect) {
    const isStart = this._actualPlacement.includes('-start');
    const isEnd = this._actualPlacement.includes('-end');

    // Alignment along the cross-axis
    const align = (pos: number, targetSize: number, popoverSize: number) => {
      if (isStart) return pos;
      if (isEnd) return pos + targetSize - popoverSize;
      return pos + targetSize / 2 - popoverSize / 2;
    };

    const side = this._actualPlacement.split('-')[0];

    // For top/bottom: top is determined by placement, left by alignment
    // For left/right: left is determined by placement, top by alignment
    const positions: Record<string, { top: number; left: number }> = {
      bottom: {
        top: targetRect.top + targetRect.height,
        left: align(targetRect.left, targetRect.width, popoverRect.width),
      },
      top: {
        top: targetRect.top - popoverRect.height,
        left: align(targetRect.left, targetRect.width, popoverRect.width),
      },
      left: {
        top: align(targetRect.top, targetRect.height, popoverRect.height),
        left: targetRect.left - popoverRect.width,
      },
      right: {
        top: align(targetRect.top, targetRect.height, popoverRect.height),
        left: targetRect.left + targetRect.width,
      },
    };

    return positions[side] ?? { top: 0, left: 0 };
  }

  #clampAndFlip(
    top: number,
    left: number,
    targetRect: DOMRect,
    popoverRect: DOMRect,
    iteration: number,
  ): { top: number; left: number } | null {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const side = this._actualPlacement.split('-')[0];
    const isVertical = side === 'top' || side === 'bottom';

    // Vertical clamping
    const topTargetVsScreenTop = Math.min(
      0,
      targetRect.top + targetRect.height,
    );
    const topTargetVsScreenBottom = Math.max(
      Math.min(top, screenHeight - popoverRect.height),
      targetRect.top - popoverRect.height,
    );
    const topClamped = Math.max(topTargetVsScreenTop, topTargetVsScreenBottom);

    if (topClamped !== top && isVertical && iteration > 0) {
      this.#flipPlacement();
      this.#updatePosition(iteration);
      return null;
    }

    // Horizontal clamping
    const leftTargetVsScreenLeft = Math.min(
      0,
      targetRect.left + targetRect.width,
    );
    const leftTargetVsScreenRight = Math.max(
      Math.min(left, screenWidth - popoverRect.width),
      targetRect.left - popoverRect.width,
    );
    const leftClamped = Math.max(
      leftTargetVsScreenLeft,
      leftTargetVsScreenRight,
    );

    if (leftClamped !== left && !isVertical && iteration > 0) {
      this.#flipPlacement();
      this.#updatePosition(iteration);
      return null;
    }

    return { top: topClamped, left: leftClamped };
  }

  readonly #updatePadding = () => {
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

  #startScrollListener() {
    this.#scrollParents.forEach(el => {
      el.addEventListener('scroll', this.#initUpdate, { passive: true });
    });
    document.addEventListener('scroll', this.#initUpdate, { passive: true });
  }
  #stopScrollListener() {
    this.#scrollParents.forEach(el => {
      el.removeEventListener('scroll', this.#initUpdate);
    });
    document.removeEventListener('scroll', this.#initUpdate);
  }

  /**
   * @internal
   */
  _getScrollParents() {
    return this.#scrollParents;
  }

  #calculateScrollParents(): void {
    // Clear previous scroll parents to avoid duplicates
    this.#scrollParents = [];

    if (!this.#targetElement) return;

    let style = getComputedStyle(this.#targetElement);
    if (style.position === 'fixed') {
      return;
    }

    const includeHidden = false;
    let excludeStaticParent = style.position === 'absolute';
    const overflowRegex = includeHidden
      ? /(auto|scroll|hidden)/
      : /(auto|scroll)/;

    let el: HTMLElement | undefined | null = this.#targetElement;
    while (el) {
      style = getComputedStyle(el);

      if (excludeStaticParent && style.position === 'static') {
        el = this.#getAncestorElement(el);
        continue;
      }

      if (style.position !== 'static') {
        excludeStaticParent = style.position === 'absolute';
      }

      if (
        overflowRegex.test(style.overflow + style.overflowY + style.overflowX)
      ) {
        this.#scrollParents.push(el);
      }
      if (style.position === 'fixed') {
        return;
      }

      el = this.#getAncestorElement(el);
    }
    this.#scrollParents.push(document.body);
  }

  #getAncestorElement(el: HTMLElement | null): HTMLElement | null {
    if (el?.parentElement) {
      return el.parentElement;
    }

    // If we had no parentElement, then check for shadow roots:
    return (el?.getRootNode() as any)?.host;
  }

  render() {
    return html`<slot></slot>`;
  }

  static override readonly styles = [
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
        color: var(--uui-color-text);
      }
    `,
  ];
}
