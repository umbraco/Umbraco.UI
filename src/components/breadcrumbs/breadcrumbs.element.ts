import { css, html, LitElement } from 'lit';
import { queryAssignedElements } from 'lit/decorators.js';

import { UUIBreadcrumbItemElement } from './breadcrumb-item.element.js';
import '../responsive-container/responsive-container.js';
import { demandCustomElement } from '../../internal/utils/index.js';

/**
 * A breadcrumbs component to be used in combination with the uui-breadcrumb-item.
 *  @element uui-breadcrumbs
 *  @slot - Slot to display nested breadcrumb items. It supports `<uui-breadcrumb-item>` elements or elements containing the `role="listitem"` attribute
 */
export class UUIBreadcrumbsElement extends LitElement {
  @queryAssignedElements({
    flatten: true,
    selector: 'uui-breadcrumb-item, [uui-breadcrumb-item], [role=listitem]',
  })
  private slotNodes!: HTMLElement[];

  private elementIsBreadcrumbItem(el: unknown): el is UUIBreadcrumbItemElement {
    return el instanceof UUIBreadcrumbItemElement;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('aria-label', 'breadcrumb');
    this.setAttribute('role', 'navigation');

    demandCustomElement(this, 'uui-responsive-container');
  }

  handleSlotChange() {
    if (this.slotNodes.length > 0) {
      const lastItem = this.slotNodes[this.slotNodes.length - 1];
      lastItem.setAttribute('aria-current', 'page');

      if (this.elementIsBreadcrumbItem(lastItem)) {
        lastItem.lastItem = true;
      }
    }
  }

  render() {
    return html`<uui-responsive-container
      id="breadcrumbs-list"
      collapse="start">
      <span slot="trigger-content">
        <span class="ellipsis">…</span> <span class="separator">/</span>
      </span>
      <slot @slotchange=${this.handleSlotChange}></slot>
    </uui-responsive-container>`;
  }

  static override readonly styles = [
    css`
      :host {
        display: flex;
      }

      #breadcrumbs-list {
        display: flex;
        list-style-type: decimal;
        margin-block-start: 0em;
        margin-block-end: 0em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 0px;
      }
      uui-responsive-container {
        --uui-responsive-container-gap: 0;
      }

      /* Style the trigger content to match breadcrumb items */
      [slot='trigger-content'] {
        font-size: var(--uui-type-small-size);
      }

      [slot='trigger-content'] .ellipsis {
        color: currentColor; /* Black/default text color */
      }

      [slot='trigger-content'] .separator {
        color: var(--uui-color-border); /* Matches breadcrumb separator */
        margin-left: var(--uui-size-2);
      }
    `,
  ];
}
