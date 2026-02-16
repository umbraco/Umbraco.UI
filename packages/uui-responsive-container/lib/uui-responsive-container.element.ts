import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { demandCustomElement } from '@umbraco-ui/uui-base/lib/utils';
import type { UUIButtonElement } from '@umbraco-ui/uui-button/lib';
import type { UUIPopoverContainerElement } from '@umbraco-ui/uui-popover-container/lib';
import { css, html, LitElement } from 'lit';
import { property, query, state } from 'lit/decorators.js';

import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-popover-container/lib';
import '@umbraco-ui/uui-symbol-more/lib';

/**
 * A responsive container that collapses overflowing children into a dropdown.
 *
 * @element uui-responsive-container
 * @slot - Default slot for child elements (buttons, etc.)
 * @cssprop --uui-responsive-container-gap - Gap between items (default: 8px)
 */
@defineElement('uui-responsive-container')
export class UUIResponsiveContainerElement extends LitElement {
  // These help us find elements inside the component
  @query('#more-button')
  private _moreButtonElement!: UUIButtonElement;

  @query('#popover-container')
  private _popoverContainerElement!: UUIPopoverContainerElement;

  @query('#main')
  private _mainElement!: HTMLElement;

  /**
   * Controls which side items collapse from.
   * - "end": Items collapse from the right, more button appears on right (default)
   * - "start": Items collapse from the left, more button appears on left
   * @attr collapse
   * @default "end"
   */
  @property({ type: String, reflect: true })
  collapse: 'start' | 'end' = 'end';

  protected _childElements: HTMLElement[] = []; // All child elements
  #visibilityBreakpoints: number[] = []; // Width thresholds for each item

  @state()
  protected _visibleCount = 0;

  // ResizeObserver watches for size changes
  #resizeObserver = new ResizeObserver(this.#onResize.bind(this));
  #mutationObserver = new MutationObserver(this.#onChildrenChange.bind(this));
  #childResizeObservers: ResizeObserver[] = [];
  #breakPointCalculationInProgress = false;

  #isConnected = false;

  connectedCallback() {
    super.connectedCallback();
    this.#isConnected = true;
    this.#initialize();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#isConnected = false;
    this.#resizeObserver.disconnect();
    this.#mutationObserver.disconnect();
    this._cleanup();
  }

  async #initialize() {
    // Make sure required components are loaded
    demandCustomElement(this, 'uui-button');
    demandCustomElement(this, 'uui-popover-container');
    demandCustomElement(this, 'uui-symbol-more');

    await this.updateComplete;
    this.#resizeObserver.observe(this._mainElement);

