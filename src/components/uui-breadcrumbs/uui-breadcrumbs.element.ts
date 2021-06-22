import { css, html, LitElement } from 'lit';

export class UUIBreadcrumbs extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}

// after element with content / and the last of type slotted selector with no content
