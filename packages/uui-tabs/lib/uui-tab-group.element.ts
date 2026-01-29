import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { demandCustomElement } from '@umbraco-ui/uui-base/lib/utils';
import type { UUIButtonElement } from '@umbraco-ui/uui-button/lib';
import type { UUIPopoverContainerElement } from '@umbraco-ui/uui-popover-container/lib';
import { css, html, LitElement } from 'lit';
import { property, query, state } from 'lit/decorators.js';

import type { UUITabElement } from './uui-tab.element';

@defineElement('uui-tab-group')
export class UUITabGroupElement extends LitElement {
  @query('#more-button')
  private _moreButtonElement!: UUIButtonElement;
  @query('#popover-container')
  private _popoverContainerElement!: UUIPopoverContainerElement;
  @query('#main') private _mainElement!: HTMLElement;

  @state()
  private _visibleCount = 0;

  @property({
    type: String,
    reflect: true,
    attribute: 'dropdown-content-direction',
  })
  dropdownContentDirection: 'vertical' | 'horizontal' = 'vertical';

  #tabElements: HTMLElement[] = [];
  #visibilityBreakpoints: number[] = [];
  #currentGap = 0;
  #resizeObserver = new ResizeObserver(this.#onResize.bind(this));
  #tabResizeObservers: ResizeObserver[] = [];
  #breakPointCalculationInProgress = false;

  #mutationObserver = new MutationObserver(this.#onChildrenChange.bind(this));

  connectedCallback() {
    super.connectedCallback();
    this.#initialize();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#resizeObserver.disconnect();
    this.#mutationObserver.disconnect();
    this.#cleanupTabObservers();
  }

  async #initialize() {
    demandCustomElement(this, 'uui-button');
    demandCustomElement(this, 'uui-popover-container');
    demandCustomElement(this, 'uui-symbol-more');

    await this.updateComplete;
    this.#resizeObserver.observe(this._mainElement);