    this.#mutationObserver.observe(this, {
      childList: true,
      subtree: false,
    });

    this._scanChildren();
  }

  #onChildrenChange() {
    this._scanChildren();
  }

  // This runs when the container size changes
  #onResize(entries: ResizeObserverEntry[]) {
    const newWidth = entries[0].contentBoxSize[0].inlineSize;
    this.#updateCollapsibleItems(newWidth);
  }

  protected _scanChildren() {
    if (!this.#isConnected) return;

    this._cleanup();

    // Get all direct children that are HTML elements, excluding reserved slots
    const children = this._filterChildren();

    // Assign each child a named slot: item-0, item-1, item-2...
    children.forEach((child, index) => {
      child.setAttribute('slot', `item-${index}`);
    });

    this._childElements = children;

    // Set up resize observers for each child
    children.forEach(child => {
      this._onChildSetup(child);

      const observer = new ResizeObserver(
        this.#calculateBreakPoints.bind(this),
      );
      observer.observe(child);
      this.#childResizeObservers.push(observer);
    });

    this.#calculateBreakPoints();
  }

  /**
   * Returns the children that should be managed.
   * Override in subclasses to filter for specific element types.
   */
  protected _filterChildren(): HTMLElement[] {
    return Array.from(this.children).filter(
      (child): child is HTMLElement =>
        child instanceof HTMLElement &&
        child.getAttribute('slot') !== 'trigger-content',
    );
  }

  /**
   * Called for each child during scanning.
   * Override in subclasses to add per-child setup like event listeners.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected _onChildSetup(_child: HTMLElement): void {
    // Base does nothing. Subclasses can override.
  }

  protected _cleanup() {
    this.#childResizeObservers.forEach(observer => observer.disconnect());
    this.#childResizeObservers = [];
    this.#visibilityBreakpoints = [];
  }

  // Calculate at what widths items should hide
  async #calculateBreakPoints() {
    if (this.#breakPointCalculationInProgress) return;

    this.#breakPointCalculationInProgress = true;

    // Show all items so we can measure them
    this._visibleCount = this._childElements.length;
    await this.updateComplete;

    // Get the gap from CSS or use default
    const gapCSSVar = Number.parseFloat(
      getComputedStyle(this).getPropertyValue('--uui-responsive-container-gap'),
    );
    const gap = Number.isNaN(gapCSSVar) ? 8 : gapCSSVar;

    let totalWidth = 0;
    this.#visibilityBreakpoints = [];

    // Calculate cumulative width for each item
    for (let i = 0; i < this._childElements.length; i++) {
      totalWidth += this._childElements[i].offsetWidth;
      this.#visibilityBreakpoints[i] = totalWidth;
      totalWidth += gap;
    }

    // Set the container width
    const tolerance = 2;
    this._mainElement.style.width = totalWidth - gap + tolerance + 'px';

    this.#updateCollapsibleItems(this._mainElement.offsetWidth);
    this.#breakPointCalculationInProgress = false;
  }

  // The main logic that shows/hides items
  #updateCollapsibleItems(containerWidth: number) {
    const moreButtonWidth = this._moreButtonElement?.offsetWidth || 40;
    const availableWidth = containerWidth - moreButtonWidth;
    const len = this.#visibilityBreakpoints.length;

    let visibleCount = 0;

    if (this.collapse === 'end') {
      // Collapse from the END: first N items visible, rest in dropdown
      for (let i = 0; i < len; i++) {
        const breakpoint = this.#visibilityBreakpoints[i];
        // Last item: use full width (no more button needed if all fit)
        const isLast = i === len - 1;
        const widthToCheck = isLast ? containerWidth : availableWidth;

        if (breakpoint <= widthToCheck) {
          visibleCount = i + 1;
        } else {
          break;
        }
      }
    } else {
      // Collapse from the START: last N items visible, first ones in dropdown
      const totalWidth = this.#visibilityBreakpoints[len - 1] || 0;

      for (let i = len - 1; i >= 0; i--) {
        const widthFromEnd =
          totalWidth - (i > 0 ? this.#visibilityBreakpoints[i - 1] : 0);
        // First visible item: use full width (no more button needed if all fit)
        const isAll = i === 0;
        const widthToCheck = isAll ? containerWidth : availableWidth;

        if (widthFromEnd <= widthToCheck) {
          visibleCount = len - i;
        } else {
          break;
        }
      }
    }

    this._visibleCount = visibleCount;

    // Hide popover if all items are visible
    if (visibleCount === len) {
      this._popoverContainerElement?.hidePopover();
    }
  }

  render() {
    let visibleSlots;
    let dropdownSlots;

    if (this.collapse === 'end') {
      // First _visibleCount items are visible, rest go to dropdown
      visibleSlots = this._childElements
        .slice(0, this._visibleCount)
        .map((_, i) => html`<slot name="item-${i}"></slot>`);

      dropdownSlots = this._childElements
        .slice(this._visibleCount)
        .map(
          (_, i) => html`<slot name="item-${this._visibleCount + i}"></slot>`,
        );
    } else {
      // Last _visibleCount items are visible, first ones go to dropdown
      const hiddenCount = this._childElements.length - this._visibleCount;

      dropdownSlots = this._childElements
        .slice(0, hiddenCount)
        .map((_, i) => html`<slot name="item-${i}"></slot>`);

      visibleSlots = this._childElements
        .slice(hiddenCount)
        .map((_, i) => html`<slot name="item-${hiddenCount + i}"></slot>`);
    }

    const showMoreButton = dropdownSlots.length > 0;

    const moreButton = html`
      <uui-button
        popovertarget="popover-container"
        style=${showMoreButton ? '' : 'display: none'}
        id="more-button"
        label="More"
        compact>
        <slot name="trigger-content">
          <uui-symbol-more></uui-symbol-more>
        </slot>
      </uui-button>
    `;

    return html`
      <div id="main">
        ${this.collapse === 'start' ? moreButton : ''}
        <div id="items-container">${visibleSlots}</div>
        ${this.collapse === 'end' ? moreButton : ''}
      </div>
      <uui-popover-container
        id="popover-container"
        popover
        placement=${this.collapse === 'start' ? 'bottom-start' : 'bottom-end'}>
        <div id="dropdown-container">${dropdownSlots}</div>
      </uui-popover-container>
    `;
  }

  static styles = [
    css`
      :host {
        display: flex;
        min-width: 0;
      }

      #main {
        display: flex;
        overflow: hidden;
        align-items: center;
      }

      #items-container {
        display: flex;
        gap: var(--uui-responsive-container-gap, var(--uui-size-3));
        overflow: hidden;
        align-items: center;
      }

      #more-button {
        --uui-button-background-color: transparent;
        --uui-button-background-color-hover: var(--uui-color-surface-alt);
        flex-shrink: 0;
      }

      :host([collapse='end']) #more-button,
      :host(:not([collapse])) #more-button {
        margin-left: var(--uui-responsive-container-gap, var(--uui-size-3));
      }

      :host([collapse='start']) #more-button {
        margin-right: var(--uui-responsive-container-gap, var(--uui-size-3));
      }

      #dropdown-container {
        display: flex;
        flex-direction: column;
        background-color: var(--uui-color-surface);
        border-radius: var(--uui-border-radius);
        box-shadow: var(--uui-shadow-depth-3);
        overflow: hidden;
        padding: var(--uui-size-space-2);
        gap: var(--uui-size-space-1);
      }

      #dropdown-container ::slotted(*) {
        width: 100%;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-responsive-container': UUIResponsiveContainerElement;
  }
}
