import { css, html, LitElement } from 'lit';

/**
 * @element uui-input-group-addon
 * @cssprop --uui-input-group-addon-border-radius - Border radius
 * @cssprop --uui-input-group-addon-height - Height of the addon
 */
export class UUIInputGroupAddonElement extends LitElement {
  render() {
    return html`<slot></slot>`;
  }

  static styles = [
    css`
      :host {
        position: relative;
        padding-inline: var(--uui-size-space-3);
        background: var(--uui-color-surface-alt);
        border: 1px solid var(--uui-color-border);
        border-radius: var(
          --uui-input-group-addon-border-radius,
          var(--uui-border-radius)
        );
        color: var(--uui-color-text);
        font-size: var(--uui-type-small-size);
        display: inline-flex;
        align-items: center;
        min-height: var(--uui-input-group-addon-height, var(--uui-size-11));
        max-height: 100%;
        height: 100%;
      }
    `,
  ];
}
