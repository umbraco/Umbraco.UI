import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property, query } from 'lit/decorators.js';
import { UUIPopoverEvent } from './UUIPopoverEvent';

export type PopoverPlacement =
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

// ------------------- Math extensions ---------------------
function mathClamp(value: number, min: number, max: number) {
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  }
  return value;
}

function mathMap(
  value: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
) {
  return ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;
}

/**
 * @element uui-popover
 * @description Open a modal aligned with the opening element. This does not jet work within two layers of scroll containers.
 * @fires close - When popover is closed by user interaction.
 */
@defineElement('uui-popover')
export class UUIPopoverElement extends LitElement {
  static styles = [
    css`
      :host {
        position: relative;
      }
      #container {
        position: absolute;
      }
      #trigger {
        position: relative;
      }
    `,
  ];

  // Cashed non-state variables //////////////////////////////
  private intersectionObserver?: IntersectionObserver;
  private scrollEventHandler = this._updatePopover.bind(this);
  ////////////////////////////////////////////////////////////

  @query('#container') private containerElement!: HTMLElement;

  private _open = false;
  private _placement: PopoverPlacement = 'bottom-start';
  private _currentPlacement: PopoverPlacement | null = null;
  private _trigger?: Element;
  private _scrollParents: Element[] = [];

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
   * @type {string}
   * @attr placement
   * @default 'bottom-start'
   */
  @property({ type: String })
  get placement(): PopoverPlacement {
    return this._placement;
  }
  set placement(newValue: PopoverPlacement) {
    const oldValue = this._placement;
    this._placement = newValue || 'bottom-start';
    this._updatePopover();
    this.requestUpdate('placement', oldValue);
  }

