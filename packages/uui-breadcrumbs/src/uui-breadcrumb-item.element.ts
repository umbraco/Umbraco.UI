import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

/**
 * A breadcrumb-item to be used with the breadcrumbs component.
 *  @element uui-breadcrumb-item
 *  @slot - to show display an element inside the breadcrumb
 *  @csspart separator - change the content of the after element of this part to change the separator
 */
export class UUIBreadcrumbItemElement extends LitElement {
  static styles = [
    css`
      :host {
        font-size: var(--uui-size-small, 12px);
        color: currentColor;
      }

      a,
      a:visited {
        color: currentColor;
      }

      :host(:last-of-type) [part='separator'],
      :host([last-item]) [part='separator'] {
        display: none;
      }

      [part='separator']::after {
        content: '/';
        speak: never;
        position: relative;
        top: 1px;
        margin: -3px 1px 0;
        color: var(--uui-interface-border, #c4c4c4);
      }

      #link,
      #last-item {
        padding: 0 4px;
        max-width: 150px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      #link {
        cursor: pointer;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'listitem');
  }

  /**
   * Specifies the link href.
   * @type {String}
   * @default '#'
   */
  @property()
  href = '#';

  /**
   * Specifies if the element is the last item in the uui-breadcrumbs. Last item will not render as a link
   * @type {Boolean}
   * @attr last-item
   * @default 'false'
   */
  @property({ type: Boolean, attribute: 'last-item' })
  lastItem = false;

  render() {
    return html`${this.lastItem
        ? html`<span id="last-item"><slot></slot></span>`
        : html`<a id="link" href=${this.href}><slot></slot></a>`}<span
        part="separator"></span>`;
  }
}
