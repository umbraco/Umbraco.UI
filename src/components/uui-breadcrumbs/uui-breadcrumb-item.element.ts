import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators';

export class UUIBreadcrumbItem extends LitElement {
  static styles = [
    css`
      :host {
        font-size: var(--uui-size-small, 12px);
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

      #link {
        cursor: pointer;
        padding: 0 4px;
        max-width: 150px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `,
  ];

  @property()
  href = '#';

  render() {
    return html`<a id="link" .href=${this.href}><slot></slot></a
      ><span part="separator"></span>`;
  }
}

// after element with content / and the last of type slotted selector with no content
