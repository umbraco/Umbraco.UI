import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { queryAssignedElements } from 'lit/decorators.js';

import { UUIBreadcrumbItemElement } from './uui-breadcrumb-item.element';

/**
 * A breadcrumbs component to be used in combination with the uui-breadcrumb-item.
 *  @element uui-breadcrumbs
 *  @slot - Slot to display nested breadcrumb items. It supports `<uui-breadcrumb-item>` elements or elements containing the `role="listitem"` attribute
 */
@defineElement('uui-breadcrumbs')
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
    return html`<ol id="breadcrumbs-list">
      <slot @slotchange=${this.handleSlotChange}></slot>
    </ol>`;
  }

  static styles = [
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
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-breadcrumbs': UUIBreadcrumbsElement;
  }
}