  /**
   * Opens the popover-modal.
   * @type {boolean}
   * @attr open
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  get open() {
    return this._open;
  }
  set open(newValue) {
    const oldValue = this._open;
    this._open = newValue;
    newValue ? this._openPopover() : this._closePopover();
    this.requestUpdate('open', oldValue);
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._getScrollParents();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('mousedown', this._onDocumentClick);
    document.removeEventListener('scroll', this.scrollEventHandler);

    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      delete this.intersectionObserver;
    }

    this._scrollParents = [];
  }

  private _onTriggerSlotChanged = (event: any) => {
    this._trigger = event.target.assignedElements({
      flatten: true,
    })[0] as HTMLElement;
  };

  private _openPopover() {
    if (this.containerElement) {
      this.containerElement!.style.opacity = '0'; // Hide while measuring popover size.
      document.addEventListener('mousedown', this._onDocumentClick);

      requestAnimationFrame(() => {
        this._updatePopover();
        this._createIntersectionObserver();
        this.containerElement!.style.opacity = '1';
      });
    }
  }

  private _closePopover() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      delete this.intersectionObserver;
    }
    document.removeEventListener('mousedown', this._onDocumentClick);
    this._currentPlacement = null;
  }

  // Use this when changing the open state from within this component.
  private _forceClosePopover() {
    this.open = false;
    // Notifies about changes.
    this.dispatchEvent(new UUIPopoverEvent(UUIPopoverEvent.CLOSE));
  }

  private _getScrollParents(): any {
    const hostElement = this.shadowRoot!.host;
    let style = getComputedStyle(hostElement);
    if (style.position === 'fixed') {
      return;
    }

    const includeHidden = false;
    const excludeStaticParent = style.position === 'absolute';
    const overflowRegex = includeHidden
      ? /(auto|scroll|hidden)/
      : /(auto|scroll)/;

    let el = hostElement;
    while ((el = el.parentElement as Element)) {
      style = getComputedStyle(el);

      if (excludeStaticParent && style.position === 'static') {
        continue;
      }
      if (
        overflowRegex.test(style.overflow + style.overflowY + style.overflowX)
      ) {
        this._scrollParents.push(el);
      }
      if (style.position === 'fixed') {
        return;
      }
    }
    this._scrollParents.push(document.body);
  }

  private _createIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    };

    this.intersectionObserver = new IntersectionObserver(
      this._intersectionCallback,
      options
    );
    this.intersectionObserver.observe(this.containerElement as Element);
  }

  private _intersectionCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(element => {
      if (element.isIntersecting === false) {
        this._startScrollListener();
        this._updatePopover();
      }
    });
  };

  private _startScrollListener() {
    this._scrollParents.forEach(el => {
      el.addEventListener('scroll', this.scrollEventHandler);
    });
    document.addEventListener('scroll', this.scrollEventHandler);
  }
  private _stopScrollListener() {
    this._scrollParents.forEach(el => {
      el.removeEventListener('scroll', this.scrollEventHandler);
    });
    document.removeEventListener('scroll', this.scrollEventHandler);
  }

  private _onDocumentClick = (event: Event) => {
    if (!event.composedPath().includes(this)) {
      this._forceClosePopover();
    }
  };

  private _updatePopover() {
    if (!this.shadowRoot) {
      return;
    }

    const containerElement = this.containerElement;

    if (!containerElement) {
      return;
    }

    const result = this._calculatePopoverPlacement();

    containerElement.style.left = `${result.x}px`;
    containerElement.style.top = `${result.y}px`;
  }

  private _calculatePopoverPlacement(): { x: number; y: number } {
    const popoverRect = this.containerElement?.getBoundingClientRect();
    const triggerRect = this._trigger?.getBoundingClientRect();

    if (triggerRect != null && popoverRect != null) {
      const scrollParentRects = this._scrollParents.map(el =>
        el.getBoundingClientRect()
      );

      this._currentPlacement = this._currentPlacement || this._placement;

      if (this._placement !== 'auto') {
        this._currentPlacement = this._managePlacementFlip(
          popoverRect,
          scrollParentRects
        );
      }

      const isTopPlacement = this._currentPlacement.indexOf('top') !== -1;
      const isBottomPlacement = this._currentPlacement.indexOf('bottom') !== -1;
      const isLeftPlacement = this._currentPlacement.indexOf('left') !== -1;
      const isRightPlacement = this._currentPlacement.indexOf('right') !== -1;

      const isStart = this._currentPlacement.indexOf('-start') !== -1;
      const isEnd = this._currentPlacement.indexOf('-end') !== -1;

      // -------- | INITIATE MATH | --------
      let originX = 0.5;
      let originY = 0.5;
      let alignX = 0.5;
      let alignY = 0.5;

      let marginX = 0;
      let marginY = 0;

      if (this.placement === 'auto') {
        const halfWindowX = this._scrollParents[0].clientWidth / 2;
        const halfWindowY = this._scrollParents[0].clientHeight / 2;

        const dirX = mathClamp(
          mathMap(halfWindowX - triggerRect.x, 0, triggerRect.width, 0, 1),
          0,
          1
        );
        let dirY = mathClamp(
          mathMap(halfWindowY - triggerRect.y, 0, triggerRect.height, 0, 1),
          0,
          1
        );

        if (dirX > 0 && dirX < 1) {
          dirY = Math.round(dirY);
        }

        originX = dirX;
        originY = dirY;
        alignX = 1 - dirX;
        alignY = 1 - dirY;
        marginX = this.margin;
        marginY = this.margin;
      } else {
        // -------- TOP / BOT --------
        if (isTopPlacement) {
          alignY = 1;
          originY = 0;
        }

        if (isBottomPlacement) {
          alignY = 0;
          originY = 1;
        }

        if (isTopPlacement || isBottomPlacement) {
          if (isStart) {
            alignX = 0;
            originX = 0;
          }
          if (isEnd) {
            alignX = 1;
            originX = 1;
          }
        }

        // -------- LEFT / RIGHT --------
        if (isLeftPlacement) {
          alignX = 1;
          originX = 0;
        }
        if (isRightPlacement) {
          alignX = 0;
          originX = 1;
        }

        if (isLeftPlacement || isRightPlacement) {
          if (isStart) {
            alignY = 0;
            originY = 0;
          }
          if (isEnd) {
            alignY = 1;
            originY = 1;
          }
        }
      }

      const calcX =
        -popoverRect.width * alignX +
        triggerRect.width * originX -
        marginX * (alignX * 2 - 1);
      const calcY =
        -popoverRect.height * alignY +
        triggerRect.height * originY -
        marginY * (alignY * 2 - 1);

      let posX = calcX;
      let posY = calcY;

      // Moves the popover to keep it fully visible on the screen as long as its still in contact with the trigger.
      if (this.placement !== 'auto') {
        // Only do this clamp if popover is on the top or bottom of the parent.
        if (isTopPlacement || isBottomPlacement) {
          this._scrollParents.forEach((el, index) => {
            const rectX = el === document.body ? 0 : scrollParentRects[index].x;
            const leftClamp = -triggerRect.x + rectX;
            const rightClamp =
              el.clientWidth -
              triggerRect.x -
              triggerRect.width +
              calcX +
              rectX -
              (popoverRect.width - triggerRect.width) * (1 - originX);
            posX = mathClamp(posX, leftClamp, rightClamp);
          });

          // keep within contact of the trigger, must be last:
          posX = mathClamp(posX, -popoverRect.width, triggerRect.width);
        } else if (isLeftPlacement || isRightPlacement) {
          // Only do this clamp if popover is on the sides of the parent.

          this._scrollParents.forEach((el, index) => {
            const rectY = el === document.body ? 0 : scrollParentRects[index].y;
            const topClamp = -triggerRect.y + rectY;
            const bottomClamp =
              el.clientHeight -
              triggerRect.y -
              triggerRect.height +
              calcY +
              rectY -
              (popoverRect.height - triggerRect.height) * (1 - originY);
            posY = mathClamp(posY, topClamp, bottomClamp);
          });

          // keep within contact of the trigger, must be last:
          posY = mathClamp(posY, -popoverRect.height, triggerRect.height);
        }
      }

      if (calcX === posX && calcY === posY) {
        // Not offset anymore, so we can stop listening for scroll events:
        this._stopScrollListener();
      }

      // return the positions
      return { x: posX, y: posY };
    } else {
      return { x: 0, y: 0 };
    }
  }

  private _managePlacementFlip(
    popoverRect: DOMRect,
    scrollParentRects: DOMRect[]
  ): PopoverPlacement {
    const buffer = 2; // add this to the calculation make sure that the position checks are not off by e.g: 0.1 pixel.

    const placementSplit = this._placement.split('-');
    const currentSide = placementSplit[0];
    const placementAlign: string | null = placementSplit[1] || null;

    let sideFlip;
    this._scrollParents.some((el, index) => {
      const rectX = el === document.body ? 0 : scrollParentRects[index].x;
      const rectY = el === document.body ? 0 : scrollParentRects[index].y;

      if (currentSide === 'top' && popoverRect.y - buffer <= rectY) {
        sideFlip = 'bottom';
        return true;
      }
      if (
        currentSide === 'bottom' &&
        popoverRect.y + popoverRect.height + buffer >= el.clientHeight + rectY
      ) {
        sideFlip = 'top';
        return true;
      }
      if (currentSide === 'left' && popoverRect.x - buffer <= rectX) {
        sideFlip = 'right';
        return true;
      }
      if (
        currentSide === 'right' &&
        popoverRect.x + popoverRect.width + buffer >= el.clientWidth + rectX
      ) {
        sideFlip = 'left';
        return true;
      }

      return false;
    });

    if (sideFlip) {
      this._startScrollListener();
      return (sideFlip +
        (placementAlign ? `-${placementAlign}` : '')) as PopoverPlacement;
    }
    return this._placement;
  }

  render() {
    return html`
      <slot
        id="trigger"
        name="trigger"
        @slotchange=${this._onTriggerSlotChanged}></slot>
      <div id="container">
        ${this._open ? html`<slot name="popover"></slot>` : ''}
      </div>
    `;
  }
}