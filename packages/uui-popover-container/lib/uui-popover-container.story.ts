import type { Meta, StoryObj } from '@storybook/web-components';

import './uui-popover-container.element';
import type { UUIPopoverContainerElement } from './uui-popover-container.element';
// import readme from '../README.md?raw';
import { html } from 'lit';

const meta: Meta<UUIPopoverContainerElement> = {
  id: 'uui-popover-container',
  title: 'Popover Container',
  component: 'uui-popover-container',
  parameters: {
    // readme: { markdown: readme },
    docs: {
      source: {
        code: `<uui-popover-container></uui-popover-container>`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<UUIPopoverContainerElement>;

export const Overview: Story = {
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector('#popover-button');
    button?.scrollIntoView({
      behavior: 'instant',
      block: 'center',
      inline: 'center',
    });
  },
  args: {
    placement: 'bottom-start',
  },
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
    },
  },
  render: args => html`
    <button
      id="popover-button"
      popovertarget="popover-container"
      style="margin: auto">
      open popover
    </button>
    <uui-popover-container
      id="popover-container"
      popover
      placement=${args.placement}
      margin=${args.margin}>
      <div
        style="max-width: 300px; background: white; border: 1px solid black; border-radius: 4px; box-shadow: 0px 2px 20px -1px rgba(0, 0, 0, 0.21);">
        <h2>This is my popover</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem,
          est. Eius dolorem dolorum praesentium ut impedit recusandae at maiores
          adipisci nulla atque, est consectetur modi porro blanditiis expedita
          rem dolore.
        </p>
      </div>
    </uui-popover-container>
  `,
};
