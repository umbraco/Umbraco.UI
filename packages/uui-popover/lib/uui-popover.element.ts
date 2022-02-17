import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { UUIPopoverEvent } from './UUIPopoverEvent';

// Can we write full names?
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
 * @description Open a modal aligned with the opening element.
 * @fires change - When popover opens or closes.
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
      #parent {
        position: relative;
      }
    `,
  ];

  // Cashed non-state variables //////////////////////////////
  private intersectionObserver?: IntersectionObserver;
  private documentClickEventHandler = this.onDocumentClick.bind(this);
  private scrollEventHandler = this.updateOverlay.bind(this);
  private scrollTimeout: any;
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
  private parent?: Element;
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
    this.updateOverlay();
  }

  // TODO: Docs/Description of this property
  @property({ type: Boolean, reflect: true })
  get open() {
    return this._open;
  }
  set open(newValue) {
    this._open = newValue;
    newValue ? this.openOverlay() : this.closeOverlay();
  }

  protected firstUpdated() {
    const slot = this.shadowRoot!.querySelector('slot');
    const childNodes = slot!.assignedNodes({ flatten: true });
    this.parent = childNodes[0] as HTMLElement;

    this.scrollParent = this.getScrollParent(this.shadowRoot!.host);
  }

  public disconnectedCallback() {
    document.removeEventListener('mousedown', this.documentClickEventHandler);
    document.removeEventListener('scroll', this.scrollEventHandler);

    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      delete this.intersectionObserver;
    }

    clearTimeout(this.scrollTimeout);
    this.foundScrollParent = false;
  }

  private openOverlay() {
    if (this.containerElement) {
      this.containerElement!.style.opacity = '0'; // Hide while measuring overlay size.
      document.addEventListener('mousedown', this.documentClickEventHandler);

      requestAnimationFrame(this.openOverlayFinal.bind(this));
    }
  }

  private openOverlayFinal() {
    this.updateOverlay();
    this.createIntersectionObserver();
    this.containerElement!.style.opacity = '1';
  }

  private closeOverlay() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      delete this.intersectionObserver;
    }
    document.removeEventListener('mousedown', this.documentClickEventHandler);
  }

  // Use this when changing the open state from within this component.
  private forceCloseOverlay() {
    this.open = false;
    // Notifies parent about changes.
    this.dispatchEvent(new UUIPopoverEvent(UUIPopoverEvent.CHANGE));
  }

  private createIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    };

    this.intersectionObserver = new IntersectionObserver(
      this.intersectionCallback,
      options
    );
    this.intersectionObserver.observe(this.containerElement as Element);
  }

  private getScrollParent(element: Element): any {
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
  private intersectionCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(element => {
      if (!element.isIntersecting) {
        if (this.foundScrollParent) {
          this.scrollParent.addEventListener('scroll', this.scrollEventHandler);
        } else {
          document.addEventListener('scroll', this.scrollEventHandler);
        }
      } else {
        // only unsubscribe when the container has been inside the screen for x milliseconds
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
          this.scrollParent.removeEventListener(
            'scroll',
            this.scrollEventHandler
          );
          document.removeEventListener('scroll', this.scrollEventHandler);
        }, 200);
      }
    });
  };

  // Close when clicking outside overlay
  private onDocumentClick(event: Event) {
    if (!event.composedPath().includes(this)) {
      this.forceCloseOverlay();
    }
  }

  private updateOverlay() {
    if (!this.shadowRoot) {
      return;
    }

    const containerElement = this.containerElement;

    if (!containerElement) {
      return;
    }

    const conRect = this.containerElement!.getBoundingClientRect()!;
    const parentRect = this.parent!.getBoundingClientRect()!;
    const scrollParentRect = this.scrollParent.getBoundingClientRect();

    containerElement.style.top = '';
    containerElement.style.bottom = '';
    containerElement.style.left = '';
    containerElement.style.right = '';

    const result = this.calculateOverlayPlacement(
      conRect,
      parentRect,
      scrollParentRect
    );

    containerElement.style.left = `${result.x}px`;
    containerElement.style.top = `${result.y}px`;
  }

  // TODO: Conciser adding Clamp for scroll-container inside scroll-container.
  private calculateOverlayPlacement(
    conRect: DOMRect,
    parentRect: DOMRect,
    scrollParentRect: DOMRect
  ): { x: number; y: number } {
    if (parentRect != null && conRect != null) {
      const isTopPlacement = this._placement.indexOf('top') !== -1;
      const isBottomPlacement = this._placement.indexOf('bottom') !== -1;
      const isLeftPlacement = this._placement.indexOf('left') !== -1;
      const isRightPlacement = this._placement.indexOf('right') !== -1;

      const isStart = this._placement.indexOf('-start') !== -1;
      const isEnd = this._placement.indexOf('-end') !== -1;

      //| 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'right' | 'right-start' | 'right-end' | 'left' | 'left-start' | 'left-end'

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
          mathMap(halfWindowX - parentRect.x, 0, parentRect.width, 0, 1),
          0,
          1
        );
        let dirY = mathClamp(
          mathMap(halfWindowY - parentRect.y, 0, parentRect.height, 0, 1),
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
        this.updateOverlayPosition(conRect, scrollParentRect);
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
        parentRect.width * originX -
        marginX * (alignX * 2 - 1);
      const calcY =
        -conRect.height * alignY +
        parentRect.height * originY -
        marginY * (alignY * 2 - 1);

      let clampXFinal = calcX;
      let clampYFinal = calcY;

      const scrollParentY = this.foundScrollParent ? scrollParentRect.y : 0;
      const scrollParentX = this.foundScrollParent ? scrollParentRect.x : 0;

      // IF useClamp and not using autoplacement
      // Clamps the overlay to the screen as long as parent is on screen
      if (this.useClamp && !this.useAutoPlacement) {
        // Only do this clamp if overlay is on the top or bottom of the parent.
        if (isTopPlacement || isBottomPlacement) {
          const leftClamp = -parentRect.x + scrollParentX;
          const rightClamp =
            this.scrollParent.clientWidth -
            parentRect.x -
            parentRect.width +
            calcX +
            scrollParentX -
            (conRect.width - parentRect.width) * (1 - originX);

          const clampX = mathClamp(calcX, leftClamp, rightClamp);
          clampXFinal = mathClamp(clampX, -conRect.width, parentRect.width);
        }

        if (isLeftPlacement || isRightPlacement) {
          // Only do this clamp if overlay is on the sides of the parent.
          const topClamp = -parentRect.y + scrollParentY;
          const bottomClamp =
            this.scrollParent.clientHeight -
            parentRect.y -
            parentRect.height +
            calcY +
            scrollParentY -
            (conRect.height - parentRect.height) * (1 - originY);

          const clampY = mathClamp(calcY, topClamp, bottomClamp);
          clampYFinal = mathClamp(clampY, -conRect.height, parentRect.height);
        }
      }

      // return the positions
      return { x: clampXFinal, y: clampYFinal };
    } else {
      return { x: 0, y: 0 };
    }
  }

  private updateOverlayPosition(rect: DOMRect, scrollParentRect: DOMRect) {
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
        <slot id="parent" name="parent"></slot>
        <div id="container">
          ${this._open ? html`<slot name="popover"></slot>` : ''}
        </div>
      </div>
    `;
  }
}
