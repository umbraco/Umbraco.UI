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
  render: () => html`
    <button
      id="popover-button"
      popovertarget="popover-container"
      style="margin: 2000px">
      open popover
    </button>
    <uui-popover-container id="popover-container" popover>
      <div
        style="max-width: 300px; background: white; border: 1px solid black; border-radius: 4px;">
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
