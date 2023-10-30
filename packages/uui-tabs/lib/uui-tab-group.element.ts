import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property, query, queryAssignedElements } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import type { UUIButtonElement } from '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-popover-container/lib';
import '@umbraco-ui/uui-symbol-more/lib';

import { UUITabElement } from './uui-tab.element';

/**
 *  @element uui-tab-group
 *  @slot - Default slot for the tab group
 */
@defineElement('uui-tab-group')
export class UUITabGroupElement extends LitElement {
  @query('#more-button')
  private _moreButtonElement!: UUIButtonElement;

  @queryAssignedElements({
    flatten: true,
    selector: 'uui-tab, [uui-tab], [role=tab]',
  })
  private _slottedNodes?: HTMLElement[];

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

  #tabElements: HTMLElement[] = [];

  #hiddenTabElements: UUITabElement[] = [];
  #hiddenTabElementsMap: Map<UUITabElement, UUITabElement> = new Map();

  #visibilityBreakpoints: number[] = [];
  #oldBreakpoint = 0;

  #resizeObserver: ResizeObserver = new ResizeObserver(
    this.#onResize.bind(this)
  );

  connectedCallback() {
    super.connectedCallback();
    this.#resizeObserver.observe(this);
    if (!this.hasAttribute('role')) this.setAttribute('role', 'tablist');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#resizeObserver.unobserve(this);
  }

  #onResize(entries: ResizeObserverEntry[]) {
    this.#updateCollapsibleTabs(entries[0].contentBoxSize[0].inlineSize);
  }

  #onSlotChange() {
    this.#tabElements.forEach(el => {
      el.removeEventListener('click', this.#onTabClicked);
    });

    this.#setTabArray();

    this.#tabElements.forEach(el => {
      el.addEventListener('click', this.#onTabClicked);
    });
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
        el => el.active && el !== linkedElement
      );

      hasActiveHidden
        ? this._moreButtonElement.classList.add('active-inside')
        : this._moreButtonElement.classList.remove('active-inside');
    }
  };

  #updateCollapsibleTabs(containerWidth: number) {
    const buttonWidth = this._moreButtonElement.offsetWidth;

    // Only update if the container is smaller than the last breakpoint
    if (
      this.#visibilityBreakpoints.slice(-1)[0] < containerWidth &&
      this.#hiddenTabElements.length === 0
    )
      return;

    // Only update if the new breakpoint is different from the old one
    let newBreakpoint = Number.MAX_VALUE;

    for (let i = this.#visibilityBreakpoints.length - 1; i > -1; i--) {
      const breakpoint = this.#visibilityBreakpoints[i];
      // Subtract the button width when we are not at the last breakpoint
      const containerWidthButtonWidth =
        containerWidth -
        (i !== this.#visibilityBreakpoints.length - 1 ? buttonWidth : 0);

      if (breakpoint < containerWidthButtonWidth) {
        newBreakpoint = i;
        break;
      }
    }

    if (newBreakpoint === this.#oldBreakpoint) return;
    this.#oldBreakpoint = newBreakpoint;

    // Do the update
    // Reset the hidden tabs
    this.#hiddenTabElements.forEach(el => {
      el.removeEventListener('click', this.#onTabClicked);
    });
    this.#hiddenTabElements = [];
    this.#hiddenTabElementsMap.clear();

    let hasActiveTabInDropdown = false;

    for (let i = 0; i < this.#visibilityBreakpoints.length; i++) {
      const breakpoint = this.#visibilityBreakpoints[i];
      const tab = this.#tabElements[i] as UUITabElement;

      // Subtract the button width when we are not at the last breakpoint
      const containerWidthButtonWidth =
        containerWidth -
        (i !== this.#visibilityBreakpoints.length - 1 ? buttonWidth : 0);

      if (breakpoint < containerWidthButtonWidth) {
        tab.style.display = '';
        this._moreButtonElement.style.display = 'none';
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

        tab.style.display = 'none';
        this._moreButtonElement.style.display = '';
        if (tab.active) {
          hasActiveTabInDropdown = true;
        }
      }
    }

    hasActiveTabInDropdown
      ? this._moreButtonElement.classList.add('active-inside')
      : this._moreButtonElement.classList.remove('active-inside');

    this.requestUpdate();
  }

  #calculateBreakPoints() {
    // Whenever a tab is added or removed, we need to recalculate the breakpoints
    let childrenWidth = 0;

    for (let i = 0; i < this.#tabElements.length; i++) {
      childrenWidth += this.#tabElements[i].offsetWidth;
      this.#visibilityBreakpoints[i] = childrenWidth;
    }

    this.#updateCollapsibleTabs(this.offsetWidth);
  }

  #setTabArray() {
    this.#tabElements = this._slottedNodes ? this._slottedNodes : [];
    this.#calculateBreakPoints();
  }

  #isElementTabLike(el: any): el is UUITabElement {
    return el instanceof UUITabElement || 'active' in el;
  }

  render() {
    return html`
      <slot @slotchange=${this.#onSlotChange}></slot>
      <uui-button
        popovertarget="popover-container"
        style="display: none"
        id="more-button"
        label="More"
        compact>
        <uui-symbol-more></uui-symbol-more>
      </uui-button>
      <uui-popover-container
        id="popover-container"
        popover
        margin="10"
        placement="bottom-end">
        <div id="hidden-tabs-container">
          ${repeat(this.#hiddenTabElements, el => html`${el}`)}
        </div>
      </uui-popover-container>
    `;
  }

  static styles = [
    css`
      :host {
        display: flex;
        flex-wrap: wrap;
        color: var(--uui-tab-text);
        background: var(--uui-tab-background, none);
        height: 100%;
        min-height: 48px;
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
        background: var(--uui-color-surface);
        border-radius: var(--uui-border-radius);
        box-shadow: var(--uui-shadow-depth-3);
        overflow: hidden;
      }
      :host([dropdown-direction='horizontal']) #hidden-tabs-container {
        flex-direction: row;
      }

      #more-button {
        margin-left: auto;
        position: relative;
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
        transition: opacity ease-in 120ms, height ease-in 120ms;
      }
      #more-button.active-inside::before {
        opacity: 1;
        height: 4px;
        transition: opacity 120ms, height ease-out 120ms;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-tab-group': UUITabGroupElement;
  }
}
