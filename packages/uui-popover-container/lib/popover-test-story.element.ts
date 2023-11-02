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
          <uui-scroll-container>
            <ul>
              <li>List 1</li>
              <li>List 2</li>
              <li>List 3</li>
            </ul>
          </uui-scroll-container>
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

      ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
      }

      li {
        position: relative;
        margin-bottom: 1px;
      }

      li:nth-last-of-type(1) {
        margin-bottom: 0;
      }

      li.selected:before {
        background-color: var(--uui-color-current);
        border-radius: 0 4px 4px 0;
        bottom: 8px;
        content: '';
        left: 0;
        pointer-events: none;
        position: absolute;
        top: 8px;
        width: 4px;
        z-index: 1;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'popover-test-story': UUIPopoverTestStoryElement;
  }
}
