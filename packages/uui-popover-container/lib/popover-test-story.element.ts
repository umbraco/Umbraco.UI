import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
/**
 * @element popover-test-story
 */
@defineElement('popover-test-story')
export class UUIPopoverTestStoryElement extends LitElement {
  render() {
    return html`
      <uui-button look="primary" popovertarget="my-popover"
        >open popover</uui-button
      >
      <uui-popover-container id="my-popover" popover>
        <uui-box style="width: 200px; border: 1px solid black">
          <h2>Whats going on ma dude</h2>
          <uui-button
            color="danger"
            look="primary"
            label="Button here"></uui-button>
        </uui-box>
      </uui-popover-container>
    `;
  }

  static styles = [
    css`
      uui-box {
        background: red;
      }
      h2 {
        color: blue;
      }
      uui-box:hover {
        background: pink;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'popover-test-story': UUIPopoverTestStoryElement;
  }
}
