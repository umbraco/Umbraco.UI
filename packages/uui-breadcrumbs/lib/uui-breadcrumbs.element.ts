import { css, html, LitElement } from 'lit';
import { queryAssignedNodes } from 'lit/decorators.js';
import { UUIBreadcrumbItemElement } from './uui-breadcrumb-item.element';

/**
 * A breadcrumbs component to be used in combination with the uui-breadcrumb-item.
 *  @element uui-breadcrumbs
 *  @slot to display nested breadcrumb items
 */
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

  @queryAssignedNodes(undefined, true, 'uui-breadcrumb-item')
  _breadcrumbs?: UUIBreadcrumbItemElement[];

  private _setLastItem() {
    if (this._breadcrumbs) {
      this._breadcrumbs[this._breadcrumbs.length - 1].lastItem = true;
      this._breadcrumbs[this._breadcrumbs.length - 1].setAttribute(
        'aria-current',
        'page'
      );
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('aria-label', 'breadcrumb');
    this.setAttribute('role', 'navigation');
  }

  render() {
    return html`<ol id="breadcrumbs-list">
      <slot @slotchange=${this._setLastItem}></slot>
    </ol>`;
  }
}
