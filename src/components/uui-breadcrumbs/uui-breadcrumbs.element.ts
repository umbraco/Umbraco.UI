import { css, html, LitElement } from 'lit';
import { queryAssignedNodes } from 'lit/decorators';
import { UUIBreadcrumbItem } from './uui-breadcrumb-item.element';

export class UUIBreadcrumbs extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
      }
    `,
  ];

  @queryAssignedNodes()
  _breadcrumbs?: UUIBreadcrumbItem[];

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
    return html`<ol>
      <slot @slotchange=${this.setLastItem}></slot>
    </ol>`;
  }
}

// after element with content / and the last of type slotted selector with no content
