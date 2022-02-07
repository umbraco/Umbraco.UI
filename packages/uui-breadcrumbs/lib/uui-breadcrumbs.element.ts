import { css, html, LitElement } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { UUIBreadcrumbItemElement } from './uui-breadcrumb-item.element';

/**
 * A breadcrumbs component to be used in combination with the uui-breadcrumb-item.
 *  @element uui-breadcrumbs
 *  @slot to display nested breadcrumb items
 */
@defineElement('uui-breadcrumbs')
export class UUIBreadcrumbsElement extends LitElement {
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

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('aria-label', 'breadcrumb');
    this.setAttribute('role', 'navigation');
  }

  handleSlotChange() {
    const breadcrumbNodes = this.querySelectorAll('uui-breadcrumb-item');
    const breadcrumbs = Array.from(
      breadcrumbNodes
    ) as UUIBreadcrumbItemElement[];

    if (breadcrumbs?.length > 0) {
      breadcrumbs[breadcrumbs.length - 1].lastItem = true;
      breadcrumbs[breadcrumbs.length - 1].setAttribute('aria-current', 'page');
    }
  }

  render() {
    return html`<ol id="breadcrumbs-list">
      <slot @slotchange=${this.handleSlotChange}></slot>
    </ol>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-breadcrumbs': UUIBreadcrumbsElement;
  }
}
