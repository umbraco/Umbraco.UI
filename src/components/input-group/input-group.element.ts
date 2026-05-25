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
      z-index: 1;
      border-radius: var(--uui-input-border-radius, var(--uui-border-radius));
    }

    ::slotted(uui-input:not(:first-child)),
    ::slotted(uui-select:not(:first-child)) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

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
      border-radius: 0;
    }

    /* FIRST addon → only LEFT radius */
    ::slotted(uui-input-group-addon:first-child),
    ::slotted(uui-button:first-child) {
      border-top-left-radius: var(
        --uui-input-border-radius,
        var(--uui-border-radius)
      );
      border-bottom-left-radius: var(
        --uui-input-border-radius,
        var(--uui-border-radius)
      );
    }

    /* LAST addon → only RIGHT radius */
    ::slotted(uui-input-group-addon:last-child),
    ::slotted(uui-button:last-child) {
      border-top-right-radius: var(
        --uui-input-border-radius,
        var(--uui-border-radius)
      );
      border-bottom-right-radius: var(
        --uui-input-border-radius,
        var(--uui-border-radius)
      );
    }

    /* not first addon → remove LEFT border */
    ::slotted(uui-input-group-addon:not(:first-child)),
    ::slotted(uui-button:not(:first-child)) {
      border-left: none;
    }

    /* not last addon → remove RIGHT border (only if another addon follows) */
    ::slotted(uui-input-group-addon:not(:last-child)),
    ::slotted(uui-button:not(:last-child)) {
      border-right: none;
    }
  `;
}
