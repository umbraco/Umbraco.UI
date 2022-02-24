import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-popover',
  title: 'Displays/Popover',
  component: 'uui-popover',
  argTypes: {
    placement: {
      options: [
        'auto',
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'right',
        'right-start',
        'right-end',
        'left',
        'left-start',
        'left-end',
      ],
      control: { type: 'select' },
    },
  },
  args: {
    placement: 'bottom',
    margin: 8,
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-popover></uui-popover>`,
      },
    },
  },
};

function handleClick(e: MouseEvent) {
  //@ts-ignore
  e.target.parentNode.open = !e.target.parentNode.open;
}

export const AAAOverview: Story = props => {
  return html`
    <div
      style="display: flex; border: 2px solid black; width: 100%; height: 100%; overflow: auto;">
      <div style="display: flex; padding: 200%; flex-direction: column">
        <div>
          <h3 style="width: 300px; text-align: center">
            Scroll around to see how I react!
          </h3>
          <p>
            I will flip up or down if there's no room, and I will squeeze myself
            onto the screen if I get too close the sides.
          </p>
        </div>
        <uui-popover
          id="pop-out"
          style="margin: auto"
          .margin=${props.margin}
          .placement=${props.placement}
          .open=${props.open}>
          <uui-button
            look="primary"
            @click=${handleClick}
            @keydown=${() => ''}
            slot="trigger"
            style="user-select: none; white-space: nowrap">
            I will open the dropdown
          </uui-button>
          <div
            slot="popover"
            style="display: flex; flex-direction: column; padding: 1rem; border: 1px solid; border-radius: 4px; width: 200px; background: white; box-shadow: var(--uui-shadow-depth-3)">
            <h3
              style="text-align: center; line-height: normal; margin-bottom: 0;">
              Dropdown content
            </h3>
            <p>
              This can contain any content: buttons, lists, images and so on.
            </p>
            <uui-button look="primary">Button</uui-button>
          </div>
        </uui-popover>
      </div>
    </div>
  `;
};
AAAOverview.storyName = 'Overview';
AAAOverview.args = { open: true };
AAAOverview.play = () => {
  const popover = document.getElementById('pop-out');
  if (popover) {
    popover.scrollIntoView({
      behavior: 'auto',
      block: 'center',
      inline: 'center',
    });
  }
};
