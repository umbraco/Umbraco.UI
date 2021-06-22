import { css, html, LitElement } from 'lit';
import { queryAssignedNodes } from 'lit/decorators';
import { UUIBreadcrumbItemElement } from './uui-breadcrumb-item.element';

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

  @queryAssignedNodes()
  _breadcrumbs?: UUIBreadcrumbItemElement[];

  protected setLastItem() {
    console.log('are you working', this._breadcrumbs);
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
      <slot @slotchange=${this.setLastItem}></slot>
    </ol>`;
  }
}
