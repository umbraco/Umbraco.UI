import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

/**
 * A breadcrumb-item to be used with the breadcrumbs component.
 *  @element uui-breadcrumb-item
 *  @slot - to show display an element inside the breadcrumb
 *  @csspart separator - change the content of the after element of this part to change the separator
 */
@defineElement('uui-breadcrumb-item')
export class UUIBreadcrumbItemElement extends LitElement {
  static styles = [
    css`
      :host {
        font-size: var(--uui-size-4);
        color: currentColor;
      }

      a,
      a:visited {
        color: currentColor;
      }
      a:hover {
        color: var(--uui-interface-contrast-hover);
      }
      a:focus {
        color: var(--uui-interface-contrast-focus);
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

  // TODO: ability for adding aria-label?

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

  renderLinkAndSeparator() {
    return html`<a id="link" href=${this.href}><slot></slot></a
      ><span part="separator"></span>`;
  }

  renderCurrent() {
    return html`<span id="last-item"><slot></slot></span>`;
  }

  render() {
    return html`${this.lastItem
      ? this.renderCurrent()
      : this.renderLinkAndSeparator()}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-breadcrumb-item': UUIBreadcrumbItemElement;
  }
}
