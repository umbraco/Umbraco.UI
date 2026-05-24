import { css, html, LitElement } from 'lit';

/**
 * @element uui-input-group-addon
 */
export class UUIInputGroupAddonElement extends LitElement {
  render() {
    return html`<slot></slot>`;
  }

  static styles = [
    css`
      :host {
        padding-inline: var(--uui-size-space-4);
        background: var(--uui-color-surface-alt);
        border-left: 1px solid var(--uui-color-border);
        color: var(--uui-color-text);
        font-size: var(--uui-type-small-size);
        display: flex;
        align-items: center;
      }
    `,
  ];
}
