import { css, html, LitElement } from 'lit';

/**
 * @element uui-input-group
 */
export class UUIInputGroupElement extends LitElement {
  render() {
    return html`<slot></slot>`;
  }

  static styles = css`
    :host {
      position: relative;
      display: flex;
      align-items: stretch;
    }

    /* =========================
     INPUT / SELECT
     ========================= */

    ::slotted(uui-input),
    ::slotted(uui-select) {
      flex: 1;
      border-radius: var(--uui-input-border-radius, var(--uui-border-radius));
    }

    /* remove left radius if not first */
    ::slotted(uui-input:not(:first-child)),
    ::slotted(uui-select:not(:first-child)) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    /* remove right radius if not last */
    ::slotted(uui-input:not(:last-child)),
    ::slotted(uui-select:not(:last-child)) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    /* =========================
     ADDONS
     ========================= */

    ::slotted(uui-input-group-addon),
    ::slotted(uui-button) {
      border-radius: var(--uui-input-border-radius, var(--uui-border-radius));
    }

    /* not first addon → remove LEFT border + radius */
    ::slotted(uui-input-group-addon:not(:first-child)),
    ::slotted(uui-button:not(:first-child)) {
      border-left: none;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    /* not last addon → remove RIGHT border + radius */
    ::slotted(uui-input-group-addon:not(:last-child)),
    ::slotted(uui-button:not(:last-child)) {
      border-right: none;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    /* middle addons fully square */
    ::slotted(uui-input-group-addon:not(:first-child):not(:last-child)),
    ::slotted(uui-button:not(:first-child):not(:last-child)) {
      border-radius: 0;
    }

    /* layout */
    ::slotted(uui-input),
    ::slotted(uui-select) {
      flex: 1;
    }
  `;
}
