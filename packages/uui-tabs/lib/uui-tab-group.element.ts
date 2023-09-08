import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import {
  property,
  query,
  queryAssignedElements,
  state,
} from 'lit/decorators.js';

import type { UUIButtonElement } from '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-button/lib/uui-button.element';

import { UUITabElement } from './uui-tab.element';

/**
 *  @element uui-tab-group
 *  @slot - Default slot for the tab group
 */
@defineElement('uui-tab-group')
export class UUITabGroupElement extends LitElement {
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
    `,
  ];

  @query('#more-button')
  moreButtonElement!: UUIButtonElement;

  @queryAssignedElements({
    flatten: true,
    selector: 'uui-tab, [uui-tab], [role=tab]',
  })
  private _slottedNodes?: HTMLElement[];

  @property({ type: Boolean, reflect: true, attribute: 'priority-navigation' })
  priorityNavigation = false;

  @state()
  _hasHiddenTabs = false;

  private _tabElements: HTMLElement[] = [];

  #visibleTabElements: HTMLElement[] = [];
  #hiddenTabElements: HTMLElement[] = [];
  #visibilityBreakpoints: number[] = [];

  #resizeObserver: ResizeObserver = new ResizeObserver(
    this.#onResize.bind(this)
  );

  #onResize(entries: ResizeObserverEntry[]) {
    const containerWidth =
      entries[0].contentBoxSize[0].inlineSize -
      this.moreButtonElement.offsetWidth;

    this.#visibleTabElements = [];
    this.#hiddenTabElements = [];
    this._hasHiddenTabs = false;

    for (let i = 0; i < this.#visibilityBreakpoints.length; i++) {
      const breakpoint = this.#visibilityBreakpoints[i];

      if (breakpoint < containerWidth) {
        this.#visibleTabElements.push(this._tabElements[i]);
        this._tabElements[i].style.display = 'block';
      } else {
        this.#hiddenTabElements.push(this._tabElements[i]);
        this._tabElements[i].style.display = 'none';
        this._hasHiddenTabs = true;
      }
    }
  }

  #calculateBreakPoints() {
    // Whenever a tab is added or removed, we need to recalculate the breakpoints

    let childrenWidth = 0;

    for (let i = 0; i < this._tabElements.length; i++) {
      childrenWidth += this._tabElements[i].offsetWidth;
      this.#visibilityBreakpoints[i] = childrenWidth;
    }
  }

  private _setTabArray() {
    this._tabElements = this._slottedNodes ? this._slottedNodes : [];
    this.#calculateBreakPoints();
  }

  private _onSlotChange() {
    this._tabElements.forEach(el => {
      el.removeEventListener('click', this._onTabClicked);
    });

    this._setTabArray();

    this._tabElements.forEach(el => {
      el.addEventListener('click', this._onTabClicked);
    });
  }

  private _onTabClicked = (e: MouseEvent) => {
    const selectedElement = e.currentTarget as HTMLElement;
    if (this._elementIsTabLike(selectedElement)) {
      selectedElement.active = true;

      const filtered = this._tabElements.filter(el => el !== selectedElement);

      filtered.forEach(el => {
        if (this._elementIsTabLike(el)) {
          el.active = false;
        }
      });
    }
  };

  private _elementIsTabLike(el: any): el is UUITabElement {
    return el instanceof UUITabElement || 'active' in el;
  }

  connectedCallback() {
    super.connectedCallback();
    this.#resizeObserver.observe(this);
    if (!this.hasAttribute('role')) this.setAttribute('role', 'tablist');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#resizeObserver.unobserve(this);
  }

  render() {
    return html`
      <slot @slotchange=${this._onSlotChange}></slot>
      <uui-button id="more-button">More</uui-button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-tab-group': UUITabGroupElement;
  }
}
