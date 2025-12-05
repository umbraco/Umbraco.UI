import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { html, LitElement } from 'lit';

/**
 * @element uui-popover-container
 */
@defineElement('uui-popover-container-shadowdomtester')
export class UUIPopoverContainerShadowDomTesterElement extends LitElement {
  render() {
    return html`<div
        style="height: 500px; overflow: auto; outline: 1px solid black">
        <div
          style="position:relative; width: 300px; height: 300px; outline: 1px solid black; overflow: auto;">
          <div style="height: 150px"></div>
          <uui-button
            id="popover-button"
            style="position: absolute; top: 50px; left: 50px;"
            popovertarget="popover-container"
            look="primary"
            label="Open popover">
            Open popover
          </uui-button>
          <div style="height: 150px"></div>
          <div style="height: 150px"></div>
        </div>
        <div style="height: 400px"></div>
      </div>
      <uui-popover-container id="popover-container" popover>
        <div
          style="width: 100%; background-color: var(--uui-color-surface); max-width: 200px; box-shadow: var(--uui-shadow-depth-4); padding: var(--uui-size-space-4); border-radius: var(--uui-border-radius-3); font-size: 0.9rem;">
          <h3>Scroll!</h3>
          Scrolling in any of the 2 boxes that are in a shadow-dom inside 2
          boxes should trigger an update
        </div>
      </uui-popover-container>`;
  }
}
