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
    placement: 'bottom-start',
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

export const AAAOverview: Story = props => html`
  <div style="display: flex; height: 100%; width: 100%">
    <uui-popover
      id="pop-out"
      style="margin: auto"
      .margin=${props.margin}
      .placement=${props.placement}
      .open=${props.open}>
      <span
        @click=${handleClick}
        @keydown=${() => ''}
        slot="trigger"
        style="padding: .5rem 1rem; border: 1px solid; display: inline-block; cursor: pointer; user-select: none; border-radius: 4px;">
        I will open the dropdown
      </span>
      <div
        slot="popover"
        style="padding: .5rem; border: 1px solid; border-radius: 4px; width: 200px">
        I am the dropdown container
        <div
          style="padding: 1rem; height: 100px; width: 100px; border: 1px solid">
          more content
          <button type="button">CLICK</button>
        </div>
      </div>
    </uui-popover>
  </div>
`;

AAAOverview.storyName = 'Overview';

export const ScrollBody: Story = props => html`
  <div style="display: flex; min-height: 1400px; min-width: 1400px">
    <uui-popover
      id="pop-out"
      style="margin: auto"
      .margin=${props.margin}
      .placement=${props.placement}
      ?open=${props.open}>
      <span
        @click=${handleClick}
        @keydown=${() => ''}
        slot="trigger"
        style="padding: .5rem 1rem; border: 1px solid; display: inline-block; cursor: pointer; user-select: none; border-radius: 4px;">
        trigger
      </span>
      <div
        slot="popover"
        style="padding: .5rem; border: 1px solid; border-radius: 4px; width: 100px; height: 100px">
        I am the dropdown container
      </div>
    </uui-popover>
  </div>
`;

export const ScrollContainer: Story = props => html`
  <div style="display:block; height: 1600px; width: 1600px"></div>
  <div
    style="display: flex; width: 500px; height: 500px; border: 1px solid; overflow: auto;">
    <div style="display: flex; min-height: 1600px; min-width: 1600px">
      <uui-popover
        id="pop-out"
        style="margin: auto"
        .margin=${props.margin}
        .placement=${props.placement}
        .open=${props.open}>
        <span
          @click=${handleClick}
          @keydown=${() => ''}
          slot="trigger"
          style="padding: .5rem 1rem; border: 1px solid; display: inline-block; cursor: pointer; user-select: none; border-radius: 4px;">
          I will open the dropdown
        </span>
        <div
          slot="popover"
          style="padding: .5rem; border: 1px solid; border-radius: 4px; width: 100px; height: 100px">
          I am the dropdown container
        </div>
      </uui-popover>
    </div>
  </div>
  <div style="display:block; height: 1600px; width: 1600px"></div>
`;
