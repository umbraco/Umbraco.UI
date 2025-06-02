import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { demandCustomElement } from '@umbraco-ui/uui-base/lib/utils';
import type { UUIButtonElement } from '@umbraco-ui/uui-button/lib';
import type { UUIPopoverContainerElement } from '@umbraco-ui/uui-popover-container/lib';
import { css, html, LitElement } from 'lit';
import { property, query, queryAssignedElements } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import type { UUITabElement } from './uui-tab.element';

/**
 * @element uui-tab-group
 * @slot - Default slot for the tab group
 * @cssprop --uui-tab-group-dropdown-tab-text - Define the tab text color in the dropdown
 * @cssprop --uui-tab-group-dropdown-tab-text-hover - Define the tab text hover color in the dropdown
 * @cssprop --uui-tab-group-dropdown-tab-text-active - Define the tab text active color in the dropdown
 * @cssprop --uui-tab-group-dropdown-background - Define the background color of the dropdown
 * @cssprop --uui-tab-group-gap - Define the gap between elements dropdown. Only pixel values are valid
 */
@defineElement('uui-tab-group')
export class UUITabGroupElement extends LitElement {
  @query('#more-button')
  private _moreButtonElement!: UUIButtonElement;

  @query('#popover-container')
  private _popoverContainerElement!: UUIPopoverContainerElement;

  @query('#main') private _mainElement!: HTMLElement;
  @query('#grid') private _gridElement!: HTMLElement;

  @queryAssignedElements({
    flatten: true,
    selector: 'uui-tab, [uui-tab], [role=tab]',
  })
  private _slottedNodes?: UUITabElement[];

  /** Stores the current gap used in the breakpoints */
  #currentGap = 0;

  /**
   * Set the flex direction of the content of the dropdown.
   * @type {string}
   * @attr
   * @default vertical
   */
  @property({
    type: String,
    reflect: true,
    attribute: 'dropdown-content-direction',
  })
  dropdownContentDirection: 'vertical' | 'horizontal' = 'vertical';

  #tabElements: UUITabElement[] = [];

  #hiddenTabElements: UUITabElement[] = [];
  #hiddenTabElementsMap: Map<UUITabElement, UUITabElement> = new Map();

  #visibilityBreakpoints: number[] = [];

  #resizeObserver = new ResizeObserver(this.#onResize.bind(this));
  #tabResizeObservers: ResizeObserver[] = [];

  #breakPointCalculationInProgress = false;

