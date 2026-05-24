import { css, html, LitElement } from 'lit';

/**
 * @element uui-input-group
 */
export class UUIInputGroupElement extends LitElement {
  render() {
    return html`
      <slot name="prepend"></slot>
      <slot></slot>
      <slot name="append"></slot>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      align-items: stretch;
    }

    ::slotted(uui-input),
    ::slotted(uui-select) {
      flex: 1;
    }

    ::slotted(uui-input-group-addon:first-child) {
      border-radius: var(--uui-input-border-radius, var(--uui-border-radius)) 0
        0 var(--uui-input-border-radius, var(--uui-border-radius));
    }

    ::slotted(uui-input) {
      border-radius: 0;
    }

    ::slotted(uui-input-group-addon:last-child) {
      border-radius: 0 var(--uui-input-border-radius, var(--uui-border-radius))
        var(--uui-input-border-radius, var(--uui-border-radius)) 0;
    }
  `;
}
