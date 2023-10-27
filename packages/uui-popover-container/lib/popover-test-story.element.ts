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
        <div style="width: 200px; border: 1px solid black">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
          quis eos doloribus dolore. Voluptate dolorum, natus, sit veritatis
          impedit dolore enim odio excepturi ex nostrum veniam repellendus
          obcaecati aspernatur dolorem.
        </div>
      </uui-popover-container>
    `;
  }

  static styles = [css``];
}

declare global {
  interface HTMLElementTagNameMap {
    'popover-test-story': UUIPopoverTestStoryElement;
  }
}
