import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { demandCustomElement } from '@umbraco-ui/uui-base/lib/utils';
import type { UUIButtonElement } from '@umbraco-ui/uui-button/lib';
import type { UUIPopoverContainerElement } from '@umbraco-ui/uui-popover-container/lib';
import { css, html, LitElement } from 'lit';
import { property, query, queryAssignedElements } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

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

  // This gets all elements put inside the slot
  @queryAssignedElements({ flatten: true })
  private _slottedNodes?: HTMLElement[];

  // These store the component's internal state
  #childElements: HTMLElement[] = []; // All child elements
  #hiddenElements: HTMLElement[] = []; // Elements in the dropdown
  #hiddenElementsMap: Map<HTMLElement, HTMLElement> = new Map();
  #visibilityBreakpoints: number[] = []; // Width thresholds for each item

  // ResizeObserver watches for size changes
  #resizeObserver = new ResizeObserver(this.#onResize.bind(this));
  #childResizeObservers: ResizeObserver[] = [];
  #breakPointCalculationInProgress = false;

  connectedCallback() {
    super.connectedCallback();
    this.#initialize();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#resizeObserver.disconnect();
    this.#cleanup();
  }

  async #initialize() {
    // Make sure required components are loaded
    demandCustomElement(this, 'uui-button');
    demandCustomElement(this, 'uui-popover-container');
    demandCustomElement(this, 'uui-symbol-more');

    await this.updateComplete;
    this.#resizeObserver.observe(this._mainElement);
  }

  // This runs when the container size changes
  #onResize(entries: ResizeObserverEntry[]) {
    const newWidth = entries[0].contentBoxSize[0].inlineSize;
    this.#updateCollapsibleItems(newWidth);
  }

  // This runs when children are added/removed
  #onSlotChange() {
    this.#cleanup();
    this.#childElements = this._slottedNodes ? [...this._slottedNodes] : [];

    this.#childElements.forEach(el => {
      const observer = new ResizeObserver(
        this.#calculateBreakPoints.bind(this),
      );
      observer.observe(el);
      this.#childResizeObservers.push(observer);
    });

    this.#calculateBreakPoints();
  }

  #cleanup() {
    this.#childResizeObservers.forEach(observer => observer.disconnect());
    this.#childResizeObservers = [];
    this.#visibilityBreakpoints = [];

    // Clean up hidden elements
    this.#hiddenElements.forEach(el => {
      el.removeEventListener('click', this.#onItemClicked);
    });
    this.#hiddenElements = [];
    this.#hiddenElementsMap.clear();
  }

  // Calculate at what widths items should hide
  async #calculateBreakPoints() {
    if (this.#breakPointCalculationInProgress) return;

    this.#breakPointCalculationInProgress = true;
    requestAnimationFrame(() => {
      this.#breakPointCalculationInProgress = false;
    });

    await this.updateComplete;

    // Get the gap from CSS or use default
    const gapCSSVar = Number.parseFloat(
      getComputedStyle(this).getPropertyValue('--uui-responsive-container-gap'),
    );
    const gap = Number.isNaN(gapCSSVar) ? 8 : gapCSSVar;

    let totalWidth = 0;

    // Calculate cumulative width for each item
    for (let i = 0; i < this.#childElements.length; i++) {
      this.#childElements[i].style.display = '';
      totalWidth += this.#childElements[i].offsetWidth;
      this.#visibilityBreakpoints[i] = totalWidth;
      totalWidth += gap;
    }

    // Set the container width
    const tolerance = 2;
    this._mainElement.style.width = totalWidth - gap + tolerance + 'px';

    this.#updateCollapsibleItems(this._mainElement.offsetWidth);
  }

  // The main logic that shows/hides items
  #updateCollapsibleItems(containerWidth: number) {
    const moreButtonWidth = this._moreButtonElement?.offsetWidth || 40;
    const availableWidth = containerWidth - moreButtonWidth;

    // Clear previous hidden items
    this.#hiddenElements.forEach(el => {
      el.removeEventListener('click', this.#onItemClicked);
    });
    this.#hiddenElements = [];
    this.#hiddenElementsMap.clear();

    const len = this.#visibilityBreakpoints.length;

    if (this.collapse === 'end') {
      // Collapse from the END (right side) - current behavior
      for (let i = 0; i < len; i++) {
        const breakpoint = this.#visibilityBreakpoints[i];
        const element = this.#childElements[i];

        // Last item: use full width (no more button needed if all fit)
        const widthToCheck = i === len - 1 ? containerWidth : availableWidth;

        if (breakpoint <= widthToCheck) {
          element.style.display = '';
        } else {
          element.style.display = 'none';
          const clone = element.cloneNode(true) as HTMLElement;
          clone.style.display = '';
          clone.addEventListener('click', this.#onItemClicked);

          // Link clone ↔ original (bidirectional)
          this.#hiddenElementsMap.set(clone, element);
          this.#hiddenElementsMap.set(element, clone);

          this.#hiddenElements.push(clone);
        }
      }
    } else {
      // Collapse from the START (left side)
      // Calculate total width of all items
      const totalWidth = this.#visibilityBreakpoints[len - 1] || 0;

      for (let i = 0; i < len; i++) {
        const element = this.#childElements[i];
        // Width from this item to the end
        const widthFromEnd =
          totalWidth - (i > 0 ? this.#visibilityBreakpoints[i - 1] : 0);

        // First visible item: use full width (no more button needed if all fit)
        const isFirstPotentiallyVisible =
          i === 0 || this.#childElements[i - 1].style.display === 'none';
        const widthToCheck =
          isFirstPotentiallyVisible && this.#hiddenElements.length === 0
            ? containerWidth
            : availableWidth;

        if (widthFromEnd <= widthToCheck) {
          element.style.display = '';
        } else {
          element.style.display = 'none';
          const clone = element.cloneNode(true) as HTMLElement;
          clone.style.display = '';
          clone.addEventListener('click', this.#onItemClicked);

          // Link clone ↔ original (bidirectional)
          this.#hiddenElementsMap.set(clone, element);
          this.#hiddenElementsMap.set(element, clone);
          this.#hiddenElements.push(clone);
        }
      }
    }

    // Show/hide the "more" button
    if (this.#hiddenElements.length === 0) {
      this._moreButtonElement.style.display = 'none';
      this._popoverContainerElement?.hidePopover();
    } else {
      this._moreButtonElement.style.display = '';
    }

    this.requestUpdate();
  }

  #onItemClicked = (e: MouseEvent) => {
    const clickedElement = e.currentTarget as HTMLElement;

    // Find the original element linked to this clone
    const originalElement = this.#hiddenElementsMap.get(clickedElement);

    if (originalElement) {
      // Close the dropdown
      this._popoverContainerElement?.hidePopover();

      // Trigger click on the ORIGINAL element so its event handlers fire
      originalElement.click();
    }
  };

  render() {
    const moreButton = html`
      <uui-button
        popovertarget="popover-container"
        style="display: none"
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
        <div id="items-container">
          <slot @slotchange=${this.#onSlotChange}></slot>
        </div>
        ${this.collapse === 'end' ? moreButton : ''}
      </div>
      <uui-popover-container
        id="popover-container"
        popover
        placement=${this.collapse === 'start' ? 'bottom-start' : 'bottom-end'}>
        <div id="dropdown-container">
          ${repeat(this.#hiddenElements, el => html`${el}`)}
        </div>
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
        gap: var(--uui-responsive-container-gap, 8px);
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
        margin-left: var(--uui-responsive-container-gap, 8px);
      }

      :host([collapse='start']) #more-button {
        margin-right: var(--uui-responsive-container-gap, 8px);
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
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-responsive-container': UUIResponsiveContainerElement;
  }
}
