import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators';

/**
 *  @element uui-breadcrumb-item
 *  @slot - to show display an element inside the breadcrumb
 *  @description - A breadcrumb-item to be used with the breadcrumbs component.
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
      :host([last-step]) [part='separator'] {
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
   * @default ['#']
   */
  @property()
  href = '#';

  /**
   * Specifies if the element is the last item. Last item will not render as a link
   * @type {Boolean}
   * @default ['false']
   */
  @property({ type: Boolean })
  lastItem = false;

  render() {
    return html`${this.lastItem
        ? html`<span id="last-item"><slot></slot></span>`
        : html`<a id="link" .href=${this.href}><slot></slot></a>`}<span
        part="separator"
      ></span>`;
  }
}

// after element with content / and the last of type slotted selector with no content
