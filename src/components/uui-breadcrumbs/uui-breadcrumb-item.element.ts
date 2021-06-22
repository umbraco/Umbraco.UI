import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators';

export class UUIBreadcrumbItem extends LitElement {
  static styles = [
    css`
      :host {
        font-size: var(--uui-size-small, 12px);
        color: #515054;
      }

      a,
      a:visited {
        color: #515054;
      }

      :host(:last-of-type) [part='separator'],
      :host([last-step]) [part='separator'] {
        display: none;
      }

      [part='separator']::after {
        content: '/';
        speak: none;
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
    // this.setAttribute('aria-label', 'breadcrumb');
    this.setAttribute('role', 'listitem');
  }

  @property()
  href = '#';

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