  connectedCallback() {
    super.connectedCallback();
    this.#initialize();
    this.addEventListener('keydown', this.#onKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#resizeObserver.unobserve(this._mainElement);
    this.#cleanupTabs();
    this.removeEventListener('keydown', this.#onKeyDown);
  }

  #setFocusable(tab: UUITabElement | null, focus: boolean = true) {
    if (tab) {
      // Reset tabindex for all tabs
      this.#tabElements.forEach(t => {
        if (t === tab) {
          t.setFocusable(focus);
        } else {
          t.removeFocusable();
        }
      });
    }
  }

  #onKeyDown = (event: KeyboardEvent) => {
    const tabs = this.#tabElements;
    if (!tabs.length) return;

    const currentIndex = tabs.findIndex(tab => tab.hasFocus() === true);

    let newIndex = -1;
    let trigger = false;

    switch (event.key) {
      case 'ArrowRight':
        newIndex = (currentIndex + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = tabs.length - 1;
        break;
      case ' ': // Space
      case 'Enter':
        newIndex = currentIndex;
        trigger = true;
        break;

      default:
        return;
    }

    event.preventDefault();
    if (newIndex !== -1) {
      const newTab = tabs[newIndex];
      newTab.style.display = 'block';
      this.#setFocusable(newTab, true);
      this.#calculateBreakPoints();

      if (trigger) {
        newTab.trigger();
      }
    }
  };

  async #initialize() {
    demandCustomElement(this, 'uui-button');
    demandCustomElement(this, 'uui-popover-container');
    demandCustomElement(this, 'uui-symbol-more');

    await this.updateComplete;
    this.#resizeObserver.observe(this._mainElement);
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

  #cleanupTabs() {
    this.#tabElements.forEach(el => {
      el.removeEventListener('click', this.#onTabClicked);
      this.#tabResizeObservers.forEach(observer => observer.disconnect());
    });
    this.#tabResizeObservers.length = 0;
    this.#visibilityBreakpoints.length = 0;
  }

  async #onSlotChange() {
    this.#setTabArray();

    this.#tabElements.forEach(el => {
      el.addEventListener('click', this.#onTabClicked);
      const observer = new ResizeObserver(
        this.#calculateBreakPoints.bind(this),
      );
      observer.observe(el);
      this.#tabResizeObservers.push(observer);
    });

    await this.#setInitialFocusable();
  }

  #onTabClicked = (e: MouseEvent) => {
    const selectedElement = e.currentTarget as HTMLElement;
    if (this.#isElementTabLike(selectedElement)) {
      selectedElement.active = true;
      const linkedElement = this.#hiddenTabElementsMap.get(selectedElement);

      if (linkedElement) {
        linkedElement.active = true;
      }

      // Reset all other tabs
      const filtered = [
        ...this.#tabElements,
        ...this.#hiddenTabElements,
      ].filter(el => el !== selectedElement && el !== linkedElement);

      filtered.forEach(el => {
        if (this.#isElementTabLike(el)) {
          el.active = false;
        }
      });

      // Check if there are any active tabs in the dropdown
      const hasActiveHidden = this.#hiddenTabElements.some(
        el => el.active && el !== linkedElement,
      );

      if (hasActiveHidden) {
        this._moreButtonElement.classList.add('active-inside');
      } else {
        this._moreButtonElement.classList.remove('active-inside');
      }
    }
  };

  async #calculateBreakPoints() {
    if (this.#breakPointCalculationInProgress) return;

    // Prevent multiple calculations from happening in the same frame
    this.#breakPointCalculationInProgress = true;
    requestAnimationFrame(() => {
      this.#breakPointCalculationInProgress = false;
    });

    // Whenever a tab is added or removed, we need to recalculate the breakpoints
    await this.updateComplete; // Wait for the tabs to be rendered

    const gapCSSVar = Number.parseFloat(
      this.style.getPropertyValue('--uui-tab-group-gap'),
    );
    const gap = Number.isNaN(gapCSSVar) ? 0 : gapCSSVar;
    this.#currentGap = gap;
    let childrenWidth = 0;

    for (let i = 0; i < this.#tabElements.length; i++) {
      this.#tabElements[i].style.display = '';
      childrenWidth += this.#tabElements[i].offsetWidth;
      this.#visibilityBreakpoints[i] = childrenWidth;
      // Add the gap, which will then be included in the next breakpoint:
      childrenWidth += gap;
    }

    const tolerance = 2;
    this._mainElement.style.width = childrenWidth - gap + tolerance + 'px';

    this.#updateCollapsibleTabs(this._mainElement.offsetWidth);
  }

  #setTabArray() {
    this.#tabElements = this._slottedNodes ? this._slottedNodes : [];
    this.#calculateBreakPoints();
  }

  #updateCollapsibleTabs(containerWidth: number) {
    this._gridElement.scrollLeft = 0;

    // Reset translations for all tabs
    this.#tabElements.forEach(tab => {
      tab.style.transform = '';
    });

    const moreButtonWidth = this._moreButtonElement.offsetWidth;

    const containerWithoutButtonWidth =
      containerWidth - (moreButtonWidth ? moreButtonWidth : 0);

    // Do the update
    // Reset the hidden tabs
    this.#hiddenTabElements.forEach(el => {
      el.removeEventListener('click', this.#onTabClicked);
    });
    this.#hiddenTabElements = [];
    this.#hiddenTabElementsMap.clear();

    let hasActiveTabInDropdown = false;

    const len = this.#visibilityBreakpoints.length;
    for (let i = 0; i < len; i++) {
      const breakpoint = this.#visibilityBreakpoints[i];
      const tab = this.#tabElements[i] as UUITabElement;

      // If breakpoint is smaller than the container width, then show the tab.
      // If last breakpoint, then we will use the containerWidth, as we do not want to include the more-button in that calculation.
      if (
        breakpoint <=
        (i === len - 1 ? containerWidth : containerWithoutButtonWidth)
      ) {
        // Show this tab:
        tab.style.display = '';
      } else {
        // Make a proxy tab to put in the hidden tabs container and link it to the original tab
        const proxyTab = tab.cloneNode(true) as UUITabElement;
        proxyTab.addEventListener('click', this.#onTabClicked);
        proxyTab.classList.add('hidden-tab');
        proxyTab.style.display = '';
        proxyTab.orientation = this.dropdownContentDirection;

        // Link the proxy tab to the original tab
        this.#hiddenTabElementsMap.set(proxyTab, tab);
        this.#hiddenTabElementsMap.set(tab, proxyTab);

        this.#hiddenTabElements.push(proxyTab);

        if (tab.active) {
          hasActiveTabInDropdown = true;
        }
      }
    }

    const hiddenTabHasFocus = this.#tabElements.some(tab => {
      return this.#hiddenTabElementsMap.get(tab) && tab.hasFocus();
    });

    this.#tabElements.forEach(tab => {
      if (this.#hiddenTabElementsMap.get(tab)) {
        tab.style.transform = hiddenTabHasFocus ? '' : 'translateX(2000%)';
      }
    });

    // If a hidden tab has focus, make sure it is in view
    if (hiddenTabHasFocus) {
      const focusedTab = this.#tabElements.find(
        tab => this.#hiddenTabElementsMap.get(tab) && tab.hasFocus(),
      );
      if (focusedTab) {
        const containerRect = this._gridElement.getBoundingClientRect();
        const focusedTabRect = focusedTab.getBoundingClientRect();
        const focusedTabWidth = focusedTabRect.width;
        const gridWidth = containerRect.width;

        const desiredScrollLeft =
          focusedTabRect.left - (gridWidth - focusedTabWidth);

        this._gridElement.scrollLeft = Math.max(
          this._gridElement.scrollLeft,
          desiredScrollLeft,
        );
      }
    }

    if (this.#hiddenTabElements.length === 0) {
      // Hide more button:
      this._moreButtonElement.style.display = 'none';
      // close the popover
      this._popoverContainerElement.hidePopover();
    } else {
      // Show more button:
      this._moreButtonElement.style.display = '';
    }

    if (hasActiveTabInDropdown) {
      this._moreButtonElement.classList.add('active-inside');
    } else {
      this._moreButtonElement.classList.remove('active-inside');
    }

    this.requestUpdate();
  }

  #isElementTabLike(el: any): el is UUITabElement {
    return (
      typeof el === 'object' && 'active' in el && typeof el.active === 'boolean'
    );
  }

  async #setInitialFocusable(): Promise<void> {
    // Set initial focus on the active, none hidden tab or the first tab
    let initialTab: UUITabElement | undefined;

    const activeTab = this.#tabElements.find(tab => tab.active);

    if (activeTab && !this.#hiddenTabElementsMap.has(activeTab)) {
      initialTab = activeTab;
    } else if (this.#tabElements.length > 0) {
      initialTab = this.#tabElements[0];
    }

    if (initialTab) {
      await initialTab.updateComplete;
      this.#setFocusable(initialTab);
    }
  }

  render() {
    return html`
      <div id="main">
        <div id="grid" role="tablist">
          <slot @slotchange=${this.#onSlotChange}></slot>
        </div>
        <uui-button
          popovertarget="popover-container"
          style="display: none"
          id="more-button"
          label="More"
          tabindex="-1"
          compact>
          <uui-symbol-more></uui-symbol-more>
        </uui-button>
      </div>
      <uui-popover-container
        id="popover-container"
        popover
        placement="bottom-end">
        <div id="hidden-tabs-container" tabindex="-1">
          ${repeat(this.#hiddenTabElements, el => html`${el}`)}
        </div>
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
        outline: none;
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

      .hidden-tab {
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
