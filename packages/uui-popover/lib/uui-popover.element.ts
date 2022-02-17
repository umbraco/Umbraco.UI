import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { UUIPopoverEvent } from './UUIPopoverEvent';

export type PopoverPlacement =
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
      #root,
      #trigger {
        position: relative;
      }
    `,
  ];

  // Cashed non-state variables //////////////////////////////
  private intersectionObserver?: IntersectionObserver;
  private scrollEventHandler = this._updatePopover.bind(this);
  private foundScrollParent = false;
  ////////////////////////////////////////////////////////////

  @query('#container') private containerElement!: HTMLElement;

  // TODO: Disabled.

  // Maybe not need to be state:
  @state()
  private _open = false;
  @state()
  private _placement: PopoverPlacement = 'bottom-start';
  @state()
  private trigger?: Element;
  @state()
  private scrollParent!: Element;

  // TODO: Docs/Description of this property
  @property({ type: Boolean, attribute: 'use-clamp' })
  useClamp = false;

  // TODO: Docs/Description of this property
  @property({ type: Boolean, attribute: 'use-auto-placement' })
  useAutoPlacement = false;

  // TODO: Docs/Description of this property
  @property({ type: Number })
  margin = 0;

  // TODO: name to Placement, use - and use the terms start / end, center should be default.
  @property({ type: String })
  get placement(): PopoverPlacement {
    return this._placement;
  }
  set placement(newValue: PopoverPlacement) {
    this._placement = newValue || 'bottom-start';
    this._updatePopover();
  }

  // TODO: Docs/Description of this property
  @property({ type: Boolean, reflect: true })
  get open() {
    return this._open;
  }
  set open(newValue) {
    this._open = newValue;
    newValue ? this._openPopover() : this._closePopover();
  }

  protected firstUpdated() {
    const slot = this.shadowRoot!.querySelector('slot');
    const childNodes = slot!.assignedNodes({ flatten: true });
    this.trigger = childNodes[0] as HTMLElement;

    this.scrollParent = this._getScrollParent(this.shadowRoot!.host);
  }

  public disconnectedCallback() {
    document.removeEventListener('mousedown', this._onDocumentClick);
    document.removeEventListener('scroll', this.scrollEventHandler);

    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      delete this.intersectionObserver;
    }

    this.foundScrollParent = false;
  }

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
  }

  // Use this when changing the open state from within this component.
  private _forceClosePopover() {
    this.open = false;
    // Notifies about changes.
    this.dispatchEvent(new UUIPopoverEvent(UUIPopoverEvent.CLOSE));
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

  private _getScrollParent(element: Element): any {
    let style = getComputedStyle(element);
    const includeHidden = false;
    const excludeStaticParent = style.position === 'absolute';
    const overflowRegex = includeHidden
      ? /(auto|scroll|hidden)/
      : /(auto|scroll)/;

    for (let parent = element; (parent = parent.parentElement as Element); ) {
      if (style.position === 'fixed') return document.body;
      style = getComputedStyle(parent);
      if (excludeStaticParent && style.position === 'static') {
        continue;
      }
      if (
        overflowRegex.test(style.overflow + style.overflowY + style.overflowX)
      ) {
        this.foundScrollParent = true;
        return parent;
      }

      if (parent === document.body) {
        return parent;
      }
    }
  }

  // TODO: When offset, keep listening for scroll.
  private _intersectionCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(element => {
      if (element.isIntersecting === false) {
        this._startScrollListener();
      }
    });
  };

  private _startScrollListener() {
    if (this.foundScrollParent) {
      this.scrollParent.addEventListener('scroll', this.scrollEventHandler);
    } else {
      document.addEventListener('scroll', this.scrollEventHandler);
    }
  }
  private _stopScrollListener() {
    this.scrollParent.removeEventListener('scroll', this.scrollEventHandler);
    document.removeEventListener('scroll', this.scrollEventHandler);
  }

  // Close when clicking outside popover
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

    const conRect = this.containerElement!.getBoundingClientRect()!;
    const triggerRect = this.trigger!.getBoundingClientRect()!;
    const scrollParentRect = this.scrollParent.getBoundingClientRect();

    const result = this._calculatePopoverPlacement(
      conRect,
      triggerRect,
      scrollParentRect
    );

    containerElement.style.left = `${result.x}px`;
    containerElement.style.top = `${result.y}px`;
  }

  private _calculatePopoverPlacement(
    conRect: DOMRect,
    triggerRect: DOMRect,
    scrollParentRect: DOMRect
  ): { x: number; y: number } {
    if (triggerRect != null && conRect != null) {
      const isTopPlacement = this._placement.indexOf('top') !== -1;
      const isBottomPlacement = this._placement.indexOf('bottom') !== -1;
      const isLeftPlacement = this._placement.indexOf('left') !== -1;
      const isRightPlacement = this._placement.indexOf('right') !== -1;

      const isStart = this._placement.indexOf('-start') !== -1;
      const isEnd = this._placement.indexOf('-end') !== -1;

      // -------- | INITIATE MATH | --------
      let originX = 0;
      let originY = 0;
      let alignX = 0;
      let alignY = 0;

      let marginX = 0;
      let marginY = 0;

      if (this.useAutoPlacement) {
        const halfWindowX = this.scrollParent.clientWidth / 2;
        const halfWindowY = this.scrollParent.clientHeight / 2;

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
        this._updatePopoverPosition(conRect, scrollParentRect);
        // -------- TOP / BOT --------
        if (isTopPlacement) {
          alignY = 1;
          originY = 0;
          marginY = this.margin;
        }

        if (isBottomPlacement) {
          alignY = 0;
          originY = 1;
          marginY = this.margin;
        }

        if (isTopPlacement || isBottomPlacement) {
          alignX = 0.5;
          originX = 0.5;

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
          marginX = this.margin;
        }
        if (isRightPlacement) {
          alignX = 0;
          originX = 1;
          marginX = this.margin;
        }

        if (isLeftPlacement || isRightPlacement) {
          alignY = 0.5;
          originY = 0.5;

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
        -conRect.width * alignX +
        triggerRect.width * originX -
        marginX * (alignX * 2 - 1);
      const calcY =
        -conRect.height * alignY +
        triggerRect.height * originY -
        marginY * (alignY * 2 - 1);

      //let clampXFinal = calcX;
      //let clampYFinal = calcY;

      let posX = calcX;
      let posY = calcY;

      const scrollParentY = this.foundScrollParent ? scrollParentRect.y : 0;
      const scrollParentX = this.foundScrollParent ? scrollParentRect.x : 0;

      // IF useClamp and not using auto-placement
      // Clamps the popover to the screen as long as parent is on screen
      if (this.useClamp && !this.useAutoPlacement) {
        // Only do this clamp if popover is on the top or bottom of the parent.
        if (isTopPlacement || isBottomPlacement) {
          const leftClamp = -triggerRect.x + scrollParentX;
          const rightClamp =
            this.scrollParent.clientWidth -
            triggerRect.x -
            triggerRect.width +
            calcX +
            scrollParentX -
            (conRect.width - triggerRect.width) * (1 - originX);

          posX = mathClamp(calcX, leftClamp, rightClamp);
          posX = mathClamp(posX, -conRect.width, triggerRect.width);
        }

        if (isLeftPlacement || isRightPlacement) {
          // Only do this clamp if popover is on the sides of the parent.
          const topClamp = -triggerRect.y + scrollParentY;
          const bottomClamp =
            this.scrollParent.clientHeight -
            triggerRect.y -
            triggerRect.height +
            calcY +
            scrollParentY -
            (conRect.height - triggerRect.height) * (1 - originY);

          posY = mathClamp(calcY, topClamp, bottomClamp);
          posY = mathClamp(posY, -conRect.height, triggerRect.height);
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

  private _updatePopoverPosition(rect: DOMRect, scrollParentRect: DOMRect) {
    const sideSplit = this._placement.split('-');
    const currentSide = sideSplit[0];
    const sideSuffix: string | null = sideSplit[1] || null;

    const viewportHeight = this.foundScrollParent
      ? this.scrollParent.clientHeight
      : document.documentElement.clientHeight;
    const viewportWidth = this.foundScrollParent
      ? this.scrollParent.clientWidth
      : document.documentElement.clientWidth;

    const scrollParentY = this.foundScrollParent ? scrollParentRect.y : 0;
    const scrollParentX = this.foundScrollParent ? scrollParentRect.x : 0;

    let flipSide = '';

    // add this to the calculation make sure that the position checks are not off by e.g: 0.1 pixel.
    const buffer = 2;

    if (currentSide === 'top' && rect.y - buffer <= scrollParentY) {
      flipSide = 'bottom';
    }
    if (
      currentSide === 'bottom' &&
      rect.y + rect.height + buffer >= viewportHeight + scrollParentY
    ) {
      flipSide = 'top';
    }
    if (currentSide === 'left' && rect.x - buffer <= scrollParentX) {
      flipSide = 'right';
    }
    if (
      currentSide === 'right' &&
      rect.x + rect.width + buffer >= viewportWidth + scrollParentX
    ) {
      flipSide = 'left';
    }

    // If we need to flip, do it, otherwise dont do anything.
    if (flipSide) {
      this._placement = (flipSide +
        (sideSuffix ? `-${sideSuffix}` : '')) as PopoverPlacement;
    }
  }

  render() {
    return html`
      <div id="root">
        <slot id="trigger" name="trigger"></slot>
        <div id="container">
          ${this._open ? html`<slot name="popover"></slot>` : ''}
        </div>
      </div>
    `;
  }
}
