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
      position: relative;
      display: flex;
      align-items: stretch;
    }

    ::slotted(uui-input),
    ::slotted(uui-select) {
      flex: 1;
    }

    /* default: input has full rounding */
    ::slotted(uui-input),
    ::slotted(uui-select) {
      border-radius: var(--uui-input-border-radius, var(--uui-border-radius));
    }

    /* if addon is FIRST, next input loses LEFT radius */
    ::slotted(uui-input-group-addon:first-child) + ::slotted(uui-input),
    ::slotted(uui-input-group-addon:first-child) + ::slotted(uui-select) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    /* if addon is LAST, previous input loses RIGHT radius */
    ::slotted(uui-input:last-of-type),
    ::slotted(uui-select:last-of-type) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    /* addon styling */
    ::slotted(uui-button:first-child),
    ::slotted(uui-input-group-addon:first-child) {
      border-radius: var(--uui-input-border-radius, var(--uui-border-radius)) 0
        0 var(--uui-input-border-radius, var(--uui-border-radius));
    }

    ::slotted(uui-button:last-child),
    ::slotted(uui-input-group-addon:last-child) {
      border-radius: 0 var(--uui-input-border-radius, var(--uui-border-radius))
        var(--uui-input-border-radius, var(--uui-border-radius)) 0;
    }
  `;
}