    this.#mutationObserver.observe(this, {
      childList: true,
      subtree: false,
    });

    this.#scanChildren();
  }

  #onChildrenChange() {
    this.#scanChildren();
  }

  #scanChildren() {
    this.#cleanupTabObservers();

    // Get all direct children that look like tabs
    const children = Array.from(this.children).filter(
      (child): child is HTMLElement =>
        child instanceof HTMLElement &&
        (child.tagName.toLowerCase() === 'uui-tab' ||
          child.hasAttribute('uui-tab') ||
          child.getAttribute('role') === 'tab'),
    );

    // Programmatically assign slot names: tab-0, tab-1, tab-2, etc.
    children.forEach((child, index) => {
      child.setAttribute('slot', `tab-${index}`);
    });

    // Store references
    this.#tabElements = children;

    //Set up click listeners for each tab
    children.forEach(child => {
      child.addEventListener('click', this.#onTabClicked);
    });

    //Set up resize observers for each tab
    children.forEach(child => {
      const observer = new ResizeObserver(() => this.#calculateBreakPoints());
      observer.observe(child);
      this.#tabResizeObservers.push(observer);
    });

    this.#calculateBreakPoints();
  }

  async #calculateBreakPoints() {
    // Prevent multiple calculations in the same frame
    if (this.#breakPointCalculationInProgress) return;
    this.#breakPointCalculationInProgress = true;

    await this.updateComplete;

    // Get current gap value from CSS custom property
    const gapCSSVar = Number.parseFloat(
      this.style.getPropertyValue('--uui-tab-group-gap'),
    );
    const gap = Number.isNaN(gapCSSVar) ? 0 : gapCSSVar;
    this.#currentGap = gap;

    // To measure tabs, we need them all visible temporarily
    // Set _visibleCount to show all tabs
    this._visibleCount = this.#tabElements.length;
    await this.updateComplete;

    // Measure each tab and calculate cumulative breakpoints
    let cumulativeWidth = 0;
    this.#visibilityBreakpoints = [];

    for (let i = 0; i < this.#tabElements.length; i++) {
      cumulativeWidth += this.#tabElements[i].offsetWidth;
      this.#visibilityBreakpoints[i] = cumulativeWidth;
      cumulativeWidth += gap;
    }

    // Set the main element's width for overflow detection
    const tolerance = 2;
    this._mainElement.style.width = cumulativeWidth - gap + tolerance + 'px';

    // Now calculate which tabs should actually be visible
    this.#updateCollapsibleTabs(this._mainElement.offsetWidth);

    this.#breakPointCalculationInProgress = false;
  }

  #updateCollapsibleTabs(containerWidth: number) {
    const moreButtonWidth = this._moreButtonElement?.offsetWidth || 0;
    const containerWithoutButtonWidth = containerWidth - moreButtonWidth;

    // Find how many tabs fit
    let visibleCount = 0;
    const len = this.#visibilityBreakpoints.length;

    for (let i = 0; i < len; i++) {
      const breakpoint = this.#visibilityBreakpoints[i];
      // For the last tab, we don't need space for the "more" button
      const isLast = i === len - 1;
      const availableWidth = isLast
        ? containerWidth
        : containerWithoutButtonWidth;

      if (breakpoint <= availableWidth) {
        visibleCount = i + 1;
      } else {
        break;
      }
    }

    // Update state - triggers re-render
    this._visibleCount = visibleCount;

    // Hide popover if all tabs are visible
    if (visibleCount === this.#tabElements.length) {
      this._popoverContainerElement?.hidePopover();
    }

    // Update the "active-inside" indicator on more button
    this.#updateActiveInsideState();
  }

  #updateActiveInsideState() {
    // Check if any tab in the dropdown is active
    const hasActiveHidden = this.#tabElements
      .slice(this._visibleCount)
      .some(tab => this.#isElementTabLike(tab) && tab.active);

    if (hasActiveHidden) {
      this._moreButtonElement?.classList.add('active-inside');
    } else {
      this._moreButtonElement?.classList.remove('active-inside');
    }
  }

  #onTabClicked = (e: MouseEvent) => {
    const selectedElement = e.currentTarget as HTMLElement;

    if (this.#isElementTabLike(selectedElement)) {
      selectedElement.active = true;

      this.#tabElements.forEach(el => {
        if (el !== selectedElement && this.#isElementTabLike(el)) {
          el.active = false;
        }
      });
      this.#updateActiveInsideState();
    }
  };

  #cleanupTabObservers() {
    this.#tabResizeObservers.forEach(observer => observer.disconnect());
    this.#tabResizeObservers = [];

    this.#tabElements.forEach(el => {
      el.removeEventListener('click', this.#onTabClicked);
    });
  }

  #onResize(entries: ResizeObserverEntry[]) {
    // Check if the gap css custom property has changed.
    const gapCSSVar = Number.parseFloat(
      this.style.getPropertyValue('--uui-tab-group-gap'),
    );
    const newGap = Number.isNaN(gapCSSVar) ? 0 : gapCSSVar;
    if (newGap !== this.#currentGap) {
      this.#calculateBreakPoints();
    } else {
      this.#updateCollapsibleTabs(entries[0].contentBoxSize[0].inlineSize);
    }
  }

  #isElementTabLike(el: any): el is UUITabElement {
    return (
      typeof el === 'object' && 'active' in el && typeof el.active === 'boolean'
    );
  }

  render() {
    const visibleSlots = this.#tabElements
      .slice(0, this._visibleCount)
      .map((_, i) => html`<slot name="tab-${i}"></slot>`);

    const dropdownSlots = this.#tabElements
      .slice(this._visibleCount)
      .map((_, i) => html`<slot name="tab-${this._visibleCount + i}"></slot>`);

    const showMoreButton = dropdownSlots.length > 0;

    return html`
      <div id="main">
        <div id="grid" role="tablist">${visibleSlots}</div>
        <uui-button
          popovertarget="popover-container"
          style=${showMoreButton ? '' : 'display: none'}
          id="more-button"
          label="More"
          compact>
          <uui-symbol-more></uui-symbol-more>
        </uui-button>
      </div>
      <uui-popover-container
        id="popover-container"
        popover
        placement="bottom-end">
        <div id="hidden-tabs-container" role="tablist">${dropdownSlots}</div>
      </uui-popover-container>
    `;
  }

  static styles = [
    css`
      :host {
        min-width: 0;
        display: flex;
        height: 100%;
      }

      #main {
        display: flex;
        justify-content: space-between;
        overflow: hidden;
      }

      #grid {
        width: 1fr;
        display: flex;
        height: 100%;
        min-height: 48px;
        overflow: hidden;
        text-wrap: nowrap;
        color: var(--uui-tab-text);
        gap: var(--uui-tab-group-gap, 0);
      }

      #popover-container {
        --uui-tab-text: var(--uui-tab-group-dropdown-tab-text, unset);
        --uui-tab-text-hover: var(
          --uui-tab-group-dropdown-tab-text-hover,
          unset
        );
        --uui-tab-text-active: var(
          --uui-tab-group-dropdown-tab-text-active,
          unset
        );
      }

      ::slotted(*:not(:last-of-type)) {
        border-right: 1px solid var(--uui-tab-divider, none);
      }

      #hidden-tabs-container ::slotted(*) {
        width: 100%;
      }

      #hidden-tabs-container {
        width: fit-content;
        display: flex;
        flex-direction: column;
        background-color: var(
          --uui-tab-group-dropdown-background,
          var(--uui-color-surface)
        );
        border-radius: var(--uui-border-radius);
        box-shadow: var(--uui-shadow-depth-3);
        overflow: hidden;
      }
      :host([dropdown-direction='horizontal']) #hidden-tabs-container {
        flex-direction: row;
      }

      #more-button {
        position: relative;

        --uui-button-contrast: var(--uui-tab-text);
        --uui-button-contrast-hover: var(--uui-tab-text-hover);
        --uui-button-background-color: transparent;
        --uui-button-background-color-hover: transparent;
      }
      #more-button::before {
        content: '';
        position: absolute;
        bottom: 0;
        width: 100%;
        background-color: var(--uui-color-current);
        height: 0px;
        border-radius: 3px 3px 0 0;
        opacity: 0;
        transition:
          opacity ease-in 120ms,
          height ease-in 120ms;
      }
      #more-button.active-inside::before {
        opacity: 1;
        height: 4px;
        transition:
          opacity 120ms,
          height ease-out 120ms;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-tab-group': UUITabGroupElement;
  }
}
