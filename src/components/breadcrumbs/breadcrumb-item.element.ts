import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

/**
 * A breadcrumb-item to be used with the breadcrumbs component.
 *  @element uui-breadcrumb-item
 *  @slot - This slot displays elements inside the breadcrumb
 *  @csspart separator - change the content of the after element of this part to change the separator
 */
export class UUIBreadcrumbItemElement extends LitElement {
  connectedCallback() {
    super.connectedCallback();
  }

  // TODO: ability for adding aria-label?

  /**
   * Specifies the link href.
   * @type {String}
   * @default undefined
   */
  @property()
  href?: string;

  /**
   * Specifies if the element is the last item in the uui-breadcrumbs. Last item will not render as a link
   * @type {Boolean}
   * @attr last-item
   * @default 'false'
   */
  @property({ type: Boolean, attribute: 'last-item' })
  lastItem = false;

  renderLinkAndSeparator() {
    const item = this.href
      ? html`<a id="link" href=${this.href}><slot></slot></a>`
      : html`<span id="link"><slot></slot></span>`;

    return html`${item}<span part="separator"></span>`;
  }

  renderCurrent() {
    return html`<span id="last-item"><slot></slot></span>`;
  }

  render() {
    return html`${this.lastItem
      ? this.renderCurrent()
      : this.renderLinkAndSeparator()}`;
  }

  static styles = [
    css`
      :host {
        font-size: var(--uui-type-small-size);
        color: currentColor;
      }

      a,
      a:visited {
        color: currentColor;
      }
      a:hover {
        color: var(--uui-color-interactive-emphasis);
      }
      a:focus {
        color: var(--uui-color-focus);
      }

      a:focus-visible {
        border-radius: var(--uui-border-radius);
        outline: 2px solid var(--uui-color-focus);
      }

      [part='separator']::after {
        content: '/';
        speak: never;
        position: relative;
        top: 1px;
        margin: -3px 1px 0;
        color: var(--uui-color-border);
      }

      #link,
      #last-item {
        padding: 0 4px;
        max-width: 150px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `,
  ];
}
